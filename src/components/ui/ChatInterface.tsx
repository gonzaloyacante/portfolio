"use client";

import React, { useState, useEffect, useRef } from "react";

interface Message {
    role: "user" | "assistant";
    content: string;
}

interface ChatInterfaceProps {
    onClose: () => void;
}

export default function ChatInterface({ onClose }: ChatInterfaceProps) {
    const [messages, setMessages] = useState<Message[]>([
        { role: "assistant", content: "Greetings, Traveler. I am your Guide to Gonzalo's digital universe. How may I assist you today?" }
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const SUGGESTED_QUESTIONS = [
        "Who is Gonzalo?",
        "Show me the projects",
        "What technologies are used here?",
        "Tell me about the creator's skills"
    ];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (text: string = input) => {
        if (!text.trim()) return;

        const userMsg: Message = { role: "user", content: text };
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: [...messages, userMsg] }),
            });

            if (!response.ok) throw new Error("Failed to fetch response");

            const data = await response.json();
            const aiMsg: Message = { role: "assistant", content: data.message };
            setMessages(prev => [...prev, aiMsg]);
        } catch (error) {
            console.error("Chat error:", error);
            setMessages(prev => [...prev, { role: "assistant", content: "I apologize, my connection to the mainframe is unstable. Please try again." }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-[400px] h-[500px] flex flex-col bg-black/80 backdrop-blur-md border border-cyan-500/50 rounded-xl overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.3)] font-mono">
            {/* Header */}
            <div className="p-4 border-b border-cyan-500/30 bg-cyan-950/30 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="text-cyan-400 font-bold tracking-wider">AI GUIDE SYSTEM</span>
                </div>
                <button
                    onClick={onClose}
                    className="text-cyan-400/70 hover:text-cyan-400 transition-colors"
                >
                    ✕
                </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-cyan-900 scrollbar-track-transparent">
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                        <div
                            className={`max-w-[85%] p-3 rounded-lg text-sm ${msg.role === "user"
                                    ? "bg-cyan-900/50 text-cyan-100 border border-cyan-700/50"
                                    : "bg-black/50 text-gray-300 border border-gray-800"
                                }`}
                        >
                            {msg.content}
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex justify-start">
                        <div className="bg-black/50 text-cyan-400 p-3 rounded-lg text-xs animate-pulse border border-gray-800">
                            PROCESSING DATA...
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions */}
            {messages.length < 3 && (
                <div className="px-4 pb-2 flex flex-wrap gap-2">
                    {SUGGESTED_QUESTIONS.map((q, i) => (
                        <button
                            key={i}
                            onClick={() => handleSend(q)}
                            className="text-[10px] bg-cyan-950/50 hover:bg-cyan-900/50 text-cyan-300 border border-cyan-800/50 px-2 py-1 rounded transition-all hover:scale-105"
                        >
                            {q}
                        </button>
                    ))}
                </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-cyan-500/30 bg-black/40">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        placeholder="Ask the guide..."
                        className="flex-1 bg-black/50 border border-cyan-900/50 rounded px-3 py-2 text-cyan-100 text-sm focus:outline-none focus:border-cyan-500/50 placeholder-cyan-900/50"
                    />
                    <button
                        onClick={() => handleSend()}
                        disabled={loading}
                        className="bg-cyan-900/30 hover:bg-cyan-800/50 text-cyan-400 border border-cyan-700/50 px-4 rounded transition-colors disabled:opacity-50"
                    >
                        SEND
                    </button>
                </div>
            </div>
        </div>
    );
}
