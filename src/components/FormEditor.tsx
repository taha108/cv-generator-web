import React, { useState } from 'react';
import { CVData, Education, Experience, Project, Language } from '../types';
import { Plus, Trash2, User, Briefcase, GraduationCap, Code, FolderGit2, Languages, Sparkles } from 'lucide-react';

interface Props {
  data: CVData;
  onChange: (newData: CVData) => void;
  onOpenAiHelper?: (type: string, currentText: string, callback: (res: string) => void) => void;
}

export const FormEditor: React.FC<Props> = ({ data, onChange }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'education' | 'experience' | 'skills' | 'projects' | 'languages'>('profile');
  const [newSkill, setNewSkill] = useState('');

  const updateProfile = (field: keyof CVData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  // Education Handlers
  const addEducation = () => {
    const newEdu: Education = {
      id: `edu-${Date.now()}`,
      diplome: '',
      etablissement: '',
      periode: ''
    };
    onChange({ ...data, formation: [...data.formation, newEdu] });
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    const updated = data.formation.map(item => item.id === id ? { ...item, [field]: value } : item);
    onChange({ ...data, formation: updated });
  };

  const removeEducation = (id: string) => {
    onChange({ ...data, formation: data.formation.filter(item => item.id !== id) });
  };

  // Experience Handlers
  const addExperience = () => {
    const newExp: Experience = {
      id: `exp-${Date.now()}`,
      poste: '',
      entreprise: '',
      periode: '',
      description: ''
    };
    onChange({ ...data, experiences: [...data.experiences, newExp] });
  };

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    const updated = data.experiences.map(item => item.id === id ? { ...item, [field]: value } : item);
    onChange({ ...data, experiences: updated });
  };

  const removeExperience = (id: string) => {
    onChange({ ...data, experiences: data.experiences.filter(item => item.id !== id) });
  };

  // Skills Handlers
  const addSkill = () => {
    if (!newSkill.trim()) return;
    onChange({ ...data, competences: [...data.competences, newSkill.trim()] });
    setNewSkill('');
  };

  const removeSkill = (index: number) => {
    const updated = data.competences.filter((_, i) => i !== index);
    onChange({ ...data, competences: updated });
  };

  // Project Handlers
  const addProject = () => {
    const newProj: Project = {
      id: `proj-${Date.now()}`,
      nom: '',
      description: '',
      lien: ''
    };
    onChange({ ...data, projets: [...data.projets, newProj] });
  };

  const updateProject = (id: string, field: keyof Project, value: string) => {
    const updated = data.projets.map(item => item.id === id ? { ...item, [field]: value } : item);
    onChange({ ...data, projets: updated });
  };

  const removeProject = (id: string) => {
    onChange({ ...data, projets: data.projets.filter(item => item.id !== id) });
  };

  // Language Handlers
  const addLanguage = () => {
    const newLang: Language = {
      id: `lang-${Date.now()}`,
      langue: '',
      niveau: 'Courant'
    };
    onChange({ ...data, langues: [...data.langues, newLang] });
  };

  const updateLanguage = (id: string, field: keyof Language, value: string) => {
    const updated = data.langues.map(item => item.id === id ? { ...item, [field]: value } : item);
    onChange({ ...data, langues: updated });
  };

  const removeLanguage = (id: string) => {
    onChange({ ...data, langues: data.langues.filter(item => item.id !== id) });
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl text-slate-100 flex flex-col h-full">
      {/* Sub-nav Tabs */}
      <div className="flex overflow-x-auto border-b border-slate-800 bg-slate-950/60 p-1.5 gap-1 scrollbar-none">
        {[
          { id: 'profile', label: 'Profil', icon: User },
          { id: 'experience', label: 'Expériences', icon: Briefcase },
          { id: 'education', label: 'Formation', icon: GraduationCap },
          { id: 'skills', label: 'Compétences', icon: Code },
          { id: 'projects', label: 'Projets', icon: FolderGit2 },
          { id: 'languages', label: 'Langues', icon: Languages }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-teal-500/15 text-teal-300 border border-teal-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Form Content Area */}
      <div className="p-5 overflow-y-auto grow space-y-4">
        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
              <User className="w-4 h-4 text-teal-400" />
              Informations Personnelles & Contact
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Nom Complet</label>
                <input
                  type="text"
                  value={data.nom}
                  onChange={(e) => updateProfile('nom', e.target.value)}
                  placeholder="ex: Taha El"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Titre / Poste visé</label>
                <input
                  type="text"
                  value={data.titre}
                  onChange={(e) => updateProfile('titre', e.target.value)}
                  placeholder="ex: Étudiant en informatique"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Email</label>
                <input
                  type="email"
                  value={data.email}
                  onChange={(e) => updateProfile('email', e.target.value)}
                  placeholder="tahaelmeliani@gmail.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Téléphone (Optionnel)</label>
                <input
                  type="text"
                  value={data.telephone}
                  onChange={(e) => updateProfile('telephone', e.target.value)}
                  placeholder="06 00 00 00 00"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Lien GitHub</label>
                <input
                  type="text"
                  value={data.github}
                  onChange={(e) => updateProfile('github', e.target.value)}
                  placeholder="https://github.com/taha108"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Lien LinkedIn (Optionnel)</label>
                <input
                  type="text"
                  value={data.linkedin}
                  onChange={(e) => updateProfile('linkedin', e.target.value)}
                  placeholder="https://linkedin.com/in/..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Résumé / Description de Profil</label>
              <textarea
                rows={3}
                value={data.resume}
                onChange={(e) => updateProfile('resume', e.target.value)}
                placeholder="Étudiant passionné par le développement..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-teal-500 transition"
              />
            </div>
          </div>
        )}

        {/* Experience Tab */}
        {activeTab === 'experience' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-teal-400" />
                Expériences Professionnelles
              </h3>
              <button
                onClick={addExperience}
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-teal-500/20 text-teal-300 hover:bg-teal-500/30 rounded-lg transition"
              >
                <Plus className="w-3.5 h-3.5" /> Ajouter
              </button>
            </div>

            {data.experiences.length === 0 ? (
              <p className="text-xs text-slate-500 italic py-4 text-center">Aucune expérience ajoutée.</p>
            ) : (
              <div className="space-y-3">
                {data.experiences.map((exp) => (
                  <div key={exp.id} className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-3 relative group">
                    <button
                      onClick={() => removeExperience(exp.id)}
                      className="absolute top-3 right-3 text-slate-500 hover:text-red-400 transition"
                      title="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-8">
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Poste</label>
                        <input
                          type="text"
                          value={exp.poste}
                          onChange={(e) => updateExperience(exp.id, 'poste', e.target.value)}
                          placeholder="ex: Caissier"
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-teal-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Entreprise</label>
                        <input
                          type="text"
                          value={exp.entreprise}
                          onChange={(e) => updateExperience(exp.id, 'entreprise', e.target.value)}
                          placeholder="ex: Lidl"
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-teal-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Période</label>
                      <input
                        type="text"
                        value={exp.periode}
                        onChange={(e) => updateExperience(exp.id, 'periode', e.target.value)}
                        placeholder="ex: 2023 - 2024"
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-teal-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Description des tâches</label>
                      <textarea
                        rows={2}
                        value={exp.description}
                        onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                        placeholder="Description..."
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-teal-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Education Tab */}
        {activeTab === 'education' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-teal-400" />
                Formations & Diplômes
              </h3>
              <button
                onClick={addEducation}
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-teal-500/20 text-teal-300 hover:bg-teal-500/30 rounded-lg transition"
              >
                <Plus className="w-3.5 h-3.5" /> Ajouter
              </button>
            </div>

            {data.formation.length === 0 ? (
              <p className="text-xs text-slate-500 italic py-4 text-center">Aucune formation ajoutée.</p>
            ) : (
              <div className="space-y-3">
                {data.formation.map((edu) => (
                  <div key={edu.id} className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-3 relative group">
                    <button
                      onClick={() => removeEducation(edu.id)}
                      className="absolute top-3 right-3 text-slate-500 hover:text-red-400 transition"
                      title="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-8">
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Diplôme / Intitulé</label>
                        <input
                          type="text"
                          value={edu.diplome}
                          onChange={(e) => updateEducation(edu.id, 'diplome', e.target.value)}
                          placeholder="ex: Licence Informatique"
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-teal-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Établissement / Faculté</label>
                        <input
                          type="text"
                          value={edu.etablissement}
                          onChange={(e) => updateEducation(edu.id, 'etablissement', e.target.value)}
                          placeholder="ex: Université Lyon 1"
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-teal-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Période</label>
                      <input
                        type="text"
                        value={edu.periode}
                        onChange={(e) => updateEducation(edu.id, 'periode', e.target.value)}
                        placeholder="ex: 2023 - 2026"
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-teal-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Skills Tab */}
        {activeTab === 'skills' && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
              <Code className="w-4 h-4 text-teal-400" />
              Compétences Techniques & Humaines
            </h3>

            <div className="flex gap-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addSkill()}
                placeholder="ex: React, Docker, SQL, Communication..."
                className="grow bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
              />
              <button
                onClick={addSkill}
                className="px-4 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-medium text-xs rounded-xl transition flex items-center gap-1 shrink-0"
              >
                <Plus className="w-3.5 h-3.5" /> Ajouter
              </button>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {data.competences.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs font-medium text-teal-300 flex items-center gap-1.5 group hover:border-slate-700"
                >
                  {skill}
                  <button
                    onClick={() => removeSkill(index)}
                    className="text-slate-500 hover:text-red-400 transition ml-1"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <FolderGit2 className="w-4 h-4 text-teal-400" />
                Projets & Portfolios
              </h3>
              <button
                onClick={addProject}
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-teal-500/20 text-teal-300 hover:bg-teal-500/30 rounded-lg transition"
              >
                <Plus className="w-3.5 h-3.5" /> Ajouter
              </button>
            </div>

            {data.projets.length === 0 ? (
              <p className="text-xs text-slate-500 italic py-4 text-center">Aucun projet ajouté.</p>
            ) : (
              <div className="space-y-3">
                {data.projets.map((proj) => (
                  <div key={proj.id} className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-3 relative group">
                    <button
                      onClick={() => removeProject(proj.id)}
                      className="absolute top-3 right-3 text-slate-500 hover:text-red-400 transition"
                      title="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Nom du projet</label>
                      <input
                        type="text"
                        value={proj.nom}
                        onChange={(e) => updateProject(proj.id, 'nom', e.target.value)}
                        placeholder="ex: Telegram Blague Bot"
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-teal-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Lien du projet / GitHub</label>
                      <input
                        type="text"
                        value={proj.lien || ''}
                        onChange={(e) => updateProject(proj.id, 'lien', e.target.value)}
                        placeholder="https://github.com/..."
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-teal-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Description</label>
                      <textarea
                        rows={2}
                        value={proj.description}
                        onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
                        placeholder="Description du projet..."
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-teal-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Languages Tab */}
        {activeTab === 'languages' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Languages className="w-4 h-4 text-teal-400" />
                Langues
              </h3>
              <button
                onClick={addLanguage}
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-teal-500/20 text-teal-300 hover:bg-teal-500/30 rounded-lg transition"
              >
                <Plus className="w-3.5 h-3.5" /> Ajouter
              </button>
            </div>

            {data.langues.length === 0 ? (
              <p className="text-xs text-slate-500 italic py-4 text-center">Aucune langue ajoutée.</p>
            ) : (
              <div className="space-y-3">
                {data.langues.map((lang) => (
                  <div key={lang.id} className="flex items-center gap-3 p-3 bg-slate-950 border border-slate-800 rounded-xl">
                    <input
                      type="text"
                      value={lang.langue}
                      onChange={(e) => updateLanguage(lang.id, 'langue', e.target.value)}
                      placeholder="Langue (ex: Français)"
                      className="grow bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-teal-500"
                    />
                    <input
                      type="text"
                      value={lang.niveau}
                      onChange={(e) => updateLanguage(lang.id, 'niveau', e.target.value)}
                      placeholder="Niveau (ex: Natif, Courant, C1)"
                      className="w-36 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-teal-500"
                    />
                    <button
                      onClick={() => removeLanguage(lang.id)}
                      className="text-slate-500 hover:text-red-400 transition"
                      title="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
