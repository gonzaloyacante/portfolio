import { useEffect } from 'react';
import { useGLTF } from '@react-three/drei';

/**
 * Helper to preload a glTF model via drei's useGLTF.preload when available.
 */
export function preloadGltf(url: string) {
  try {
    // useGLTF has a preload method attached by drei at runtime in some builds
    // access it defensively to avoid TS errors
    const anyUseGLTF = useGLTF as unknown as { preload?: (u: string) => void } | undefined;
    if (anyUseGLTF && typeof anyUseGLTF.preload === 'function') {
      anyUseGLTF.preload(url);
    }
  } catch (err) {
    console.debug('preloadGltf failed', err);
  }
}

export function usePreloadGltf(url?: string) {
  useEffect(() => {
    if (!url) return;
    preloadGltf(url);
  }, [url]);
}

const assets = { preloadGltf, usePreloadGltf };
export default assets;
