import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import useNpcConversation from '@/hooks/useNpcConversation';
import useAudioCapture from '@/hooks/useAudioCapture';

const WorldCanvas = dynamic(() => import('@/scenes/WorldCanvas'), { ssr: false });
const UniverseHUD = dynamic(() => import('@/components/ui/UniverseHUD'), { ssr: false });

export default function Page() {
  const [sessionId] = useState(() => Date.now().toString());
  const { status, transcript, lastReply, sendAudioChunk, stopTts } = useNpcConversation(sessionId);
  const [seq, setSeq] = useState(0);

  const onChunk = (b64: string) => {
    const next = seq + 1;
    setSeq(next);
    sendAudioChunk?.(b64, next);
  };

  const { start, stop, isRecording } = useAudioCapture(onChunk);

  function handleTalk() {
    if (isRecording) {
      stop();
    } else {
      start().catch((e) => console.error('Mic error', e));
    }
  }

  return (
    <main style={{padding: 24}}>
      <h1>Universo — (placeholder)</h1>
      <p>Bienvenido al Universe route. Aquí se montará el canvas 3D en cliente.</p>
      <WorldCanvas />
  <UniverseHUD onTalk={handleTalk} status={status} transcript={transcript} isRecording={isRecording} lastReply={lastReply} onStopTts={stopTts} />
      <div style={{marginTop:12}}>
        <div>Status: {status} {isRecording ? '(recording...)' : ''}</div>
        <div>Transcript: {transcript}</div>
        <div>LastReply: {lastReply ? JSON.stringify(lastReply) : '–'}</div>
      </div>
    </main>
  );
}
