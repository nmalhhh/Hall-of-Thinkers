import { Suspense, useCallback, useEffect, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

import useMuseumStore from '../../store/useMuseumStore';
import { SCULPTURES } from '../../data/sculptures';
import SculptureModel, { ModelLoadingBadge, ModelErrorBoundary, preloadSculptureModel } from './SculptureModel';
import SculptureHotspots from './SculptureHotspots';
import HotspotModal from './HotspotModal';

/* ─── HTML loading overlay shown while GLB parses ────────────────── */
function LoadingOverlay({ name, accentColor }) {
  return (
    <div
      className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 pointer-events-none"
      style={{ background: 'rgba(10, 10, 15, 0.8)', backdropFilter: 'blur(10px)' }}
    >
      <div className="relative w-14 h-14">
        <div
          className="loading-ring absolute inset-0 rounded-full border-[3px] border-transparent"
          style={{ borderTopColor: accentColor, borderRightColor: `${accentColor}44` }}
        />
        <div className="absolute inset-2 rounded-full flex items-center justify-center font-mono text-[9px] text-slate-400">
          3D
        </div>
      </div>
      <div className="text-center">
        <p className="font-heading font-semibold text-slate-100 text-sm">
          {name}
        </p>
        <p className="font-mono text-[10px] text-slate-400 mt-1 tracking-widest uppercase">
          Đang tải mô hình 3D…
        </p>
      </div>
    </div>
  );
}

/* ─── Studio lighting that works for ALL models (light + dark textures) ─── */
function StudioLighting({ accentColor }) {
  const accent = useMemo(() => new THREE.Color(accentColor), [accentColor]);

  return (
    <>
      {/* Hemisphere light guarantees no mesh is fully black — sky vs ground */}
      <hemisphereLight intensity={0.7} color="#e2e8f0" groundColor="#1e293b" />

      {/* Strong overhead key light */}
      <directionalLight
        position={[0, 8, 4]}
        intensity={2.2}
        color="#ffffff"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0003}
      />

      {/* Front fill */}
      <directionalLight position={[5, 4, 7]} intensity={1.6} color="#f1f5f9" />

      {/* Soft back-left counter fill */}
      <directionalLight position={[-5, -2, -5]} intensity={0.8} color="#94a3b8" />

      {/* Warm accent rim lights per thinker */}
      <pointLight position={[-4, 2, -2]} intensity={1.4} color={accent} />
      <pointLight position={[4, -1, -2]} intensity={0.7} color={accent} />
    </>
  );
}

/* ─── 3D Chamber Scene ───────────────────────────────────────────── */
function ChamberScene({ sculpture }) {
  return (
    <>
      <StudioLighting accentColor={sculpture.accentColor} />

      {/* Model wrapped in its own ErrorBoundary — failed loads show fallback, not blank */}
      <ModelErrorBoundary accentColor={sculpture.accentColor} modelUrl={sculpture.modelUrl}>
        <Suspense fallback={<ModelLoadingBadge accentColor={sculpture.accentColor} />}>
          <SculptureModel
            modelUrl={sculpture.modelUrl}
            accentColor={sculpture.accentColor}
          />
        </Suspense>
      </ModelErrorBoundary>

      {/* Contact shadow floating below the sculpture */}
      <ContactShadows
        opacity={0.6}
        scale={10}
        blur={2}
        far={4}
        position={[0, -1.3, 0]}
      />

      {/* Interactive hotspot markers */}
      <SculptureHotspots
        hotspots={sculpture.hotspots}
        accentColor={sculpture.accentColor}
      />

      {/* Precise orbit controls centered at geometric center */}
      <OrbitControls
        enablePan={false}
        enableZoom
        minDistance={2.0}
        maxDistance={6.5}
        enableDamping
        dampingFactor={0.06}
        target={[0, 0, 0]}
        autoRotate
        autoRotateSpeed={0.4}
      />
    </>
  );
}

/* ─── UI Overlays ────────────────────────────────────────────────── */

function BackButton({ onBack }) {
  return (
    <motion.button
      id="back-to-gallery"
      initial={{ opacity: 0, x: -14 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.25, duration: 0.4 }}
      onClick={onBack}
      className="absolute top-5 left-5 z-30 flex items-center gap-2 px-3.5 py-2 rounded-xl font-mono text-[11px] tracking-wider transition-all duration-200 group bg-slate-900/80 backdrop-blur-md border border-slate-800/80 text-slate-200 hover:text-white hover:border-slate-700 shadow-xl"
    >
      <span className="transition-transform group-hover:-translate-x-0.5">←</span>
      <span>Quay lại Sảnh Trưng bày</span>
    </motion.button>
  );
}

