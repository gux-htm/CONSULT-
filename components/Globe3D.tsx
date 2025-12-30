import React, { useEffect, useRef, useMemo } from 'react';
import createGlobe from 'cobe';
import { COUNTRIES } from '../constants';
// Note: We are not using navigate inside here anymore, the parent handles selection for animation

interface GlobeProps {
    onCountrySelect: (id: string) => void;
}

// Visual dataset for global context - Augmented with AZM specific countries
const WORLD_COUNTRIES = [
  { name: "United States", coordinates: [37.0902, -95.7129] },
  { name: "Canada", coordinates: [56.1304, -106.3468] },
  { name: "United Kingdom", coordinates: [55.3781, -3.4360] },
  { name: "France", coordinates: [46.2276, 2.2137] },
  { name: "Germany", coordinates: [51.1657, 10.4515] },
  { name: "China", coordinates: [35.8617, 104.1954] },
  { name: "Australia", coordinates: [-25.2744, 133.7751] },
  { name: "New Zealand", coordinates: [-40.9006, 174.8860] },
  { name: "Sweden", coordinates: [60.1282, 18.6435] },
  { name: "Finland", coordinates: [61.9241, 25.7482] },
  { name: "Georgia", coordinates: [42.3154, 43.3569] },
  { name: "Cyprus", coordinates: [35.1264, 33.4299] },
  { name: "Ireland", coordinates: [53.1424, -7.6921] },
  { name: "Portugal", coordinates: [39.3999, -8.2245] },
  { name: "Malta", coordinates: [35.9375, 14.3754] },
  { name: "Pakistan", coordinates: [30.3753, 69.3451] },
  // Context countries
  { name: "Brazil", coordinates: [-14.2350, -51.9253] },
  { name: "Russia", coordinates: [61.5240, 105.3188] },
  { name: "India", coordinates: [20.5937, 78.9629] },
  { name: "South Africa", coordinates: [-30.5595, 22.9375] },
  { name: "Saudi Arabia", coordinates: [23.8859, 45.0792] },
  { name: "Turkey", coordinates: [38.9637, 35.2433] },
  { name: "Japan", coordinates: [36.2048, 138.2529] },
  { name: "Indonesia", coordinates: [-0.7893, 113.9213] },
  { name: "Spain", coordinates: [40.4637, -3.7492] },
  { name: "Italy", coordinates: [41.8719, 12.5674] },
];

