/* eslint-disable @typescript-eslint/no-explicit-any */
import { renderHook, act } from '@testing-library/react';
import useAudioCapture from '@/hooks/useAudioCapture';

// We will mock MediaRecorder behavior
class DummyMediaRecorder {
  state: 'inactive' | 'recording' = 'inactive';
  private cb: ((ev: { data: Blob }) => void) | null = null;
  constructor(public stream: MediaStream) {}
  start() {
    this.state = 'recording';
    // emit fake data after a short delay
    setTimeout(() => {
      const arr = new Uint8Array([1,2,3]).buffer;
      const blobLike = { arrayBuffer: async () => arr } as unknown as Blob;
      if (this.cb) this.cb({ data: blobLike });
    }, 10);
  }
  stop() {
    this.state = 'inactive';
  }
  addEventListener(ev: string, cb: (ev: { data: Blob }) => void) { if (ev === 'dataavailable') this.cb = cb; }
}

test('useAudioCapture starts and emits base64 chunks', async () => {
  // mock getUserMedia
  const fakeStream = {} as MediaStream;
  (navigator as any).mediaDevices = { getUserMedia: async () => fakeStream };
  (window as any).MediaRecorder = DummyMediaRecorder;

  let received: string | null = null;
  const { result } = renderHook(() => useAudioCapture((b64) => { received = b64; }));

  await act(async () => {
    await result.current.start();
    // wait for internal timeout
    await new Promise((r) => setTimeout(r, 50));
    result.current.stop();
  });

  expect(received).toBeTruthy();
});
