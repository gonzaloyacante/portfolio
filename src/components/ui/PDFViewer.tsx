"use client";

import React, { useState } from "react";

interface PDFViewerProps {
    pdfUrl: string;
    onClose: () => void;
    title: string;
}

export default function PDFViewer({ pdfUrl, onClose, title }: PDFViewerProps) {
    const [loadError, setLoadError] = useState(false);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="w-[95vw] h-[90vh] bg-gray-900/95 border-2 border-cyan-500 rounded-xl shadow-[0_0_50px_rgba(6,182,212,0.5)] overflow-hidden flex flex-col font-mono">
                {/* Header */}
                <div className="bg-gradient-to-r from-cyan-950 to-blue-950 border-b-2 border-cyan-500/30 p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex gap-2">
                            <button
                                onClick={onClose}
                                className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors"
                                title="Close"
                            />
                            <div className="w-3 h-3 rounded-full bg-yellow-500" />
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                        </div>
                        <h2 className="text-cyan-400 font-bold text-lg">{title}</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-cyan-400 hover:text-cyan-300 transition-colors px-4 py-2 border border-cyan-700/50 rounded hover:bg-cyan-900/30"
                    >
                        [ ESC ]
                    </button>
                </div>

                {/* PDF Content */}
                <div className="flex-1 relative bg-black/20 overflow-hidden">
                    {loadError ? (
                        <div className="w-full h-full flex items-center justify-center">
                            <div className="text-center p-8 max-w-md">
                                <svg className="w-20 h-20 mx-auto mb-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                <h2 className="text-2xl font-bold text-cyan-400 mb-4">PDF NOT AVAILABLE</h2>
                                <p className="text-gray-300 mb-6">
                                    The CV file could not be loaded. It may not exist yet or there was an error loading it.
                                </p>
                                <button
                                    onClick={onClose}
                                    className="bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-3 rounded-lg transition-all hover:scale-105 shadow-lg shadow-cyan-500/20 font-semibold"
                                >
                                    CLOSE
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <iframe
                                src={pdfUrl}
                                className="w-full h-full border-0"
                                title={title}
                                onError={() => setLoadError(true)}
                            />

                            {/* Corner decorations */}
                            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500/30 pointer-events-none" />
                            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-500/30 pointer-events-none" />
                            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-500/30 pointer-events-none" />
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500/30 pointer-events-none" />
                        </>
                    )}
                </div>

                {/* Footer */}
                <div className="bg-gradient-to-r from-cyan-950 to-blue-950 border-t-2 border-cyan-500/30 p-3 flex items-center justify-between text-xs text-cyan-400">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${loadError ? 'bg-red-500' : 'bg-green-500 animate-pulse'}`} />
                            <span>{loadError ? 'LOAD ERROR' : 'DOCUMENT LOADED'}</span>
                        </div>
                        <span className="text-cyan-600">|</span>
                        <span>PDF VIEWER v1.0</span>
                    </div>
                    <div className="text-cyan-600">
                        Press ESC to close
                    </div>
                </div>
            </div>
        </div>
    );
}