function SculptureInfoPanel({ sculpture }) {
  return (
    <motion.div
      id="sculpture-info"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="absolute bottom-5 left-5 z-30 max-w-[300px]"
    >
      <div className="rounded-2xl p-4 overflow-hidden bg-slate-900/80 backdrop-blur-md border border-slate-800/80 shadow-2xl">
        <div
          className="h-[2px] w-full rounded-full mb-3"
          style={{ background: `linear-gradient(90deg, ${sculpture.accentColor}, transparent)` }}
        />

        <h2
          className="font-heading font-bold text-lg text-slate-100 leading-tight"
          style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
        >
          {sculpture.name}
        </h2>

        <p
          className="font-mono text-[9.5px] tracking-wider uppercase mt-1"
          style={{ color: sculpture.accentColor }}
        >
          {sculpture.period}
        </p>

        <div
          className="mt-2 inline-flex items-center font-mono text-[9px] tracking-wider uppercase px-2 py-0.5 rounded-full"
          style={{
            background: `${sculpture.accentColor}18`,
            border: `1px solid ${sculpture.accentColor}40`,
            color: sculpture.accentColor,
          }}
        >
          {sculpture.doctrine.length > 52 ? sculpture.doctrine.slice(0, 52) + '…' : sculpture.doctrine}
        </div>

        <blockquote
          className="mt-3 pl-2.5 text-[11px] italic text-slate-300 leading-relaxed border-l-2"
          style={{ borderColor: `${sculpture.accentColor}66` }}
        >
          &ldquo;{sculpture.quote}&rdquo;
        </blockquote>

        <p className="mt-3 font-mono text-[9px] text-slate-400 tracking-wide">
          ✦ Nhấp <span style={{ color: sculpture.accentColor }}>+</span> để khám phá tri thức
        </p>
      </div>
    </motion.div>
  );
}

function NavigationDock({ current, sculptures, onSelect }) {
  const total   = sculptures.length;
  const prevIdx = (current - 1 + total) % total;
  const nextIdx = (current + 1) % total;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.38, duration: 0.4 }}
      className="absolute bottom-5 right-5 z-30 flex flex-col items-end gap-2"
    >
      <div className="font-mono text-[10px] tracking-widest text-slate-400 px-2 py-0.5 rounded bg-slate-900/80 backdrop-blur-md border border-slate-800/80">
        {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </div>

      <div className="flex gap-2">
        {[
          { idx: prevIdx, label: '←', id: 'nav-prev' },
          { idx: nextIdx, label: '→', id: 'nav-next' },
        ].map(({ idx, label, id }) => (
          <button
            key={idx}
            id={id}
            onClick={() => onSelect(sculptures[idx].id)}
            title={sculptures[idx].name}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl font-mono text-[11px] transition-all duration-200 bg-slate-900/80 backdrop-blur-md border border-slate-800/80 text-slate-200 hover:text-white hover:border-slate-700 shadow-xl"
          >
            <span>{label}</span>
            <span className="max-w-[76px] truncate text-[9px] text-slate-400">
              {sculptures[idx].name.split(' (')[0]}
            </span>
          </button>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Main SculptureChamber ──────────────────────────────────────── */
export default function SculptureChamber() {
  const activeSculptureId    = useMuseumStore((s) => s.activeSculptureId);
  const setActiveSculpture   = useMuseumStore((s) => s.setActiveSculpture);
  const clearActiveSculpture = useMuseumStore((s) => s.clearActiveSculpture);

  const sculpture = useMemo(
    () => SCULPTURES.find((s) => s.id === activeSculptureId) ?? SCULPTURES[0],
    [activeSculptureId]
  );
  const currentIdx = SCULPTURES.findIndex((s) => s.id === activeSculptureId);

  const handleBack   = useCallback(() => clearActiveSculpture(), [clearActiveSculpture]);
  const handleSelect = useCallback((id) => setActiveSculpture(id), [setActiveSculpture]);

  // Preload prev + next models so navigation feels instant
  useEffect(() => {
    const total   = SCULPTURES.length;
    const prevIdx = (currentIdx - 1 + total) % total;
    const nextIdx = (currentIdx + 1) % total;
    preloadSculptureModel(SCULPTURES[prevIdx].modelUrl);
    preloadSculptureModel(SCULPTURES[nextIdx].modelUrl);
  }, [currentIdx]);

  return (
    <div
      id="sculpture-chamber"
      className="fixed inset-0 z-10"
      style={{ background: '#0a0a0f' }}
    >
      <Canvas
        camera={{ position: [0, 0.4, 4.0], fov: 45, near: 0.05, far: 100 }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
          stencil: false,
          precision: 'mediump',
        }}
        shadows
        dpr={[1, 1.5]}
        style={{ background: '#0a0a0f' }}
      >
        <ChamberScene key={activeSculptureId} sculpture={sculpture} />
      </Canvas>

      <Suspense fallback={
        <LoadingOverlay name={sculpture.name} accentColor={sculpture.accentColor} />
      }>
        {null}
      </Suspense>

      {/* UI Overlays */}
      <BackButton onBack={handleBack} />
      <SculptureInfoPanel sculpture={sculpture} />
      <NavigationDock current={currentIdx} sculptures={SCULPTURES} onSelect={handleSelect} />
      <HotspotModal accentColor={sculpture.accentColor} />

      {/* Atmospheric dark vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-20"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, transparent 50%, rgba(0, 0, 0, 0.7) 100%)',
        }}
      />
    </div>
  );
}
