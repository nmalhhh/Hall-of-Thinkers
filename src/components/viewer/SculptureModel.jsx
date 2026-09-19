import { Component, useLayoutEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import ProceduralBustFallback from './ProceduralBustFallback';

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
    console.warn('[SculptureModel] GLB load/decode error — using procedural fallback.', error?.message);
  }

  render() {
    if (this.state.hasError) {
      return <ProceduralBustFallback accentColor={this.props.accentColor} />;
    }
    return this.props.children;
  }
}

/* ─── Inner GLB Model with Auto-Centering & 2.4 Unit Normalization ── */
function GLBModel({ modelUrl }) {
  const { scene } = useGLTF(modelUrl);
  const groupRef = useRef();

  useLayoutEffect(() => {
    if (!scene) return;

    // Calculate true bounding box
    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    // Uniform scale: target maximum dimension = 2.4 units
    const maxDim = Math.max(size.x, size.y, size.z);
    const targetScale = 2.4 / (maxDim || 1);
    scene.scale.setScalar(targetScale);

    // Shift model so geometric center is strictly at (0, 0, 0)
    scene.position.x = -center.x * targetScale;
    scene.position.y = -center.y * targetScale;
    scene.position.z = -center.z * targetScale;

    // Enable shadows & refine material roughness
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          const mats = Array.isArray(child.material) ? child.material : [child.material];
          mats.forEach((mat) => {
            if (!mat) return;
            mat.roughness = 0.35;
            mat.metalness = 0.1;
            mat.needsUpdate = true;
          });
        }
      }
    });
  }, [scene]);

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
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

export default SculptureModel;
