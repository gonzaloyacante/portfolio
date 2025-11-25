"use client";

import React, { useState } from "react";
import PDFViewer from "./PDFViewer";

interface CVModalProps {
    onClose: () => void;
}

export default function CVModal({ onClose }: CVModalProps) {
    const [selectedPDF, setSelectedPDF] = useState<{ url: string; title: string } | null>(null);

    const cvLinks = {
        en: { url: "/cv/Gonzalo_Yacante_CV_EN.pdf", title: "CV - English" },
        es: { url: "/cv/Gonzalo_Yacante_CV_ES.pdf", title: "CV - Español" },
        pt: { url: "/cv/Gonzalo_Yacante_CV_PT.pdf", title: "CV - Português" },
    };

    const openCV = (lang: 'en' | 'es' | 'pt') => {
        setSelectedPDF(cvLinks[lang]);
    };

    if (selectedPDF) {
        return (
            <PDFViewer
                pdfUrl={selectedPDF.url}
                title={selectedPDF.title}
                onClose={() => {
                    setSelectedPDF(null);
                    onClose();
                }}
            />
        );
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="bg-gradient-to-br from-gray-900 to-gray-950 border-2 border-cyan-500 rounded-xl shadow-[0_0_50px_rgba(6,182,212,0.5)] p-8 max-w-md w-full mx-4 font-mono">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-cyan-400">SELECT LANGUAGE</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Description */}
                <p className="text-gray-400 mb-6 text-sm">
                    Choose your preferred language to view the CV / Resume
                </p>

                {/* Language Options */}
                <div className="space-y-3">
                    <button
                        onClick={() => openCV('en')}
                        className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white px-6 py-4 rounded-lg transition-all hover:scale-105 shadow-lg shadow-blue-500/20 font-semibold flex items-center justify-between"
                    >
                        <span className="flex items-center gap-3">
                            <span className="text-2xl">🇬🇧</span>
                            <span>English</span>
                        </span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    <button
                        onClick={() => openCV('es')}
                        className="w-full bg-gradient-to-r from-yellow-600 to-red-600 hover:from-yellow-500 hover:to-red-500 text-white px-6 py-4 rounded-lg transition-all hover:scale-105 shadow-lg shadow-yellow-500/20 font-semibold flex items-center justify-between"
                    >
                        <span className="flex items-center gap-3">
                            <span className="text-2xl">🇪🇸</span>
                            <span>Español</span>
                        </span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    <button
                        onClick={() => openCV('pt')}
                        className="w-full bg-gradient-to-r from-green-600 to-yellow-500 hover:from-green-500 hover:to-yellow-400 text-white px-6 py-4 rounded-lg transition-all hover:scale-105 shadow-lg shadow-green-500/20 font-semibold flex items-center justify-between"
                    >
                        <span className="flex items-center gap-3">
                            <span className="text-2xl">🇧🇷</span>
                            <span>Português</span>
                        </span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="w-full mt-6 bg-gray-800 hover:bg-gray-700 text-gray-300 px-6 py-3 rounded-lg transition-all border border-gray-600 font-semibold"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}
