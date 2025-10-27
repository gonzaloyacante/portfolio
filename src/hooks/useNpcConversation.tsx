"use client";

import { useEffect, useRef, useState } from 'react';
import NpcWs from '@/services/ws';
import { WsMsg } from '@/types';
import { playTts } from '@/services/audio';
import { useUiStore } from '@/stores/uiStore';

export function useNpcConversation(sessionId?: string) {
  const [status, setStatus] = useState<'idle' | 'connecting' | 'connected' | 'processing'>('idle');
  const [transcript, setTranscript] = useState<string>('');
  const [lastReply, setLastReply] = useState<unknown | null>(null);
  const wsRef = useRef<NpcWs | null>(null);
  const ttsRef = useRef<ReturnType<typeof playTts> | null>(null);

  useEffect(() => {
    if (!sessionId) return;
    const url = process.env.NEXT_PUBLIC_WS_URL || '';
    const client = new NpcWs(url, sessionId);
    wsRef.current = client;
  client.onMessage = (msg: WsMsg) => {
      if (msg.type === 'transcript') {
        const textCandidate = (msg as Record<string, unknown>)['text'];
        const text = typeof textCandidate === 'string' ? textCandidate : '';
        setTranscript(text);
      }
      if (msg.type === 'npc_reply') {
        setLastReply(msg as unknown);
        // reproducir TTS si viene
        const ttsCandidate = (msg as Record<string, unknown>)['tts'];
        if (typeof ttsCandidate === 'string' && ttsCandidate.startsWith('data:audio')) {
          try {
            // stop previous
            if (ttsRef.current) {
              try { ttsRef.current.stop(); } catch (errStop) { console.debug('stop previous tts failed', errStop); }
              ttsRef.current = null;
            }
            ttsRef.current = playTts(ttsCandidate);
          } catch (err) {
            console.warn('TTS playback failed', err);
          }
        }
        setStatus('idle');
      }
      if (msg.type === 'status') {
        const stateCandidate = (msg as Record<string, unknown>)['state'];
        const state = typeof stateCandidate === 'string' ? stateCandidate : 'processing';
        setStatus(state as 'processing' | 'idle' | 'connecting' | 'connected');
      }
    };
    client.onOpen = () => {
      useUiStore.getState().setConnectionState('connected');
      useUiStore.getState().addNotification('Conectado al NPC', 'info');
    };
    client.onClose = () => {
      useUiStore.getState().setConnectionState('disconnected');
      useUiStore.getState().addNotification('Conexión perdida. Reintentando...', 'warn');
    };
    client.onError = (err) => {
      useUiStore.getState().addNotification(`Error WS: ${String(err)}`, 'error');
    };
  client.connect();

    return () => {
      client.close();
      wsRef.current = null;
    };
  }, [sessionId]);

  function sendText(text: string) {
    wsRef.current?.sendText(text);
    setStatus('processing');
  }

  function sendAudioChunk(base64: string, seq: number) {
    wsRef.current?.sendAudioChunk(base64, seq);
  }

  function stopTts() {
    try {
      if (ttsRef.current) {
        ttsRef.current.stop();
        ttsRef.current = null;
      }
    } catch (err) {
      console.warn('stopTts error', err);
    }
  }

  function close() {
    wsRef.current?.close();
    setStatus('idle');
  }

  return { status, transcript, lastReply, sendText, sendAudioChunk, stopTts, close };
}

export default useNpcConversation;
