import { WsMsg } from '@/types';

type MessageHandler = (msg: WsMsg) => void;

export class NpcWs {
  ws: WebSocket | null = null;
  url: string;
  sessionId: string;
  onMessage: MessageHandler = () => {};
  onOpen: () => void = () => {};
  onClose: () => void = () => {};
  onError: (err: unknown) => void = () => {};
  private heartbeatTimer: ReturnType<typeof setInterval> | null = null;
  private reconnectDelay = 2000;

  constructor(url: string, sessionId: string) {
    this.url = `${url}?session_id=${sessionId}`;
    this.sessionId = sessionId;
  }

  connect() {
    if (this.ws) this.close();
    this.ws = new WebSocket(this.url);
    this.ws.onopen = () => {
      console.log('NpcWs open');
      this.startHeartbeat();
      try { this.onOpen(); } catch (e) { console.debug('onOpen callback failed', e); }
    };
    this.ws.onmessage = (ev) => {
      try {
        const msg = JSON.parse(ev.data) as WsMsg;
        this.onMessage(msg);
      } catch (err) {
        console.warn('Malformed ws message', err);
      }
    };
    this.ws.onclose = () => {
      console.warn('NpcWs closed, reconnecting...');
      this.stopHeartbeat();
      try { this.onClose(); } catch (e) { console.debug('onClose callback failed', e); }
      setTimeout(() => this.connect(), this.reconnectDelay);
    };
    this.ws.onerror = (ev) => {
      console.error('NpcWs error', ev);
      try { this.onError(ev); } catch (e) { console.debug('onError callback failed', e); }
    };
  }

  private startHeartbeat() {
    this.stopHeartbeat();
    this.heartbeatTimer = setInterval(() => {
      try {
        this.ws?.send(JSON.stringify({ type: 'control', action: 'ping' }));
      } catch (err) {
        // ignore
        console.debug('Heartbeat send failed', err);
      }
    }, 20000);
  }

  private stopHeartbeat() {
    if (this.heartbeatTimer) clearInterval(this.heartbeatTimer);
    this.heartbeatTimer = null;
  }

  sendText(text: string) {
    this.ws?.send(JSON.stringify({ type: 'text', data: text }));
  }

  sendAudioChunk(base64: string, seq: number) {
    this.ws?.send(JSON.stringify({ type: 'audio_chunk', data: base64, seq }));
  }

  close() {
    this.stopHeartbeat();
    this.ws?.close();
    this.ws = null;
  }
}

export default NpcWs;
