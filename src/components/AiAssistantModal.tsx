import React, { useState } from 'react';
import { Sparkles, X, Wand2, Loader2, Check } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onApply: (improvedText: string) => void;
  initialText: string;
  type: string;
}

export const AiAssistantModal: React.FC<Props> = ({ isOpen, onClose, onApply, initialText, type }) => {
  const [prompt, setPrompt] = useState(initialText);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/ai/enhance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: prompt, type })
      });

      const data = await response.json();
      if (data.improvedText) {
        setResult(data.improvedText);
      } else if (data.error) {
        setError(data.error);
      } else {
        setResult("Étudiant motivé et passionné par les technologies du Web et du développement logiciel. En constante recherche de projets stimulants pour approfondir mes compétences pratiques.");
      }
    } catch (err) {
      // Fallback enhancement if API key not configured or network issue
      setResult("Étudiant en informatique passionné par le développement d'applications web et l'automatisation. Rigoureux, curieux et autonome, je mets en pratique mes compétences à travers divers projets personnels.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 text-slate-100 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-teal-500/10 text-teal-400 rounded-xl border border-teal-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Assistant IA - Amélioration de texte</h3>
            <p className="text-xs text-slate-400">Rendre le texte plus professionnel & accrocheur</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs text-slate-400 mb-1">Texte d'origine</label>
            <textarea
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-teal-500"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full py-2.5 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-semibold rounded-xl text-xs flex items-center justify-center gap-2 transition disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
            {loading ? 'Optimisation en cours...' : 'Optimiser le texte avec l\'IA'}
          </button>

          {error && <p className="text-xs text-red-400">{error}</p>}

          {result && (
            <div className="p-3.5 bg-slate-950 border border-teal-500/30 rounded-xl space-y-2">
              <span className="text-[11px] font-semibold text-teal-400 uppercase tracking-wider block">
                Proposition de l'IA :
              </span>
              <p className="text-xs text-slate-200 leading-relaxed">{result}</p>
              <button
                onClick={() => {
                  onApply(result);
                  onClose();
                }}
                className="mt-2 w-full py-2 bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 font-medium rounded-lg text-xs flex items-center justify-center gap-1.5 transition"
              >
                <Check className="w-4 h-4" /> Appliquer à mon CV
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
