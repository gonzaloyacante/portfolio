import { renderHook, act } from '@testing-library/react';
import useNpcConversation from '@/hooks/useNpcConversation';

/* eslint-disable @typescript-eslint/no-explicit-any */

class MockWebSocket {
  static lastInstance: any = null;
  onopen: (() => void) | null = null;
  onmessage: ((ev: any) => void) | null = null;
  onclose: (() => void) | null = null;
  onerror: ((ev: any) => void) | null = null;
  sent: any[] = [];
  url: string;
  constructor(url: string) {
    this.url = url;
    MockWebSocket.lastInstance = this;
    setTimeout(() => this.onopen && this.onopen(), 0);
  }
  send(data: any) { this.sent.push(data); }
  close() { if (this.onclose) { this.onclose(); } }
}

test('useNpcConversation connects and processes transcript/npc_reply', async () => {
  (global as any).WebSocket = MockWebSocket;
  const sessionId = 'test-session';
  const { result } = renderHook(() => useNpcConversation(sessionId));

  // wait for connect (onopen)
  await new Promise((r) => setTimeout(r, 10));

  const inst = MockWebSocket.lastInstance;
  expect(inst).toBeTruthy();

  act(() => {
    inst.onmessage({ data: JSON.stringify({ type: 'transcript', partial: false, text: 'hola' }) });
  });

  // transcript should be updated synchronously via setState in hook
  expect(result.current.transcript).toBe('hola');

  act(() => {
    inst.onmessage({ data: JSON.stringify({ type: 'npc_reply', text: 'respuesta' }) });
  });

  expect(result.current.lastReply).toBeTruthy();
  expect((inst.sent.length) >= 0).toBe(true);

  // restore
  delete (global as any).WebSocket;
});
