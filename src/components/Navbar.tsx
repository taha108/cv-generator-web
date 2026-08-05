import React, { useRef } from 'react';
import { ColorTheme, LayoutStyle, FontStyle, CVData } from '../types';
import { colorThemes } from '../data/themes';
import {
  Printer,
  Download,
  FileCode,
  FileJson,
  Upload,
  HelpCircle,
  Palette,
  Layout,
  Type,
  Check,
  Sparkles,
  FileText
} from 'lucide-react';
import { downloadPDF, downloadHTML, downloadJSON } from '../utils/exportUtils';

interface Props {
  data: CVData;
  theme: ColorTheme;
  layout: LayoutStyle;
  font: FontStyle;
  onThemeChange: (theme: ColorTheme) => void;
  onLayoutChange: (layout: LayoutStyle) => void;
  onFontChange: (font: FontStyle) => void;
  onDataChange: (data: CVData) => void;
  onOpenHelp: () => void;
  isGeneratingPdf: boolean;
  setIsGeneratingPdf: (val: boolean) => void;
}

export const Navbar: React.FC<Props> = ({
  data,
  theme,
  layout,
  font,
  onThemeChange,
  onLayoutChange,
  onFontChange,
  onDataChange,
  onOpenHelp,
  isGeneratingPdf,
  setIsGeneratingPdf
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDownloadPDF = async () => {
    setIsGeneratingPdf(true);
    try {
      await downloadPDF('cv-preview-container', `${data.nom || 'cv'}-CV.pdf`);
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la génération PDF. Essayez 'Imprimer' pour générer en PDF nativement.");
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed) {
          onDataChange(parsed);
        }
      } catch (err) {
        alert("Fichier JSON invalide.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-40 print:hidden">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Title & Brand */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-tr from-teal-500 to-emerald-400 rounded-xl text-slate-950 font-bold shadow-lg shadow-teal-500/20">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-bold text-white flex items-center gap-2">
              CV Generator
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/20 font-medium">
                Web & PDF
              </span>
            </h1>
            <p className="text-[11px] text-slate-400">Génération automatique sans WeasyPrint/GTK</p>
          </div>
        </div>

        {/* Styling Controls */}
        <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
          {/* Theme Selector */}
          <div className="flex items-center gap-1.5 bg-slate-950/80 border border-slate-800 px-2.5 py-1.5 rounded-xl text-xs">
            <Palette className="w-3.5 h-3.5 text-teal-400 shrink-0" />
            <select
              value={theme.id}
              onChange={(e) => {
                const found = colorThemes.find((t) => t.id === e.target.value);
                if (found) onThemeChange(found);
              }}
              className="bg-transparent text-slate-200 focus:outline-none cursor-pointer pr-1 text-xs"
            >
              {colorThemes.map((t) => (
                <option key={t.id} value={t.id} className="bg-slate-900 text-white">
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          {/* Layout Switcher */}
          <div className="flex items-center gap-1.5 bg-slate-950/80 border border-slate-800 px-2.5 py-1.5 rounded-xl text-xs">
            <Layout className="w-3.5 h-3.5 text-teal-400 shrink-0" />
            <select
              value={layout}
              onChange={(e) => onLayoutChange(e.target.value as LayoutStyle)}
              className="bg-transparent text-slate-200 focus:outline-none cursor-pointer text-xs"
            >
              <option value="sidebar-left" className="bg-slate-900 text-white">Sidebar Gauche</option>
              <option value="top-header" className="bg-slate-900 text-white">En-tête Haut</option>
            </select>
          </div>

          {/* Font Switcher */}
          <div className="flex items-center gap-1.5 bg-slate-950/80 border border-slate-800 px-2.5 py-1.5 rounded-xl text-xs">
            <Type className="w-3.5 h-3.5 text-teal-400 shrink-0" />
            <select
              value={font}
              onChange={(e) => onFontChange(e.target.value as FontStyle)}
              className="bg-transparent text-slate-200 focus:outline-none cursor-pointer text-xs"
            >
              <option value="sans" className="bg-slate-900 text-white">Sans-Serif</option>
              <option value="serif" className="bg-slate-900 text-white">Serif</option>
              <option value="mono" className="bg-slate-900 text-white">Monospace</option>
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">

          {/* Hidden File Input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImportJson}
            accept=".json"
            className="hidden"
          />

          {/* JSON Export/Import Menu */}
          <button
            onClick={() => downloadJSON(data, 'data.json')}
            className="p-2 text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 transition flex items-center gap-1 text-xs"
            title="Télécharger data.json"
          >
            <FileJson className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">JSON</span>
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-2 text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 transition flex items-center gap-1 text-xs"
            title="Importer data.json"
          >
            <Upload className="w-4 h-4 text-sky-400" />
          </button>

          {/* HTML Download */}
          <button
            onClick={() => downloadHTML(data, theme, 'cv.html')}
            className="p-2 text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 transition flex items-center gap-1 text-xs"
            title="Télécharger cv.html autonome"
          >
            <FileCode className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">HTML</span>
          </button>

          {/* Print / Native PDF */}
          <button
            onClick={handlePrint}
            className="px-3 py-2 text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 transition flex items-center gap-1.5 text-xs font-medium"
          >
            <Printer className="w-4 h-4" />
            <span className="hidden md:inline">Imprimer / PDF</span>
          </button>

          {/* Direct 1-Click PDF Download */}
          <button
            onClick={handleDownloadPDF}
            disabled={isGeneratingPdf}
            className="px-4 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-semibold rounded-xl text-xs shadow-lg shadow-teal-500/25 transition flex items-center gap-1.5 disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            {isGeneratingPdf ? 'Génération...' : 'Télécharger PDF'}
          </button>
        </div>
      </div>
    </header>
  );
};
