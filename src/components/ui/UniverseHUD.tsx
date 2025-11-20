"use client";

import React from 'react';
import { useUiStore } from '@/stores/uiStore';

export default function UniverseHUD({
  onTalk,
  status,
  transcript,
  isRecording,
  lastReply,
  onStopTts,
}: {
  onTalk?: () => void;
  status?: string;
  transcript?: string;
  isRecording?: boolean;
  lastReply?: unknown;
  onStopTts?: () => void;
}) {
  const notifications = useUiStore((s) => s.notifications);
  
    const ThinkingDots: React.FC = () => {
    const [i, setI] = React.useState(0);
    React.useEffect(() => {
      const t = setInterval(() => setI((x) => (x + 1) % 3), 350);
      return () => clearInterval(t);
    }, []);
    return <span>{'.'.repeat(i + 1)}</span>;
  };
  return (
    <div style={{display: 'flex', gap: 8, marginTop: 12, alignItems: 'center'}}>
      <button
        onClick={() => console.log('Tour guiado')}
        style={{padding: '8px 12px', borderRadius: 6}}
      >Tour guiado</button>
      <button
        onClick={() => console.log('Explorar libre')}
        style={{padding: '8px 12px', borderRadius: 6}}
      >Explorar libre</button>
      <button
        onClick={() => onTalk?.()}
        style={{padding: '8px 12px', borderRadius: 6, background: isRecording ? '#ef4444' : '#0ea5a4', color: 'white'}}
      >{isRecording ? 'Detener' : 'Hablar'}</button>
      <div style={{marginLeft: 12}}>
        <div style={{fontSize:12, opacity:0.9}}>Estado: {status} {status === 'processing' ? <span>Yaco está pensando<ThinkingDots/></span> : null}</div>
        <div style={{fontSize:12, opacity:0.8}}>Subtítulo: {transcript || '—'}</div>
        {lastReply && (lastReply as Record<string, unknown>)['tts'] ? (
          <div style={{marginTop:6}}>
            <button onClick={() => onStopTts?.()} style={{padding:'6px 8px', borderRadius:6}}>Detener TTS</button>
          </div>
        ) : null}
      </div>
      {/* Notifications overlay */}
      <div style={{position:'absolute', right:12, top:12}}>
        {notifications.slice(-3).map((n) => (
          <div key={n.id} style={{background: n.level === 'error' ? '#fee2e2' : n.level === 'warn' ? '#fffbeb' : '#ecfeff', padding:8, borderRadius:6, boxShadow:'0 4px 10px rgba(2,6,23,0.08)', marginBottom:8}}>
            <div style={{fontSize:12, fontWeight:600}}>{n.level?.toUpperCase()}</div>
            <div style={{fontSize:12}}>{n.message}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
