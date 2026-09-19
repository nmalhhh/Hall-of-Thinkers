import { motion } from 'framer-motion';
import { SCULPTURES } from '../../data/sculptures';
import SculptureCard from './SculptureCard';

const CONTAINER_VARIANTS = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.15 },
  },
};

const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

function MuseumHeader() {
  return (
    <header className="relative text-center py-14 px-6 overflow-hidden">
      {/* Top ambient line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-12 bg-gradient-to-b from-transparent via-slate-600 to-transparent" />

      {/* Course badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.45 }}
        className="inline-flex items-center gap-2 mb-5"
      >
        <span
          className="font-mono text-[9.5px] tracking-[0.3em] uppercase px-3.5 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-slate-400 shadow-inner"
        >
          MLN111 · FPT University · Triết học Mác – Lênin
        </span>
      </motion.div>

      {/* Main title */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1
          className="font-heading font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-white mb-2"
          style={{ fontFamily: "'Be Vietnam Pro', sans-serif", lineHeight: 1.05 }}
        >
          BẢO TÀNG DANH NHÂN
          <br />
          <span
            style={{
              background: 'linear-gradient(90deg, #f97316 0%, #3b82f6 50%, #ef4444 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            TRIẾT HỌC
          </span>
        </h1>
        <p
          className="font-heading font-light text-lg sm:text-xl tracking-[0.2em] text-slate-400 uppercase mt-2"
          style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
        >
          The Hall of Thinkers
        </p>
      </motion.div>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.55 }}
        className="mt-5 max-w-xl mx-auto text-slate-400 text-sm sm:text-[15px] leading-relaxed"
      >
        Hành trình qua 9 danh nhân và biểu tượng triết học vĩ đại — từ Socrates đến Lenin — cùng
        các học thuyết nền tảng của Chủ nghĩa Duy vật Biện chứng theo giáo trình MLN111.
        Nhấp vào bức tượng để bước vào không gian triển lãm 3D sống động.
      </motion.p>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.45 }}
        className="mt-8 flex items-center justify-center gap-8 sm:gap-12"
      >
        {[
          { value: '9',   label: 'Hiện vật / Triết gia', color: '#f97316' },
          { value: '18+', label: 'Điểm tri thức',         color: '#3b82f6' },
          { value: '3D',  label: 'Trải nghiệm WebGL',     color: '#10b981' },
        ].map((stat) => (
          <div key={stat.label} className="flex flex-col items-center gap-0.5">
            <span
              className="font-mono font-bold text-2xl sm:text-3xl"
              style={{ color: stat.color }}
            >
              {stat.value}
            </span>
            <span className="font-mono text-[9px] sm:text-[10px] tracking-wider uppercase text-slate-400">
              {stat.label}
            </span>
          </div>
        ))}
      </motion.div>

      {/* Ornamental divider */}
      <div className="mt-10 flex items-center gap-4 max-w-xs mx-auto">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-slate-700" />
        <span className="text-slate-500 text-xs tracking-[0.3em] font-mono uppercase">Bộ sưu tập</span>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent to-slate-700" />
      </div>
    </header>
  );
}

export default function GrandHallGallery() {
  return (
    <main
      className="relative min-h-screen museum-dark-bg noise-overlay text-slate-100"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Sticky top strip — museum branding */}
      <div
        className="sticky top-0 z-20 flex items-center justify-between px-6 py-3 border-b"
        style={{
          background: 'rgba(10, 10, 15, 0.85)',
          backdropFilter: 'blur(12px)',
          borderColor: 'rgba(255, 255, 255, 0.08)',
        }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center bg-gradient-to-br from-orange-500 via-blue-600 to-red-500 shadow-md"
          >
            <span className="font-mono text-white text-[8px] font-bold">HT</span>
          </div>
          <div>
            <div className="font-mono text-[9px] tracking-[0.2em] text-slate-200 font-semibold uppercase">
              Hall of Thinkers
            </div>
            <div className="font-mono text-[8px] text-slate-400 tracking-wider">
              Dialectic Artifacts 3D
            </div>
          </div>
        </div>
        <span
          className="font-mono text-[9px] tracking-widest uppercase px-2.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400"
        >
          9 hiện vật
        </span>
      </div>

      <div className="relative z-10">
        <MuseumHeader />

        {/* Card grid */}
        <section className="px-4 sm:px-6 lg:px-10 xl:px-14 pb-20">
          <motion.div
            variants={CONTAINER_VARIANTS}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6"
          >
            {SCULPTURES.map((sculpture, idx) => (
              <motion.div key={sculpture.id} variants={ITEM_VARIANTS}>
                <SculptureCard sculpture={sculpture} index={idx} />
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="text-center pb-12 pt-6 border-t border-slate-800/80">
          <p className="font-mono text-[9.5px] tracking-wider text-slate-500 uppercase">
            The Hall of Thinkers · Dialectic Artifacts 3D · MLN111 · FPT University
          </p>
        </footer>
      </div>
    </main>
  );
}
