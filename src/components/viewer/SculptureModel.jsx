import { Component, useLayoutEffect, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import ProceduralBustFallback from './ProceduralBustFallback';

/* ─── Draco decoder — required for KHR_draco_mesh_compression (e.g. marx.glb) ── */
useGLTF.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');

/* ─── Error Boundary ─────────────────────────────────────────────── */
export class ModelErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.warn(
      `[SculptureModel] Failed to load: ${this.props.modelUrl}\n`,
      error?.message ?? error
    );
  }

  render() {
    if (this.state.hasError) {
      return <ProceduralBustFallback accentColor={this.props.accentColor} />;
    }
    return this.props.children;
  }
}

/* ─── Inner GLB loader ───────────────────────────────────────────── */
function GLBModel({ modelUrl }) {
  // true = enable Draco decoder support
  const { scene } = useGLTF(modelUrl, true);

  // Deep clone so multiple mounts (cached GLTF) never share transform state
  const clonedScene = useMemo(() => {
    if (!scene) return null;
    console.info(`[SculptureModel] Loaded: ${modelUrl}`);
    return scene.clone(true);
  }, [scene, modelUrl]);

  useLayoutEffect(() => {
    if (!clonedScene) return;

    // 1. Compute true bounding box
    const box    = new THREE.Box3().setFromObject(clonedScene);
    const size   = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    // 2. Guard against empty / degenerate meshes
    const maxDim = Math.max(size.x, size.y, size.z);
    const targetScale = maxDim > 0.001 ? 2.5 / maxDim : 1;
    clonedScene.scale.setScalar(targetScale);

    // 3. Translate so the geometric center sits exactly at world (0, 0, 0)
    clonedScene.position.set(
      -center.x * targetScale,
      -center.y * targetScale,
      -center.z * targetScale
    );

    // 4. Shadows + material visibility fix
    clonedScene.traverse((child) => {
      if (!child.isMesh) return;
      child.castShadow    = true;
      child.receiveShadow = true;
      const mats = Array.isArray(child.material) ? child.material : [child.material];
      mats.forEach((mat) => {
        if (!mat) return;
        mat.side        = THREE.FrontSide; // correct for well-formed meshes; prevents z-fighting
        mat.roughness   = 0.38;
        mat.metalness   = 0.08;
        mat.needsUpdate = true;
      });
    });

    console.info(
      `[SculptureModel] Centered: scale=${targetScale.toFixed(3)}, ` +
      `center=(${center.x.toFixed(2)}, ${center.y.toFixed(2)}, ${center.z.toFixed(2)})`
    );
  }, [clonedScene]);

  if (!clonedScene) return null;

  return <primitive object={clonedScene} />;
}

/* ─── In-Canvas loading badge (used as Suspense fallback) ──────────── */
import { Html } from '@react-three/drei';

export function ModelLoadingBadge({ accentColor = '#888' }) {
  return (
    <Html center position={[0, 0, 0]} zIndexRange={[200, 300]}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 10,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
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
            opacity: 0.8,
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
    <ModelErrorBoundary accentColor={accentColor} modelUrl={modelUrl}>
      <GLBModel modelUrl={modelUrl} />
    </ModelErrorBoundary>
  );
}

/* ─── Preload helper for adjacent models ────────────────────────── */
export function preloadSculptureModel(modelUrl) {
  if (modelUrl) useGLTF.preload(modelUrl);
}

export default SculptureModel;
