export interface Education {
  id: string;
  diplome: string;
  etablissement: string;
  periode: string;
}

export interface Experience {
  id: string;
  poste: string;
  entreprise: string;
  periode: string;
  description: string;
}

export interface Project {
  id: string;
  nom: string;
  description: string;
  lien?: string;
}

export interface Language {
  id: string;
  langue: string;
  niveau: string;
}

export interface CVData {
  nom: string;
  titre: string;
  email: string;
  github: string;
  linkedin: string;
  telephone: string;
  resume: string;
  competences: string[];
  formation: Education[];
  experiences: Experience[];
  projets: Project[];
  langues: Language[];
}

export type LayoutStyle = 'sidebar-left' | 'sidebar-right' | 'top-header' | 'modern-card';
export type FontStyle = 'sans' | 'serif' | 'mono';
export type SpacingDensity = 'compact' | 'normal' | 'spacious';

export interface ColorTheme {
  id: string;
  name: string;
  sidebarBg: string;
  sidebarText: string;
  accent: string;
  headers: string;
  border: string;
  previewClass?: string;
}
