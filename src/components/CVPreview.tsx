import React from 'react';
import { CVData, ColorTheme, LayoutStyle, FontStyle } from '../types';
import { ExternalLink, Mail, Phone, Github, Linkedin } from 'lucide-react';

interface Props {
  data: CVData;
  theme: ColorTheme;
  layout: LayoutStyle;
  font: FontStyle;
  scale?: number;
}

export const CVPreview: React.FC<Props> = ({ data, theme, layout, font }) => {
  const fontClass = font === 'serif' ? 'font-serif' : font === 'mono' ? 'font-mono' : 'font-sans';

  return (
    <div className="w-full flex justify-center py-4 bg-slate-900/50 print:bg-white print:p-0">
      {/* A4 Container */}
      <div
        id="cv-preview-container"
        className={`w-[210mm] min-h-[297mm] bg-white text-slate-900 shadow-2xl print:shadow-none print:w-full print:min-h-0 ${fontClass} transition-all duration-200 relative overflow-hidden`}
        style={{
          fontFamily: font === 'serif' ? 'Georgia, serif' : font === 'mono' ? 'Courier New, monospace' : 'Helvetica, Arial, sans-serif'
        }}
      >
        {/* Layout rendering logic */}
        {layout === 'top-header' ? (
          /* Top Header Layout */
          <div className="p-8">
            <header className="border-b-2 pb-6 mb-6" style={{ borderColor: theme.accent }}>
              <h1 className="text-3xl font-bold text-slate-900">{data.nom || 'Votre Nom'}</h1>
              <p className="text-base font-semibold mt-1" style={{ color: theme.headers }}>{data.titre}</p>
              <div className="flex flex-wrap gap-4 mt-3 text-xs text-slate-600">
                {data.email && <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> {data.email}</span>}
                {data.telephone && <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {data.telephone}</span>}
                {data.github && <span className="flex items-center gap-1"><Github className="w-3.5 h-3.5" /> {data.github}</span>}
                {data.linkedin && <span className="flex items-center gap-1"><Linkedin className="w-3.5 h-3.5" /> {data.linkedin}</span>}
              </div>
            </header>

            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-8 space-y-6">
                {data.resume && (
                  <section>
                    <h2 className="text-xs uppercase tracking-wider font-bold pb-1 border-b mb-2" style={{ color: theme.headers, borderColor: theme.accent }}>
                      Profil
                    </h2>
                    <p className="text-xs text-slate-700 leading-relaxed">{data.resume}</p>
                  </section>
                )}

                {data.formation && data.formation.length > 0 && (
                  <section>
                    <h2 className="text-xs uppercase tracking-wider font-bold pb-1 border-b mb-3" style={{ color: theme.headers, borderColor: theme.accent }}>
                      Formation
                    </h2>
                    <div className="space-y-3">
                      {data.formation.map((f) => (
                        <div key={f.id} className="break-inside-avoid">
                          <div className="text-xs font-bold text-slate-900">{f.diplome}</div>
                          <div className="text-[10px] text-slate-500">{f.etablissement} — {f.periode}</div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {data.experiences && data.experiences.length > 0 && (
                  <section>
                    <h2 className="text-xs uppercase tracking-wider font-bold pb-1 border-b mb-3" style={{ color: theme.headers, borderColor: theme.accent }}>
                      Expériences
                    </h2>
                    <div className="space-y-4">
                      {data.experiences.map((e) => (
                        <div key={e.id} className="break-inside-avoid">
                          <div className="text-xs font-bold text-slate-900">{e.poste} — {e.entreprise}</div>
                          <div className="text-[10px] text-slate-500 mb-1">{e.periode}</div>
                          <p className="text-xs text-slate-700 leading-relaxed">{e.description}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {data.projets && data.projets.length > 0 && (
                  <section>
                    <h2 className="text-xs uppercase tracking-wider font-bold pb-1 border-b mb-3" style={{ color: theme.headers, borderColor: theme.accent }}>
                      Projets
                    </h2>
                    <div className="space-y-3">
                      {data.projets.map((p) => (
                        <div key={p.id} className="break-inside-avoid">
                          <div className="text-xs font-bold text-slate-900">{p.nom}</div>
                          <p className="text-xs text-slate-700">{p.description}</p>
                          {p.lien && (
                            <a href={p.lien} target="_blank" rel="noreferrer" className="text-[10px] underline inline-flex items-center gap-0.5 mt-0.5" style={{ color: theme.headers }}>
                              {p.lien} <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>

              <div className="col-span-4 space-y-6">
                {data.competences && data.competences.length > 0 && (
                  <section>
                    <h2 className="text-xs uppercase tracking-wider font-bold pb-1 border-b mb-2" style={{ color: theme.headers, borderColor: theme.accent }}>
                      Compétences
                    </h2>
                    <div className="flex flex-wrap gap-1.5">
                      {data.competences.map((c, i) => (
                        <span key={i} className="px-2 py-0.5 text-[10px] font-medium rounded text-slate-800 bg-slate-100 border border-slate-200">
                          {c}
                        </span>
                      ))}
                    </div>
                  </section>
                )}

                {data.langues && data.langues.length > 0 && (
                  <section>
                    <h2 className="text-xs uppercase tracking-wider font-bold pb-1 border-b mb-2" style={{ color: theme.headers, borderColor: theme.accent }}>
                      Langues
                    </h2>
                    <div className="space-y-1 text-xs">
                      {data.langues.map((l) => (
                        <div key={l.id} className="flex justify-between text-slate-700">
                          <span>{l.langue}</span>
                          <span className="text-slate-500 text-[10px]">{l.niveau}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Classic 2-Column Sidebar Layout (Matching template.html) */
          <div className="flex min-h-[297mm]">
            {/* Sidebar */}
            <div
              className="w-[33%] p-[30px_20px] text-white shrink-0"
              style={{ backgroundColor: theme.sidebarBg, color: theme.sidebarText }}
            >
              <div className="text-[24px] font-bold leading-tight text-white">{data.nom || 'Votre Nom'}</div>
              <div className="text-[13px] font-bold mt-[4px] mb-[20px]" style={{ color: theme.accent }}>
                {data.titre}
              </div>

              {/* Contact */}
              <div
                className="text-[11px] uppercase tracking-[1px] font-bold mt-[20px] mb-[8px] pb-[5px] border-b"
                style={{ color: theme.accent, borderColor: theme.border }}
              >
                CONTACT
              </div>
              <div className="space-y-1.5 text-[11px] text-slate-300">
                {data.email && <div>Email : {data.email}</div>}
                {data.telephone && <div>Tel : {data.telephone}</div>}
                {data.github && (
                  <div className="truncate">
                    GitHub : <span className="text-slate-300 underline">{data.github.replace('https://', '')}</span>
                  </div>
                )}
                {data.linkedin && (
                  <div className="truncate">
                    LinkedIn : <span className="text-slate-300 underline">{data.linkedin.replace('https://', '')}</span>
                  </div>
                )}
              </div>

              {/* Competences */}
              {data.competences && data.competences.length > 0 && (
                <>
                  <div
                    className="text-[11px] uppercase tracking-[1px] font-bold mt-[20px] mb-[8px] pb-[5px] border-b"
                    style={{ color: theme.accent, borderColor: theme.border }}
                  >
                    COMPETENCES
                  </div>
                  <div className="space-y-1">
                    {data.competences.map((c, idx) => (
                      <div key={idx} className="text-[11px]" style={{ color: theme.accent }}>
                        • {c}
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Langues */}
              {data.langues && data.langues.length > 0 && (
                <>
                  <div
                    className="text-[11px] uppercase tracking-[1px] font-bold mt-[20px] mb-[8px] pb-[5px] border-b"
                    style={{ color: theme.accent, borderColor: theme.border }}
                  >
                    LANGUES
                  </div>
                  <div className="space-y-1 text-[11px] text-slate-300">
                    {data.langues.map((l) => (
                      <div key={l.id}>
                        {l.langue} — {l.niveau}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Main Content */}
            <div className="w-[67%] p-[30px_30px] bg-white text-slate-900 grow">
              {/* Profil */}
              {data.resume && (
                <div className="mb-5">
                  <div
                    className="text-[12px] uppercase tracking-[1px] font-bold mt-[10px] mb-[10px] pb-[5px] border-b-2"
                    style={{ color: theme.headers, borderColor: theme.accent }}
                  >
                    PROFIL
                  </div>
                  <p className="text-[12px] text-[#333333] leading-[1.6]">{data.resume}</p>
                </div>
              )}

              {/* Formation */}
              {data.formation && data.formation.length > 0 && (
                <div className="mb-5">
                  <div
                    className="text-[12px] uppercase tracking-[1px] font-bold mt-[18px] mb-[10px] pb-[5px] border-b-2"
                    style={{ color: theme.headers, borderColor: theme.accent }}
                  >
                    FORMATION
                  </div>
                  {data.formation.map((f) => (
                    <div key={f.id} className="mb-3 break-inside-avoid">
                      <div className="text-[13px] font-bold text-[#12181f]">{f.diplome}</div>
                      <div className="text-[10px] text-[#64748b] mb-[4px]">{f.etablissement} — {f.periode}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Experiences */}
              {data.experiences && data.experiences.length > 0 && (
                <div className="mb-5">
                  <div
                    className="text-[12px] uppercase tracking-[1px] font-bold mt-[18px] mb-[10px] pb-[5px] border-b-2"
                    style={{ color: theme.headers, borderColor: theme.accent }}
                  >
                    EXPERIENCES
                  </div>
                  {data.experiences.map((e) => (
                    <div key={e.id} className="mb-3 break-inside-avoid">
                      <div className="text-[13px] font-bold text-[#12181f]">
                        {e.poste} — {e.entreprise}
                      </div>
                      <div className="text-[10px] text-[#64748b] mb-[4px]">{e.periode}</div>
                      <div className="text-[11px] text-[#444444] leading-[1.5]">{e.description}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Projets */}
              {data.projets && data.projets.length > 0 && (
                <div className="mb-5">
                  <div
                    className="text-[12px] uppercase tracking-[1px] font-bold mt-[18px] mb-[10px] pb-[5px] border-b-2"
                    style={{ color: theme.headers, borderColor: theme.accent }}
                  >
                    PROJETS
                  </div>
                  {data.projets.map((p) => (
                    <div key={p.id} className="mb-3 break-inside-avoid">
                      <div className="text-[13px] font-bold text-[#12181f]">{p.nom}</div>
                      <div className="text-[11px] text-[#444444] leading-[1.5]">{p.description}</div>
                      {p.lien && (
                        <a href={p.lien} target="_blank" rel="noreferrer" className="text-[10px] block underline mt-0.5" style={{ color: theme.headers }}>
                          {p.lien}
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
