import { memo, useState } from 'react';
import useMuseumStore from '../../store/useMuseumStore';

function getDoctrineStyle(accentColor) {
  return {
    background: `${accentColor}18`,
    color: accentColor,
    border: `1px solid ${accentColor}44`,
  };
}

const SculptureCard = memo(function SculptureCard({ sculpture, index }) {
  const setActiveSculpture = useMuseumStore((s) => s.setActiveSculpture);
  const [imgFailed, setImgFailed] = useState(false);

  const idxLabel = String(index + 1).padStart(2, '0');

  return (
    <article
      className="museum-card relative rounded-2xl overflow-hidden cursor-pointer group"
      style={{ '--accent': sculpture.accentColor }}
      onClick={() => setActiveSculpture(sculpture.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && setActiveSculpture(sculpture.id)}
      aria-label={`Mở triển lãm 3D: ${sculpture.name}`}
    >
      {/* ── Portrait image area ─────────────────────────────────── */}
      <div className="relative w-full h-52 overflow-hidden rounded-t-xl bg-slate-900/90 flex items-center justify-center">
        {!imgFailed ? (
          <img
            src={sculpture.imageUrl}
            alt={sculpture.name}
            loading="lazy"
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.target.style.display = 'none';
              setImgFailed(true);
            }}
          />
        ) : null}

        {/* Fallback initials badge — shown when image fails */}
        {imgFailed && (
          <div
            className="flex absolute inset-0 items-center justify-center font-heading font-bold text-6xl select-none"
            style={{ color: `${sculpture.accentColor}30`, fontFamily: "'Be Vietnam Pro', sans-serif" }}
          >
            {sculpture.name.charAt(0)}
          </div>
        )}

        {/* Index badge */}
        <div className="absolute top-3 left-3 z-10">
          <span
            className="font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full"
            style={{
              background: 'rgba(10, 10, 15, 0.85)',
              backdropFilter: 'blur(8px)',
              color: sculpture.accentColor,
              border: `1px solid ${sculpture.accentColor}55`,
            }}
          >
            {idxLabel}/09
          </span>
        </div>

        {/* Bottom gradient vignette into dark card body */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent 40%, rgba(18, 20, 32, 0.65) 75%, rgba(18, 20, 32, 0.98) 100%)',
          }}
        />

        {/* Hover accent shimmer overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `linear-gradient(160deg, ${sculpture.accentColor}18 0%, transparent 60%)` }}
        />
      </div>

      {/* ── Card body ───────────────────────────────────────────── */}
      <div className="px-4 pb-5 pt-3 flex flex-col gap-2">
        {/* Doctrine badge */}
        <div
          className="doctrine-badge inline-flex items-center self-start"
          style={getDoctrineStyle(sculpture.accentColor)}
        >
          {sculpture.doctrine.length > 44
            ? sculpture.doctrine.slice(0, 44) + '…'
            : sculpture.doctrine}
        </div>

        {/* Name */}
        <h2
          className="font-heading font-bold text-[1.05rem] leading-tight text-white group-hover:text-slate-100 transition-colors"
          style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
        >
          {sculpture.name}
        </h2>

        {/* Period */}
        <p
          className="font-mono text-[9.5px] tracking-wider uppercase"
          style={{ color: sculpture.accentColor }}
        >
          {sculpture.period}
        </p>

        {/* Summary */}
        <p className="text-slate-400 text-[12px] leading-relaxed line-clamp-3">
          {sculpture.summary}
        </p>

        {/* Quote */}
        <blockquote
          className="mt-1 pl-2.5 text-[11px] italic leading-relaxed text-slate-400 border-l-[2px]"
          style={{ borderColor: `${sculpture.accentColor}55` }}
        >
          &ldquo;{sculpture.quote}&rdquo;
        </blockquote>

        {/* CTA row */}
        <div
          className="mt-2 flex items-center gap-1.5 text-[11px] font-semibold font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{ color: sculpture.accentColor }}
        >
          <span className="text-base leading-none">→</span>
          <span>Khám phá không gian 3D</span>
        </div>
      </div>

      {/* Bottom accent glow line on hover */}
      <div
        className="accent-underline"
        style={{ background: `linear-gradient(90deg, transparent 0%, ${sculpture.accentColor} 50%, transparent 100%)` }}
      />
    </article>
  );
});

export default SculptureCard;
