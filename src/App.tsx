import React, { useState } from 'react';
import { CVData, ColorTheme, LayoutStyle, FontStyle } from './types';
import { defaultCVData } from './data/defaultData';
import { colorThemes } from './data/themes';
import { Navbar } from './components/Navbar';
import { FormEditor } from './components/FormEditor';
import { JsonEditor } from './components/JsonEditor';
import { CVPreview } from './components/CVPreview';
import { WeasyPrintHelpModal } from './components/WeasyPrintHelpModal';
import { AiAssistantModal } from './components/AiAssistantModal';
import { Edit3, FileJson, Sparkles, ZoomIn, ZoomOut, AlertCircle, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [data, setData] = useState<CVData>(defaultCVData);
  const [theme, setTheme] = useState<ColorTheme>(colorThemes[0]);
  const [layout, setLayout] = useState<LayoutStyle>('sidebar-left');
  const [font, setFont] = useState<FontStyle>('sans');
  const [editorMode, setEditorMode] = useState<'form' | 'json'>('form');

  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [zoomLevel, setZoomLevel] = useState<number>(0.9);

  const handleApplyAiText = (newText: string) => {
    setData((prev) => ({ ...prev, resume: newText }));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-teal-500/30 selection:text-teal-200">
      {/* Top Navigation */}
      <Navbar
        data={data}
        theme={theme}
        layout={layout}
        font={font}
        onThemeChange={setTheme}
        onLayoutChange={setLayout}
        onFontChange={setFont}
        onDataChange={setData}
        onOpenHelp={() => setIsHelpOpen(true)}
        isGeneratingPdf={isGeneratingPdf}
        setIsGeneratingPdf={setIsGeneratingPdf}
      />

      {/* Main Workspace */}
      <main className="grow max-w-[1600px] w-full mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 print:p-0 print:m-0">
        {/* Left Column: Form / JSON Editor Controls */}
        <div className="lg:col-span-5 flex flex-col gap-4 print:hidden h-[calc(100vh-100px)] sticky top-20">
          {/* Mode Switcher & AI Trigger */}
          <div className="flex items-center justify-between bg-slate-900 border border-slate-800 p-1.5 rounded-2xl">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setEditorMode('form')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                  editorMode === 'form'
                    ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" />
                Formulaire
              </button>

              <button
                onClick={() => setEditorMode('json')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                  editorMode === 'json'
                    ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <FileJson className="w-3.5 h-3.5" />
                data.json
              </button>
            </div>

            <button
              onClick={() => setIsAiModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-teal-500/20 to-emerald-500/20 hover:from-teal-500/30 hover:to-emerald-500/30 text-teal-300 border border-teal-500/30 rounded-xl text-xs font-medium transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
              IA Rédaction
            </button>
          </div>

          {/* Active Editor Component */}
          <div className="grow overflow-hidden">
            {editorMode === 'form' ? (
              <FormEditor data={data} onChange={setData} />
            ) : (
              <JsonEditor data={data} onChange={setData} />
            )}
          </div>
        </div>

        {/* Right Column: Live A4 PDF Preview */}
        <div className="lg:col-span-7 flex flex-col gap-3 print:col-span-12">
          {/* Zoom Controls Bar */}
          <div className="flex items-center justify-between bg-slate-900/80 border border-slate-800 px-4 py-2 rounded-2xl text-xs text-slate-400 print:hidden">
            <span className="flex items-center gap-2 text-teal-300 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Aperçu A4 en direct
            </span>

            <div className="flex items-center gap-3">
              <span className="text-slate-500">Zoom: {Math.round(zoomLevel * 100)}%</span>
              <button
                onClick={() => setZoomLevel((z) => Math.max(0.6, z - 0.1))}
                className="p-1 hover:text-white bg-slate-800 rounded-lg"
                title="Dézoomer"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setZoomLevel((z) => Math.min(1.2, z + 0.1))}
                className="p-1 hover:text-white bg-slate-800 rounded-lg"
                title="Zoomer"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setZoomLevel(0.9)}
                className="p-1 hover:text-white bg-slate-800 rounded-lg"
                title="Réinitialiser zoom"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Scaled Preview Canvas */}
          <div className="overflow-auto bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4 flex justify-center items-start shadow-inner min-h-[700px] print:p-0 print:border-none print:bg-white">
            <div
              style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top center' }}
              className="transition-transform duration-150 ease-out"
            >
              <CVPreview data={data} theme={theme} layout={layout} font={font} />
            </div>
          </div>
        </div>
      </main>

      {/* Help Modal for WeasyPrint error */}
      <WeasyPrintHelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />

      {/* AI Assistant Modal */}
      <AiAssistantModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        onApply={handleApplyAiText}
        initialText={data.resume}
        type="profil"
      />
    </div>
  );
}