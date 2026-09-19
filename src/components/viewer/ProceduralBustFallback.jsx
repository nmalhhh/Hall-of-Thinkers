import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * ProceduralBustFallback — Classical marble bust from Three.js primitives.
 * Optimized for the light studio scene.
 * Center of mass is at y ≈ 0 (chest level), matching the SculptureModel pivot convention.
 */
export default function ProceduralBustFallback({ accentColor = '#888' }) {
  const groupRef = useRef();
  const headRef  = useRef();
  const accent   = useMemo(() => new THREE.Color(accentColor), [accentColor]);

  // Warm Carrara marble
  const marbleMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0xf0ece6).lerp(accent, 0.05),
        roughness: 0.3,
        metalness: 0.04,
        envMapIntensity: 0.85,
      }),
    [accent]
  );

  const hairMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0xd8d2c8).lerp(accent, 0.08),
        roughness: 0.55,
        metalness: 0.0,
      }),
    [accent]
  );

  const plinthMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0xb8b4ae).lerp(accent, 0.04),
        roughness: 0.6,
        metalness: 0.08,
      }),
    [accent]
  );

  // Gentle breathing idle
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.22) * 0.28;
    }
    if (headRef.current) {
      headRef.current.position.y = 0.62 + Math.sin(t * 0.75) * 0.01;
    }
  });

  // Model is centered at y=0 (chest level), extends from about -1.0 to +1.0
  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* ── Inner plinth (small — different from PodiumMesh) ── */}
      <mesh position={[0, -0.88, 0]} receiveShadow castShadow material={plinthMat}>
        <cylinderGeometry args={[0.58, 0.65, 0.24, 32]} />
      </mesh>
      <mesh position={[0, -0.74, 0]} receiveShadow material={plinthMat}>
        <cylinderGeometry args={[0.62, 0.62, 0.04, 32]} />
      </mesh>

      {/* ── Torso ── */}
      <mesh position={[0, -0.3, 0]} receiveShadow castShadow material={marbleMat}>
        <cylinderGeometry args={[0.3, 0.4, 0.9, 28, 2]} />
      </mesh>
      <mesh position={[0, 0.16, 0]} receiveShadow castShadow material={marbleMat}>
        <cylinderGeometry args={[0.35, 0.31, 0.24, 28]} />
      </mesh>

      {/* ── Neck ── */}
      <mesh position={[0, 0.36, 0]} receiveShadow castShadow material={marbleMat}>
        <cylinderGeometry args={[0.13, 0.17, 0.26, 20]} />
      </mesh>

      {/* ── Head ── */}
      <mesh ref={headRef} position={[0, 0.62, 0]} castShadow material={marbleMat}>
        <sphereGeometry args={[0.34, 48, 48]} />
      </mesh>

      {/* Brow ridge */}
      <mesh position={[0, 0.66, 0.27]} castShadow material={marbleMat}>
        <boxGeometry args={[0.38, 0.05, 0.055]} />
      </mesh>
      {/* Nose */}
      <mesh position={[0, 0.54, 0.34]} castShadow material={marbleMat}>
        <boxGeometry args={[0.055, 0.13, 0.07]} />
      </mesh>
      {/* Eye sockets */}
      <mesh position={[-0.115, 0.64, 0.3]} castShadow material={hairMat}>
        <sphereGeometry args={[0.05, 12, 12]} />
      </mesh>
      <mesh position={[ 0.115, 0.64, 0.3]} castShadow material={hairMat}>
        <sphereGeometry args={[0.05, 12, 12]} />
      </mesh>

      {/* ── Hair ── */}
      <mesh position={[0, 0.72, -0.07]} castShadow material={hairMat}>
        <sphereGeometry args={[0.32, 28, 28]} />
      </mesh>
      <mesh position={[0, 0.88, 0.06]} castShadow material={hairMat}>
        <sphereGeometry args={[0.2, 22, 22]} />
      </mesh>
      <mesh position={[-0.28, 0.64, -0.04]} castShadow material={hairMat}>
        <sphereGeometry args={[0.125, 14, 14]} />
      </mesh>
      <mesh position={[ 0.28, 0.64, -0.04]} castShadow material={hairMat}>
        <sphereGeometry args={[0.125, 14, 14]} />
      </mesh>

      {/* ── Draped shoulders ── */}
      <mesh position={[-0.28, 0.12, 0.04]} castShadow material={marbleMat} rotation={[0, 0, 0.32]}>
        <torusGeometry args={[0.18, 0.055, 8, 22, Math.PI * 0.6]} />
      </mesh>
      <mesh position={[ 0.28, 0.12, 0.04]} castShadow material={marbleMat} rotation={[0, 0, -0.32]}>
        <torusGeometry args={[0.18, 0.055, 8, 22, Math.PI * 0.6]} />
      </mesh>
    </group>
  );
}
