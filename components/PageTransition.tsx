import React from 'react';

interface PageTransitionProps {
  isActive: boolean;
  onAnimationComplete?: () => void;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ isActive, onAnimationComplete }) => {
  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center overflow-hidden">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm animate-[fadeIn_0.5s_ease-out_forwards]"></div>

      {/* Airplane Animation Container */}
      <div className="absolute w-full h-full">
        {/* Airplane SVG */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white absolute w-24 h-24 filter drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] animate-[flyAcross_2s_ease-in-out_forwards]"
          style={{ 
            top: '50%', 
            left: '-10%',
          }}
        >
           <path d="M2 12h20" className="opacity-0" /> {/* Spacer */}
           <path d="M20.198 12.637l-6.84-8.875a.91.91 0 0 0-1.442 0l-1.396 1.815 3.328 1.666L4.475 12l-.98 2.067 6.446 2.502-1.35 3.992 3.834-1.42 2.924 3.32a.91.91 0 0 0 1.442 0l3.407-8.875z" fill="white" stroke="none" transform="rotate(45, 12, 12)"/>
        </svg>

        {/* Contrail/Path line */}
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-y-1/2 opacity-0 animate-[fadeInOut_2s_ease-in-out_forwards]"></div>
        
        {/* Destination Text */}
        <div className="absolute top-[60%] left-1/2 -translate-x-1/2 text-white text-2xl font-bold tracking-[0.5em] uppercase opacity-0 animate-[fadeInOut_2s_ease-in-out_0.5s_forwards]">
            Departing
        </div>
      </div>
      
      <style>{`
        @keyframes flyAcross {
          0% {
            transform: translate(0, 0) rotate(0deg) scale(0.5);
            left: -10%;
            top: 60%;
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          100% {
            transform: translate(0, 0) rotate(-10deg) scale(1.5);
            left: 120%;
            top: 30%;
            opacity: 0;
          }
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes fadeInOut {
            0% { opacity: 0; }
            20% { opacity: 1; }
            80% { opacity: 1; }
            100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};