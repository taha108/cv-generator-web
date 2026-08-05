import { CVData } from '../types';

export const defaultCVData: CVData = {
  nom: "Alex Martin",
  titre: "Développeur Full Stack",
  email: "alex.martin@example.com",
  github: "https://github.com/example",
  linkedin: "https://linkedin.com/in/example",
  telephone: "+33 6 12 34 56 78",
  resume: "Développeur passionné avec de l'expérience dans la création d'applications web modernes, réactives et performantes.",
  formation: [
    {
      id: "edu-1",
      diplome: "Master en Informatique",
      etablissement: "Université de Paris",
      periode: "2022 - 2024"
    },
    {
      id: "edu-2",
      diplome: "Licence Informatique",
      etablissement: "Université de Lyon",
      periode: "2019 - 2022"
    }
  ],
  experiences: [
    {
      id: "exp-1",
      poste: "Développeur Front-End React",
      entreprise: "Tech Solutions",
      periode: "2023 - Présent",
      description: "Conception et développement d'interfaces web réactives en React et TypeScript. Optimisation des performances et intégration d'API RESTful."
    },
    {
      id: "exp-2",
      poste: "Développeur Web Stagiaire",
      entreprise: "WebAgency",
      periode: "2022",
      description: "Création de sites web, intégration de maquettes Figma et maintenance applicative."
    }
  ],
  competences: [
    "TypeScript / JavaScript",
    "React & Node.js",
    "Tailwind CSS / HTML5",
    "Git & GitHub",
    "APIs RESTful",
    "Python"
  ],
  projets: [
    {
      id: "proj-1",
      nom: "Gestionnaire de Tâches Kanban",
      description: "Application web d'organisation de projets en temps réel avec glisser-déposer et sauvegarde locale.",
      lien: "https://github.com/example/kanban-app"
    },
    {
      id: "proj-2",
      nom: "Générateur de CV Web",
      description: "Application interactive pour créer, personnaliser et exporter des CV au format PDF.",
      lien: "https://github.com/example/cv-generator"
    }
  ],
  langues: [
    { id: "lang-1", langue: "Français", niveau: "Natif" },
    { id: "lang-2", langue: "Anglais", niveau: "Courant (C1)" }
  ]
};