export const Globe3D: React.FC<GlobeProps> = ({ onCountrySelect }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Interaction State
  const pointerInteracting = useRef(false);
  const pointerInteractionStart = useRef({ x: 0 });
  const pointerRotationStart = useRef(0);
  
  // Rotation State - PHI is horizontal rotation (Longitude)
  const phiRef = useRef(0);
  // THETA is vertical (Latitude). Fixed to look slightly down at the globe.
  const thetaRef = useRef(0.3);

  // References for DOM elements
  const markersRef = useRef<(HTMLDivElement | null)[]>([]);

  // Memoize and merge country data
  const mapData = useMemo(() => {
    const processed: {
        name: string;
        coordinates: [number, number]; // Lat, Lon
        id?: string;
        isOperating: boolean;
    }[] = [];

    const norm = (s: string) => s.toLowerCase().trim();

    WORLD_COUNTRIES.forEach(wc => {
        const operatingMatch = COUNTRIES.find(c => {
             return norm(c.name).includes(norm(wc.name)) || norm(wc.name).includes(norm(c.name));
        });

        processed.push({
            name: wc.name,
            coordinates: wc.coordinates as [number, number],
            id: operatingMatch ? operatingMatch.id : undefined,
            isOperating: !!operatingMatch
        });
    });

    COUNTRIES.forEach(op => {
        const exists = processed.find(p => norm(p.name) === norm(op.name) || norm(p.name).includes(norm(op.name)));
        if (!exists) {
            processed.push({
                name: op.name,
                coordinates: op.coordinates as [number, number],
                id: op.id,
                isOperating: true
            });
        }
    });

    return processed;
  }, []);

  useEffect(() => {
    let width = 0;
    const onResize = () => {
      if (canvasRef.current) {
         width = canvasRef.current.offsetWidth;
      }
    }
    window.addEventListener('resize', onResize);
    onResize();

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 800 * 2, // Bigger render area
      height: 800 * 2,
      phi: 0,
      theta: 0.3,
      dark: 1, 
      diffuse: 1.2, // Defined lighting
      mapSamples: 20000, // Dots density
      mapBrightness: 6, 
      baseColor: [0.15, 0.15, 0.25], // Dark ocean
      markerColor: [0.1, 0.1, 0.15],
      glowColor: [0.05, 0.05, 0.1], // Subtle glow, not "hallucination"
      markers: [], 
      onRender: (state) => {
        // Auto-rotation (real planet spin)
        if (!pointerInteracting.current) {
            phiRef.current += 0.001; // Slow constant spin
        }

        state.phi = phiRef.current;
        state.theta = thetaRef.current; // Locked vertical axis
        
        // Globe dimensions in the canvas
        const r = 320; 
        const cx = 400; // Center X of canvas
        const cy = 400; // Center Y of canvas
        
        mapData.forEach((country, i) => {
           const el = markersRef.current[i];
           if (!el) return;

           // Coordinate conversion:
           // Lat: +90 (North) to -90 (South)
           // Cobe Theta: 0 (North) to PI (South)
           const lat = country.coordinates[0];
           const lon = country.coordinates[1];
           
           const phi = (lon * Math.PI) / 180;
           const theta = ((90 - lat) * Math.PI) / 180;

           // Calculate 3D position
           // Cobe's internal rotation handling:
           // We need to account for state.phi (globe rotation)
           const currentPhi = phi + state.phi;
           
           const x = r * Math.sin(theta) * Math.cos(currentPhi);
           const y = r * Math.cos(theta);
           const z = r * Math.sin(theta) * Math.sin(currentPhi);
           
           // Apply tilt (state.theta) to the 3D point
           // Standard 3D rotation matrix for X-axis tilt
           const tilt = state.theta;
           const y_rot = y * Math.cos(tilt) - z * Math.sin(tilt);
           const z_rot = y * Math.sin(tilt) + z * Math.cos(tilt);
           
           // Project to 2D screen
           const screenX = cx + x;
           const screenY = cy - y_rot;
           
           // Visibility check (is it on the front side?)
           // z_rot > 0 means it's facing the camera in this projection space? 
           // Cobe is a bit tricky, typically z > 0 is front.
           // Let's refine based on Cobe's projection logic approximation.
           
           if (z_rot > 0) {
              const scale = Math.max(0.5, 1 * (z_rot / r)); 
              const opacity = Math.min(1, Math.pow(z_rot / r, 2) * 5);
              
              el.style.opacity = opacity.toString();
              el.style.pointerEvents = 'auto';
              el.style.transform = `translate3d(${screenX}px, ${screenY}px, 0) scale(${scale}) translate(-50%, -50%)`; 
              el.style.zIndex = Math.floor(z_rot).toString();
              el.style.display = 'block';
           } else {
              el.style.display = 'none';
           }
        });
      },
    });

    return () => {
      globe.destroy();
      window.removeEventListener('resize', onResize);
    };
  }, [mapData]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    pointerInteracting.current = true;
    pointerInteractionStart.current = { x: e.clientX };
    pointerRotationStart.current = phiRef.current;
    if (containerRef.current) containerRef.current.style.cursor = 'grabbing';
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (pointerInteracting.current) {
        const deltaX = e.clientX - pointerInteractionStart.current.x;
        // Only modify Phi (Horizontal rotation)
        phiRef.current = pointerRotationStart.current + deltaX * 0.005;
    }
  };

  const handlePointerUp = () => {
    pointerInteracting.current = false;
    if (containerRef.current) containerRef.current.style.cursor = 'grab';
  };

  return (
    <div 
        ref={containerRef} 
        className="absolute right-0 top-0 bottom-0 w-full md:w-[60%] h-full flex items-center justify-center overflow-hidden z-10"
        style={{ cursor: 'grab', touchAction: 'none' }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
    >
        <canvas
          ref={canvasRef}
          style={{ width: 800, height: 800, maxWidth: 'none' }}
          className="opacity-100"
        />
        
        <div className="absolute top-0 left-0 w-[800px] h-[800px] pointer-events-none transform -translate-x-1/2 -translate-y-1/2" 
             style={{ left: '50%', top: '50%' }}>
          {mapData.map((country, index) => (
            <div
              key={`${country.name}-${index}`}
              ref={(el) => { markersRef.current[index] = el; }}
              className={`absolute whitespace-nowrap text-center transition-all duration-300 group ${
                  country.isOperating 
                    ? 'cursor-pointer pointer-events-auto z-50' 
                    : 'pointer-events-none z-0'
              }`}
              onClick={() => {
                  if (country.isOperating && country.id) {
                      onCountrySelect(country.id);
                  }
              }}
            >
              {/* Country Dot */}
              <div className={`
                mx-auto rounded-full transition-all duration-300
                ${country.isOperating 
                    ? 'w-2 h-2 bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)] group-hover:bg-white group-hover:scale-150' 
                    : 'w-1 h-1 bg-slate-600 opacity-20'
                }
              `}></div>

              {/* Country Label */}
              <span className={`
                block text-xs mt-1 px-2 py-0.5 rounded-full transition-all duration-300
                ${country.isOperating 
                    ? 'text-white font-bold bg-black/40 backdrop-blur-sm border border-red-500/30 group-hover:bg-red-600 group-hover:border-red-500' 
                    : 'hidden'
                }
              `}>
                {country.name}
              </span>
            </div>
          ))}
        </div>
    </div>
  );
};