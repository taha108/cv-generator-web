import { CVData, ColorTheme, LayoutStyle, FontStyle } from '../types';

/**
 * Downloads JSON file (data.json)
 */
export function downloadJSON(data: CVData, filename = 'data.json') {
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Downloads standalone HTML file (cv.html) populated with Jinja-like template structure
 */
export function downloadHTML(data: CVData, theme: ColorTheme, filename = 'cv.html') {
  const htmlContent = `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeHtml(data.nom)} - CV</title>
<style>
    @page {
        size: A4;
        margin: 0;
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body {
        font-family: Helvetica, Arial, sans-serif;
        color: #1a1a1a;
        font-size: 12px;
        background-color: #ffffff;
    }
    .layout {
        display: flex;
        min-height: 100vh;
    }
    .sidebar {
        width: 33%;
        background-color: ${theme.sidebarBg};
        color: ${theme.sidebarText};
        padding: 30px 20px;
    }
    .main {
        width: 67%;
        padding: 30px 30px;
        background-color: #ffffff;
    }
    .name { font-size: 24px; font-weight: bold; color: ${theme.sidebarText}; }
    .titre { color: ${theme.accent}; font-size: 13px; font-weight: bold; margin-top: 4px; margin-bottom: 20px; }
    .side-h2 {
        font-size: 11px; text-transform: uppercase; letter-spacing: 1px;
        color: ${theme.accent}; margin-top: 20px; margin-bottom: 8px;
        border-bottom: 1px solid ${theme.border}; padding-bottom: 5px;
    }
    .contact-line { color: #cbd5e1; font-size: 11px; margin-bottom: 6px; word-break: break-all; }
    .contact-line a { color: #cbd5e1; text-decoration: none; }
    .skill-tag { color: ${theme.accent}; font-size: 11px; margin-bottom: 4px; }
    .langue-line { color: #cbd5e1; font-size: 11px; margin-bottom: 5px; }
    .main-h2 {
        font-size: 12px; text-transform: uppercase; letter-spacing: 1px;
        color: ${theme.headers}; margin-top: 18px; margin-bottom: 10px;
        border-bottom: 2px solid ${theme.accent}; padding-bottom: 5px;
    }
    .resume { font-size: 12px; line-height: 1.6; color: #333333; }
    .entry-title { font-size: 13px; font-weight: bold; color: #12181f; }
    .entry-sub { font-size: 10px; color: #64748b; margin-bottom: 4px; }
    .entry-desc { font-size: 11px; color: #444444; line-height: 1.5; }
    .entry-link { color: ${theme.headers}; font-size: 10px; text-decoration: none; word-break: break-all; }
    .entry-spacer { height: 12px; }
    .entry-block { break-inside: avoid; }
</style>
</head>
<body>
<div class="layout">
    <div class="sidebar">
        <div class="name">${escapeHtml(data.nom)}</div>
        <div class="titre">${escapeHtml(data.titre)}</div>
        
        <div class="side-h2">Contact</div>
        ${data.email ? `<div class="contact-line">Email : ${escapeHtml(data.email)}</div>` : ''}
        ${data.telephone ? `<div class="contact-line">Tel : ${escapeHtml(data.telephone)}</div>` : ''}
        ${data.github ? `<div class="contact-line">GitHub : <a href="${escapeHtml(data.github)}">${escapeHtml(data.github)}</a></div>` : ''}
        ${data.linkedin ? `<div class="contact-line">LinkedIn : <a href="${escapeHtml(data.linkedin)}">${escapeHtml(data.linkedin)}</a></div>` : ''}
        
        <div class="side-h2">Compétences</div>
        ${data.competences.map(c => `<div class="skill-tag">&bull; ${escapeHtml(c)}</div>`).join('')}
        
        <div class="side-h2">Langues</div>
        ${data.langues.map(l => `<div class="langue-line">${escapeHtml(l.langue)} &mdash; ${escapeHtml(l.niveau)}</div>`).join('')}
    </div>
    <div class="main">
        ${data.resume ? `
        <div class="main-h2">Profil</div>
        <div class="resume">${escapeHtml(data.resume)}</div>
        ` : ''}
        
        ${data.formation && data.formation.length > 0 ? `
        <div class="main-h2">Formation</div>
        ${data.formation.map(f => `
        <div class="entry-block">
            <div class="entry-title">${escapeHtml(f.diplome)}</div>
            <div class="entry-sub">${escapeHtml(f.etablissement)} &mdash; ${escapeHtml(f.periode)}</div>
            <div class="entry-spacer"></div>
        </div>
        `).join('')}
        ` : ''}
        
        ${data.experiences && data.experiences.length > 0 ? `
        <div class="main-h2">Expériences</div>
        ${data.experiences.map(e => `
        <div class="entry-block">
            <div class="entry-title">${escapeHtml(e.poste)} &mdash; ${escapeHtml(e.entreprise)}</div>
            <div class="entry-sub">${escapeHtml(e.periode)}</div>
            <div class="entry-desc">${escapeHtml(e.description)}</div>
            <div class="entry-spacer"></div>
        </div>
        `).join('')}
        ` : ''}
        
        ${data.projets && data.projets.length > 0 ? `
        <div class="main-h2">Projets</div>
        ${data.projets.map(p => `
        <div class="entry-block">
            <div class="entry-title">${escapeHtml(p.nom)}</div>
            <div class="entry-desc">${escapeHtml(p.description)}</div>
            ${p.lien ? `<a class="entry-link" href="${escapeHtml(p.lien)}">${escapeHtml(p.lien)}</a>` : ''}
            <div class="entry-spacer"></div>
        </div>
        `).join('')}
        ` : ''}
    </div>
</div>
</body>
</html>`;

  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function escapeHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Download direct PDF using html2pdf.js
 */
export async function downloadPDF(elementId: string, filename = 'cv.pdf'): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error("CV element not found");
  }

  // Dynamic import of html2pdf.js
  const html2pdfModule: any = await import('html2pdf.js');
  const html2pdfFunc = html2pdfModule.default || html2pdfModule;

  const opt = {
    margin: 0,
    filename: filename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, logging: false },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  return html2pdfFunc().set(opt).from(element).save();
}
