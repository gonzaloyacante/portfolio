"use client";

import { useEffect, useRef, useState } from 'react';

type OnChunk = (base64: string, blob: Blob) => void;

export function useAudioCapture(onChunk?: OnChunk) {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  async function start() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error('getUserMedia not supported');
    }
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const options: MediaRecorderOptions = { mimeType: 'audio/webm' };
    const mr = new MediaRecorder(stream, options);
    mediaRecorderRef.current = mr;
    mr.addEventListener('dataavailable', async (ev) => {
      const blob = ev.data;
      // convert to base64
      const arr = await blob.arrayBuffer();
      const b64 = bufferToBase64(arr);
      onChunk?.(b64, blob);
    });
    mr.start(250); // emit every 250ms
    setIsRecording(true);
  }

  function stop() {
    mediaRecorderRef.current?.stop();
    mediaRecorderRef.current = null;
    setIsRecording(false);
  }

  return { start, stop, isRecording };
}

function bufferToBase64(buffer: ArrayBuffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

export default useAudioCapture;
