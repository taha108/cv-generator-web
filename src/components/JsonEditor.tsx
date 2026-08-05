import React, { useState, useEffect } from 'react';
import { CVData } from '../types';
import { FileJson, Check, AlertCircle, Copy, Download, RefreshCw } from 'lucide-react';
import { defaultCVData } from '../data/defaultData';

interface Props {
  data: CVData;
  onChange: (newData: CVData) => void;
}

export const JsonEditor: React.FC<Props> = ({ data, onChange }) => {
  const [jsonText, setJsonText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      setJsonText(JSON.stringify(data, null, 2));
      setError(null);
    } catch (e) {
      setError("Erreur lors de la sérialisation JSON.");
    }
  }, [data]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setJsonText(val);

    try {
      const parsed = JSON.parse(val);
      if (typeof parsed === 'object' && parsed !== null) {
        // Simple shape validation
        if (!parsed.nom && !parsed.titre) {
          setError("Attention: le JSON doit avoir au moins un champ 'nom' ou 'titre'.");
        } else {
          setError(null);
          onChange({
            nom: parsed.nom || '',
            titre: parsed.titre || '',
            email: parsed.email || '',
            github: parsed.github || '',
            linkedin: parsed.linkedin || '',
            telephone: parsed.telephone || '',
            resume: parsed.resume || '',
            competences: Array.isArray(parsed.competences) ? parsed.competences : [],
            formation: Array.isArray(parsed.formation) ? parsed.formation.map((f: any, idx: number) => ({ id: f.id || `edu-${idx}`, ...f })) : [],
            experiences: Array.isArray(parsed.experiences) ? parsed.experiences.map((e: any, idx: number) => ({ id: e.id || `exp-${idx}`, ...e })) : [],
            projets: Array.isArray(parsed.projets) ? parsed.projets.map((p: any, idx: number) => ({ id: p.id || `proj-${idx}`, ...p })) : [],
            langues: Array.isArray(parsed.langues) ? parsed.langues.map((l: any, idx: number) => ({ id: l.id || `lang-${idx}`, ...l })) : []
          });
        }
      }
    } catch (err: any) {
      setError("Syntaxe JSON invalide : " + err.message);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(jsonText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetDefault = () => {
    onChange(defaultCVData);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl text-slate-100 flex flex-col h-full">
      {/* JSON Header Bar */}
      <div className="p-3.5 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-semibold text-teal-300">
          <FileJson className="w-4 h-4 text-teal-400" />
          Éditeur JSON Bruts (data.json)
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={resetDefault}
            className="flex items-center gap-1 text-[11px] px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition"
            title="Réinitialiser aux données de départ"
          >
            <RefreshCw className="w-3 h-3" /> Réinitialiser
          </button>

          <button
            onClick={copyToClipboard}
            className="flex items-center gap-1 text-[11px] px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            {copied ? 'Copié !' : 'Copier'}
          </button>
        </div>
      </div>

      {/* Code Editor */}
      <div className="grow relative p-2 bg-slate-950 flex flex-col">
        <textarea
          value={jsonText}
          onChange={handleTextChange}
          spellCheck={false}
          className="w-full grow bg-transparent font-mono text-xs text-teal-300/90 leading-relaxed p-3 focus:outline-none resize-none scrollbar-thin"
        />

        {error ? (
          <div className="m-2 p-2.5 bg-red-950/60 border border-red-800/60 rounded-xl text-xs text-red-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span className="truncate">{error}</span>
          </div>
        ) : (
          <div className="m-2 p-2 bg-slate-900/60 border border-slate-800 rounded-xl text-[11px] text-emerald-400 flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span>JSON valide et synchronisé en temps réel</span>
          </div>
        )}
      </div>
    </div>
  );
};
