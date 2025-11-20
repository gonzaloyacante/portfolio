"use client";

import React, { useState, useRef, useEffect } from "react";
import { chatWithAI } from "@/services/api";

type Message = {
    role: "user" | "assistant";
    content: string;
};

export default function ChatInterface({ onClose }: { onClose: () => void }) {
    const [messages, setMessages] = useState<Message[]>([
        { role: "assistant", content: "Hola. Soy la IA de este sistema. ¿En qué puedo ayudarte?" },
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || loading) return;

        const userMsg = input;
        setInput("");
        setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
        setLoading(true);

        try {
            const response = await chatWithAI(userMsg);
            setMessages((prev) => [...prev, { role: "assistant", content: response }]);
        } catch {
            setMessages((prev) => [...prev, { role: "assistant", content: "Error de conexión con el servidor central." }]);
        } finally {
            setLoading(false);
        }
    };

    // 3D-friendly layout: no fixed position, smaller text, transparent bg
    return (
        <div className="w-[400px] h-[500px] bg-black/90 border border-cyan-500/50 rounded-lg shadow-[0_0_30px_rgba(0,255,255,0.2)] overflow-hidden flex flex-col"
            onPointerDown={(e) => e.stopPropagation()}> {/* Prevent click-through to scene */}
            {/* Header */}
            <div className="p-3 border-b border-cyan-500/30 flex justify-between items-center bg-cyan-950/20">
                <h2 className="text-cyan-400 font-mono text-sm tracking-widest flex items-center gap-2">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                    AI_CORE_LINK
                </h2>
                <button onClick={onClose} className="text-cyan-600 hover:text-cyan-300 transition-colors">
                    [X]
                </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-3 font-mono text-xs">
                {messages.map((m, i) => (
                    <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div
                            className={`max-w-[85%] p-2 rounded ${m.role === "user"
                                ? "bg-cyan-900/30 text-cyan-100 border border-cyan-700/50"
                                : "bg-black text-gray-300 border border-gray-800"
                                }`}
                        >
                            {m.content}
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="text-cyan-500 text-[10px] animate-pulse">Procesando datos...</div>
                )}
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-3 border-t border-cyan-500/30 bg-black">
                <div className="flex gap-2">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Escribe un comando..."
                        className="flex-1 bg-gray-900 border border-gray-700 text-cyan-100 p-2 rounded focus:outline-none focus:border-cyan-500 font-mono text-xs"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-cyan-900/50 text-cyan-400 px-3 py-1 rounded border border-cyan-700 hover:bg-cyan-800/50 transition-colors disabled:opacity-50 font-mono text-xs"
                    >
                        SEND
                    </button>
                </div>
            </form>
        </div>
    );
}
