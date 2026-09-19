import { AnimatePresence, motion } from 'framer-motion';
import useMuseumStore from '../../store/useMuseumStore';

export default function HotspotModal({ accentColor = '#888' }) {
  const activeHotspot = useMuseumStore((s) => s.activeHotspot);
  const clearHotspot  = useMuseumStore((s) => s.clearHotspot);

  return (
    <AnimatePresence>
      {activeHotspot && (
        <>
          {/* Tap-outside dismiss */}
          <motion.div
            key="hm-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={clearHotspot}
          />

          <motion.div
            key={`hm-${activeHotspot.id}`}
            initial={{ opacity: 0, scale: 0.94, y: 14 }}
            animate={{ opacity: 1, scale: 1,    y: 0  }}
            exit={{   opacity: 0, scale: 0.91,  y: 8  }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed z-50 left-1/2 -translate-x-1/2"
            style={{ bottom: '2rem', width: 'min(440px, calc(100vw - 2rem))' }}
          >
            <div
              className="rounded-2xl overflow-hidden bg-slate-900/92 backdrop-blur-xl border shadow-2xl"
              style={{
                borderColor: `${accentColor}35`,
                boxShadow: `0 24px 64px rgba(0,0,0,0.6), 0 0 24px ${accentColor}18`,
              }}
            >
              {/* Top accent line */}
              <div
                className="h-[3px] w-full"
                style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }}
              />

              <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs"
                      style={{
                        background: `${accentColor}20`,
                        border: `1px solid ${accentColor}44`,
                        color: accentColor,
                      }}
                    >
                      ✦
                    </div>
                    <h3
                      className="font-heading font-bold text-[0.95rem] text-slate-100 leading-snug"
                      style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
                    >
                      {activeHotspot.title}
                    </h3>
                  </div>

                  <button
                    onClick={clearHotspot}
                    className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors text-sm font-mono"
                    aria-label="Đóng"
                  >
                    ✕
                  </button>
                </div>

                <div
                  className="h-px mb-3.5"
                  style={{ background: `linear-gradient(90deg, ${accentColor}44, rgba(255,255,255,0.06))` }}
                />

                <p className="text-slate-300 text-[13px] leading-relaxed">
                  {activeHotspot.description}
                </p>

                <div className="mt-4">
                  <span
                    className="font-mono text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-full"
                    style={{
                      background: `${accentColor}18`,
                      color: accentColor,
                      border: `1px solid ${accentColor}35`,
                    }}
                  >
                    MLN111 · Điểm tri thức
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
