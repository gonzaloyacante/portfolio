import { Howl } from 'howler';

/**
 * Reproduce una cadena base64 que contenga data:audio/...; devuelve la instancia Howl.
 */
export function playTts(base64Data: string): Howl | null {
  if (!base64Data) return null;
  try {
    // Howler acepta data URIs directamente
    const h = new Howl({ src: [base64Data], html5: true });
    h.play();
    return h;
  } catch (err) {
    console.warn('playTts error', err);
    return null;
  }
}

export default playTts;
