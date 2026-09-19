import { Html } from '@react-three/drei';
import useMuseumStore from '../../store/useMuseumStore';

/**
 * SculptureHotspots — 3D HTML markers anchored to hotspot world positions.
 *
 * Model is geometry-centered at (0,0,0), so hotspot positions in sculptures.js
 * are relative to the model's geometric center.
 *
 * Uses distanceFactor={6} and occlude so markers hide behind the mesh when orbiting.
 */
export default function SculptureHotspots({ hotspots = [], accentColor = '#888' }) {
  const setHotspot    = useMuseumStore((s) => s.setHotspot);
  const activeHotspot = useMuseumStore((s) => s.activeHotspot);

  return (
    <>
      {hotspots.map((hs) => {
        const isActive = activeHotspot?.id === hs.id;

        return (
          <Html
            key={hs.id}
            center
            position={hs.position}
            distanceFactor={6}
            occlude
            zIndexRange={[50, 100]}
          >
            <button
              id={`hotspot-${hs.id}`}
              className="group relative flex items-center justify-center cursor-pointer"
              style={{ '--accent': accentColor }}
              onClick={(e) => {
                e.stopPropagation();
                setHotspot(isActive ? null : hs);
              }}
              title={hs.title}
              aria-label={`Điểm tri thức: ${hs.title}`}
            >
              {/* Outer pulse ring */}
              <span
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: '28px',
                  height: '28px',
                  border: `1.5px solid ${accentColor}`,
                  animation: 'hotspot-ring 2s ease-out infinite',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              />

              {/* Core button */}
              <span
                className="relative flex items-center justify-center rounded-full text-[10px] font-mono font-bold z-10 select-none transition-transform duration-200 group-hover:scale-115 shadow-lg"
                style={{
                  width: '22px',
                  height: '22px',
                  background: isActive ? accentColor : 'rgba(15, 23, 42, 0.88)',
                  border: `1.5px solid ${accentColor}`,
                  color: isActive ? '#ffffff' : accentColor,
                  boxShadow: isActive
                    ? `0 0 16px ${accentColor}88, 0 2px 6px rgba(0,0,0,0.5)`
                    : `0 0 10px ${accentColor}44, 0 2px 8px rgba(0,0,0,0.4)`,
                  backdropFilter: 'blur(8px)',
                }}
              >
                {isActive ? '×' : '+'}
              </span>

              {/* Hover label */}
              <span
                className="pointer-events-none absolute left-7 top-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-[9px] tracking-wide px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-xl bg-slate-900/90 backdrop-blur-md border"
                style={{
                  borderColor: `${accentColor}50`,
                  color: '#f1f5f9',
                }}
              >
                {hs.title}
              </span>
            </button>
          </Html>
        );
      })}
    </>
  );
}
