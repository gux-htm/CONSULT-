import React, { useEffect, useRef, useMemo } from 'react';
import createGlobe from 'cobe';
import { COUNTRIES } from '../constants';
import { useNavigate } from 'react-router-dom';

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

export const Globe3D: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Interaction State
  const pointerInteracting = useRef(false);
  const pointerInteractionStart = useRef({ x: 0, y: 0 });
  const pointerRotationStart = useRef({ phi: 0, theta: 0 });
  
  // Rotation State
  const phiRef = useRef(0);
  const thetaRef = useRef(0.3);

  // References for DOM elements
  const markersRef = useRef<(HTMLDivElement | null)[]>([]);

  // Memoize and merge country data
  const mapData = useMemo(() => {
    const processed: {
        name: string;
        coordinates: [number, number];
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
      width: 600 * 2,
      height: 600 * 2,
      phi: 0,
      theta: 0.3,
      dark: 1, 
      diffuse: 2, 
      mapSamples: 16000,
      mapBrightness: 12, 
      baseColor: [0.1, 0.1, 0.15], 
      markerColor: [0.1, 0.1, 0.15],
      glowColor: [0.3, 0.1, 0.1], // Reddish glow for AZM theme
      markers: [], 
      onRender: (state) => {
        if (!pointerInteracting.current) {
            phiRef.current += 0.002;
        }

        state.phi = phiRef.current;
        state.theta = thetaRef.current;
        
        const r = 250; 
        const cx = 300;
        const cy = 300;
        
        mapData.forEach((country, i) => {
           const el = markersRef.current[i];
           if (!el) return;

           const lat = country.coordinates[0] * Math.PI / 180;
           const lng = (country.coordinates[1] * Math.PI / 180) + state.phi;
           
           const cy_angle = lat;
           const cx_angle = lng; 
           
           const x = Math.cos(cy_angle) * Math.sin(cx_angle);
           const y = Math.sin(cy_angle);
           const z = Math.cos(cy_angle) * Math.cos(cx_angle);
           
           const theta = state.theta;
           
           const y_rot = y * Math.cos(theta) - z * Math.sin(theta);
           const z_rot = y * Math.sin(theta) + z * Math.cos(theta);
           
           const screenX = cx + x * r;
           const screenY = cy - y_rot * r;
           
           if (z_rot > 0) {
              const scale = 0.6 + 0.4 * z_rot; 
              const opacity = Math.min(1, Math.pow(z_rot, 1.5) * 3);
              
              el.style.opacity = opacity.toString();
              el.style.pointerEvents = 'auto';
              el.style.transform = `translate3d(${screenX}px, ${screenY}px, 0) scale(${scale}) translate(-50%, -50%)`; 
              el.style.zIndex = Math.floor(z_rot * 100).toString();
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
    pointerInteractionStart.current = { x: e.clientX, y: e.clientY };
    pointerRotationStart.current = { phi: phiRef.current, theta: thetaRef.current };
    if (containerRef.current) containerRef.current.style.cursor = 'grabbing';
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (pointerInteracting.current) {
        const deltaX = e.clientX - pointerInteractionStart.current.x;
        const deltaY = e.clientY - pointerInteractionStart.current.y;
        
        phiRef.current = pointerRotationStart.current.phi + deltaX * 0.005;
        thetaRef.current = pointerRotationStart.current.theta - deltaY * 0.005;
    }
  };

  const handlePointerUp = () => {
    pointerInteracting.current = false;
    if (containerRef.current) containerRef.current.style.cursor = 'grab';
  };

  return (
    <div 
        ref={containerRef} 
        className="w-full h-full flex items-center justify-center relative overflow-hidden"
        style={{ cursor: 'grab', touchAction: 'none' }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
    >
        <canvas
          ref={canvasRef}
          style={{ width: 600, height: 600, maxWidth: '100%', aspectRatio: '1' }}
          className="opacity-100"
        />
        
        <div className="absolute top-0 left-0 w-[600px] h-[600px] pointer-events-none transform -translate-x-1/2 -translate-y-1/2" 
             style={{ left: '50%', top: '50%' }}>
          {mapData.map((country, index) => (
            <div
              key={`${country.name}-${index}`}
              ref={(el) => { markersRef.current[index] = el; }}
              className={`absolute whitespace-nowrap text-center transition-colors duration-300 ${
                  country.isOperating 
                    ? 'cursor-pointer pointer-events-auto hover:text-red-400 hover:scale-110' 
                    : 'pointer-events-none'
              }`}
              onClick={() => {
                  if (country.isOperating && country.id) {
                      navigate(`/country/${country.id}`);
                  }
              }}
            >
              <span className={`
                block text-xs md:text-sm tracking-wide
                ${country.isOperating 
                    ? 'text-white font-bold drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]' 
                    : 'text-gray-500 font-medium opacity-70 text-[10px]'
                }
              `}>
                {country.name}
              </span>
              
              {country.isOperating && (
                 <div className="mx-auto w-1.5 h-1.5 bg-red-500 rounded-full mt-0.5 shadow-[0_0_8px_red]"></div>
              )}
            </div>
          ))}
        </div>
    </div>
  );
};