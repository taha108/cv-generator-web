import React from 'react';
import { AlertTriangle, CheckCircle2, Terminal, ExternalLink, X, BookOpen, ShieldCheck } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const WeasyPrintHelpModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 text-slate-100 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Résolution de l'erreur WeasyPrint</h2>
            <p className="text-xs text-amber-300 font-mono">OSError: cannot load library 'libgobject-2.0-0'</p>
          </div>
        </div>

        <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-400" />
              Pourquoi cette erreur survient sous Windows ?
            </h3>
            <p className="text-xs text-slate-400">
              WeasyPrint n'est pas une simple bibliothèque Python : elle dépend de bibliothèques C système graphiques (GTK+, Pango, GObject) pour effectuer la conversion HTML/CSS vers PDF. Sous Windows, ces bibliothèques ne sont pas installées par défaut.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-400" />
              Solution 1 : Utiliser ce Générateur Web (Recommandé)
            </h3>
            <div className="bg-teal-950/40 border border-teal-800/40 p-3.5 rounded-xl text-xs text-teal-200">
              <p className="font-medium text-teal-300 mb-1">✨ Aucune installation nécessaire !</p>
              Cette application web intègre directement votre modèle HTML/CSS et génère les PDF directement dans le navigateur avec rendu haute fidélité A4, sans aucun besoin de GTK, WeasyPrint ou Python.
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Terminal className="w-4 h-4 text-sky-400" />
              Solution 2 : Réparer WeasyPrint localement sous Windows
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-xs text-slate-300 bg-slate-950 p-4 rounded-xl border border-slate-800">
              <li>
                Téléchargez le programme d'installation <strong className="text-sky-300">GTK3 Runtime for Windows</strong> depuis GitHub :
                <a
                  href="https://github.com/tschoonj/GTK-for-Windows-Runtime-Project/releases"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-sky-400 hover:underline ml-1"
                >
                  GTK3 Runtime Releases <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>Exécutez l'installeur (ex: <code className="bg-slate-800 px-1 py-0.5 rounded text-slate-200">gtk3-runtime-...-x64.exe</code>).</li>
              <li>Assurez-vous de cocher l'option <strong>"Set PATH environment variable"</strong>.</li>
              <li>Fermez et rouvrez votre terminal (PowerShell ou VS Code).</li>
              <li>Relancez votre script : <code className="bg-slate-800 px-1.5 py-0.5 rounded text-amber-300">python generate.py</code></li>
            </ol>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold rounded-xl text-sm transition flex items-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" />
            Compris, continuer sur le Web
          </button>
        </div>
      </div>
    </div>
  );
};
