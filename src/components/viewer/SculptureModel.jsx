import { Component, useLayoutEffect, useMemo, useRef } from 'react';
import { useGLTF, Html } from '@react-three/drei';
import * as THREE from 'three';
import ProceduralBustFallback from './ProceduralBustFallback';

/* ─── Configure Draco decoder (required for marx.glb & any KHR_draco file) ── */
// Must be called at module level, before any useGLTF calls.
useGLTF.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');

/* ─── Error Boundary ─────────────────────────────────────────────── */
export class ModelErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errMsg: '' };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, errMsg: error?.message ?? 'Unknown error' };
  }

  componentDidCatch(error) {
    console.warn(
      '[SculptureModel] GLB load/decode error — using procedural fallback.\n',
      error?.message
    );
  }

  render() {
    if (this.state.hasError) {
      return <ProceduralBustFallback accentColor={this.props.accentColor} />;
    }
    return this.props.children;
  }
}

/* ─── Inner GLBModel ─────────────────────────────────────────────── */
/**
 * Clones the scene on every mount so switching between sculptures
 * (which share the same GLTF cache via useGLTF) never causes
 * transform or material state to bleed between instances.
 *
 * Draco decoder is configured at module-top so marx.glb unpacks fine.
 */
function GLBModel({ modelUrl }) {
  // useDraco = true (second arg) enables Draco decoding support
  const { scene } = useGLTF(modelUrl, true);
  const groupRef  = useRef();

  // Clone so multiple mounts (current + adjacent preload) don't share transforms
  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  useLayoutEffect(() => {
    if (!clonedScene) return;

    // 1. True bounding box on the cloned geometry
    const box    = new THREE.Box3().setFromObject(clonedScene);
    const size   = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    // 2. Uniform scale → max dimension = 2.4 world units
    const maxDim      = Math.max(size.x, size.y, size.z) || 1;
    const targetScale = 2.4 / maxDim;
    clonedScene.scale.setScalar(targetScale);

    // 3. Shift so the geometric center is strictly at (0, 0, 0)
    clonedScene.position.x = -center.x * targetScale;
    clonedScene.position.y = -center.y * targetScale;
    clonedScene.position.z = -center.z * targetScale;

    // 4. Shadows + material optimisation for dark studio lighting
    clonedScene.traverse((child) => {
      if (!child.isMesh) return;
      child.castShadow    = true;
      child.receiveShadow = true;
      const mats = Array.isArray(child.material) ? child.material : [child.material];
      mats.forEach((mat) => {
        if (!mat) return;
        mat.roughness    = 0.38;
        mat.metalness    = 0.08;
        mat.needsUpdate  = true;
      });
    });
  }, [clonedScene]);

  return (
    <group ref={groupRef}>
      <primitive object={clonedScene} />
    </group>
  );
}

/* ─── 3D loading badge (shown inside the Canvas while Suspense waits) ── */
export function ModelLoadingBadge({ accentColor = '#888' }) {
  return (
    <Html center position={[0, 0, 0]} zIndexRange={[200, 300]}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          pointerEvents: 'none',
        }}
      >
        {/* Spinning ring */}
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            border: `3px solid ${accentColor}22`,
            borderTopColor: accentColor,
            borderRightColor: `${accentColor}88`,
            animation: 'spin-ring 1.1s linear infinite',
          }}
        />
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: accentColor,
            opacity: 0.85,
          }}
        >
          Đang tải…
        </span>
      </div>
    </Html>
  );
}

/* ─── Public SculptureModel ──────────────────────────────────────── */
export function SculptureModel({ modelUrl, accentColor = '#888888' }) {
  if (!modelUrl) {
    return <ProceduralBustFallback accentColor={accentColor} />;
  }

  return (
    <ModelErrorBoundary accentColor={accentColor}>
      <GLBModel modelUrl={modelUrl} />
    </ModelErrorBoundary>
  );
}

/* ─── Preload helper — call for adjacent models ─────────────────── */
export function preloadSculptureModel(modelUrl) {
  if (modelUrl) useGLTF.preload(modelUrl);
}

export default SculptureModel;
