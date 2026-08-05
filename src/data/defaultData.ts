import { CVData } from '../types';

export const defaultCVData: CVData = {
  nom: "Taha El",
  titre: "Étudiant en informatique",
  email: "tahaelmeliani@gmail.com",
  github: "https://github.com/taha108",
  linkedin: "",
  telephone: "",
  resume: "Étudiant passionné par le développement, en apprentissage actif via des projets personnels.",
  formation: [
    {
      id: "edu-1",
      diplome: "Licence Informatique",
      etablissement: "Nom de ta fac",
      periode: "2023 - 2026"
    }
  ],
  experiences: [
    {
      id: "exp-1",
      poste: "Caissier",
      entreprise: "Lidl",
      periode: "2026",
      description: "Gestion de caisse, encaissement client, tenue du poste de vente."
    },
    {
      id: "exp-2",
      poste: "Vendeur",
      entreprise: "Intersport",
      periode: "2023",
      description: "Conseil client, mise en rayon, gestion des stocks."
    }
  ],
  competences: [
    "Python",
    "Git & GitHub",
    "APIs REST",
    "HTML/CSS"
  ],
  projets: [
    {
      id: "proj-1",
      nom: "Telegram Blague Bot",
      description: "Bot Telegram qui envoie des blagues aléatoires via l'API Telegram.",
      lien: "https://github.com/taha108/telegram-blague-bot"
    },
    {
      id: "proj-2",
      nom: "CV Generator",
      description: "Générateur de CV/portfolio automatique en Python à partir d'un fichier JSON.",
      lien: "https://github.com/taha108/cv-generator"
    }
  ],
  langues: [
    { id: "lang-1", langue: "Français", niveau: "Natif" },
    { id: "lang-2", langue: "Anglais", niveau: "Courant" }
  ]
};
