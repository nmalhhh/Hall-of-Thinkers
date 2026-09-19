import { useMemo } from 'react';
import * as THREE from 'three';

/**
 * PodiumMesh — Light marble/granite studio pedestal.
 * Positioned at y = -1.2 to sit below the geometry-centered statue.
 * (Statue center is at world 0,0,0 so the statue extends from ~-1.1 to +1.1 in Y.
 *  The podium top at -1.2 is just below the statue's feet.)
 */
export default function PodiumMesh({ accentColor = '#888888' }) {
  const accent = useMemo(() => new THREE.Color(accentColor), [accentColor]);

  // Light Carrara marble
  const marbleMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0xe8e6e2),
        roughness: 0.3,
        metalness: 0.05,
        envMapIntensity: 0.7,
      }),
    []
  );

  const capMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0xd4d0ca),
        roughness: 0.22,
        metalness: 0.08,
      }),
    []
  );

  const ringMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: accent,
        roughness: 0.15,
        metalness: 0.6,
        emissive: accent,
        emissiveIntensity: 0.25,
        transparent: true,
        opacity: 0.8,
      }),
    [accent]
  );

  return (
    // Positioned so its top (at y=0 within this group + 1.4/2 = 0.7) sits at world y=-1.2
    // Actual top of column body = -1.2 + 0.73 = -0.47 → which is fine as a visual base
    <group position={[0, -1.2, 0]}>
      {/* Column shaft */}
      <mesh receiveShadow castShadow material={marbleMat}>
        <cylinderGeometry args={[0.58, 0.68, 1.4, 48, 1]} />
      </mesh>
      {/* Top cap */}
      <mesh position={[0, 0.73, 0]} receiveShadow castShadow material={capMat}>
        <cylinderGeometry args={[0.64, 0.64, 0.06, 48, 1]} />
      </mesh>
      {/* Bottom cap */}
      <mesh position={[0, -0.73, 0]} receiveShadow castShadow material={capMat}>
        <cylinderGeometry args={[0.78, 0.78, 0.06, 48, 1]} />
      </mesh>
      {/* Base plate */}
      <mesh position={[0, -0.82, 0]} receiveShadow material={marbleMat}>
        <cylinderGeometry args={[0.86, 0.86, 0.06, 48, 1]} />
      </mesh>
      {/* Thin accent ring at top cap */}
      <mesh position={[0, 0.71, 0]} material={ringMat}>
        <torusGeometry args={[0.62, 0.014, 8, 72]} />
      </mesh>
      {/* Contact shadow disc on floor */}
      <mesh position={[0, -0.88, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.0, 48]} />
        <meshStandardMaterial
          color="#b0a898"
          transparent
          opacity={0.12}
          roughness={1}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
