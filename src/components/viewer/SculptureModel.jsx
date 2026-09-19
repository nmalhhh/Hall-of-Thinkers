import React, { Component, useLayoutEffect, useMemo, useRef, useState, useEffect } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import * as THREE from 'three';
import ProceduralBustFallback from './ProceduralBustFallback';

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');

// In-memory cache for blob URLs across component re-renders
const blobUrlCache = new Map();

export async function fetchWithCache(url, onProgress) {
  if (!url) return url;

  if (blobUrlCache.has(url)) {
    if (onProgress) onProgress(100);
    return blobUrlCache.get(url);
  }

  if ('caches' in window) {
    try {
      const cache = await caches.open('hall-of-thinkers-v1');
      const cachedResponse = await cache.match(url);
      if (cachedResponse) {
        console.info(`[Cache HIT] ${url}`);
        if (onProgress) onProgress(100);
        const blob = await cachedResponse.blob();
        const blobUrl = URL.createObjectURL(blob);
        blobUrlCache.set(url, blobUrl);
        return blobUrl;
      }

      console.info(`[Cache MISS] Fetching ${url}`);
      const response = await fetch(url);
      if (response.ok) {
        const contentLength = response.headers.get('content-length');
        const totalBytes = contentLength ? parseInt(contentLength, 10) : 0;

        let blob;
        if (response.body && totalBytes > 0 && typeof ReadableStream !== 'undefined') {
          const reader = response.body.getReader();
          const chunks = [];
          let receivedBytes = 0;

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            chunks.push(value);
            receivedBytes += value.length;
            if (onProgress) {
              const pct = Math.min(99, Math.round((receivedBytes / totalBytes) * 100));
              onProgress(pct);
            }
          }
          blob = new Blob(chunks);
        } else {
          blob = await response.blob();
        }

        if (onProgress) onProgress(100);

        try {
          await cache.put(url, new Response(blob, { headers: response.headers }));
        } catch (cacheErr) {
          console.warn('[fetchWithCache] Cache put error:', cacheErr);
        }

        const blobUrl = URL.createObjectURL(blob);
        blobUrlCache.set(url, blobUrl);
        return blobUrl;
      }
    } catch (err) {
      console.warn('[fetchWithCache] Cache API error, falling back to direct URL:', err);
    }
  }

  return url;
}

export class ModelErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error(`[SculptureModel] Error loading ${this.props.modelUrl}:`, error);
    if (this.props.onError) {
      this.props.onError(error);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.modelUrl !== this.props.modelUrl && this.state.hasError) {
      this.setState({ hasError: false });
    }
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

export function SculptureModel({ modelUrl, accentColor = '#888888', onLoaded, onProgress, onError }) {
  const [blobUrl, setBlobUrl] = useState(null);
  const [loadError, setLoadError] = useState(null);
  const groupRef = useRef();

  useEffect(() => {
    let active = true;
    setBlobUrl(null);
    setLoadError(null);

    fetchWithCache(modelUrl, onProgress)
      .then((url) => {
        if (active) setBlobUrl(url);
      })
      .catch((err) => {
        if (active) {
          setLoadError(err.message);
          if (onError) onError(err);
        }
      });

    return () => {
      active = false;
    };
  }, [modelUrl]);

  if (!modelUrl) {
    return <ProceduralBustFallback accentColor={accentColor} />;
  }

  if (loadError) {
    console.error(`Failed to load ${modelUrl}:`, loadError);
    return null;
  }

  if (!blobUrl) return null;

  return (
    <ModelErrorBoundary modelUrl={modelUrl} onError={onError}>
      <ModelInstance blobUrl={blobUrl} groupRef={groupRef} onLoaded={onLoaded} />
    </ModelErrorBoundary>
  );
}

function ModelInstance({ blobUrl, groupRef, onLoaded }) {
  const gltf = useLoader(GLTFLoader, blobUrl, (loader) => {
    loader.setDRACOLoader(dracoLoader);
  });

  const clonedScene = useMemo(() => {
    if (!gltf || !gltf.scene) return null;
    return gltf.scene.clone(true);
  }, [gltf]);

  useLayoutEffect(() => {
    if (!clonedScene) return;

    const box = new THREE.Box3().setFromObject(clonedScene);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    const maxDim = Math.max(size.x, size.y, size.z);
    const targetScale = maxDim > 0.001 ? 2.4 / maxDim : 1;
    clonedScene.scale.setScalar(targetScale);

    clonedScene.position.x = -center.x * targetScale;
    clonedScene.position.y = -center.y * targetScale;
    clonedScene.position.z = -center.z * targetScale;

    clonedScene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach((mat) => {
              if (mat) {
                mat.side = THREE.DoubleSide;
                mat.needsUpdate = true;
              }
            });
          } else {
            child.material.side = THREE.DoubleSide;
            child.material.needsUpdate = true;
          }
        }
      }
    });

    if (onLoaded) {
      onLoaded();
    }
  }, [clonedScene, onLoaded]);

  if (!clonedScene) return null;

  return (
    <group ref={groupRef}>
      <primitive object={clonedScene} />
    </group>
  );
}

export function preloadSculptureModel(modelUrl) {
  if (!modelUrl) return;
  fetchWithCache(modelUrl).catch(() => {});
}

export default SculptureModel;
