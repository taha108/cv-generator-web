# CV Generator Web

Un générateur de CV moderne, réactif et épuré, développé avec **React 19**, **TypeScript**, **Tailwind CSS v4** et **Express**.

Cette application web permet de concevoir, personnaliser et exporter un CV professionnel au format A4 PDF en temps réel, directement depuis le navigateur. Elle surmonte les limitations de génération PDF locales (comme les dépendances C/GTK de WeasyPrint sous Windows) grâce à un rendu HTML/Canvas côté client haute fidélité.

---

## 🚀 Fonctionnalités Principales

- **Aperçu A4 en direct :** Rendu WYSIWYG ultra-fidèle au millimètre près, avec contrôle de zoom.
- **Éditeur Formulaire & JSON Bruts :** Modifiez facilement votre contenu via une interface intuitive avec onglets ou directement en éditant le fichier `data.json` structuré.
- **Export Multi-formats :**
  - **PDF direct 1-clic :** Génération instantanée sans passer par la boîte de dialogue d'impression (`html2pdf.js`).
  - **Impression native / PDF :** Utilisation du moteur d'impression CSS du navigateur (`@page { size: A4 }`).
  - **Code HTML autonome (`cv.html`) :** Fichier HTML/CSS autonome prêt à être partagé ou hébergé.
  - **Données JSON (`data.json`) :** Téléchargement et import de vos données structurées.
- **Thèmes & Styles Personnalisables :**
  - Palettes de couleurs élégantes (Classique Teal, Émeraude, Saphir, Ambre, Bordeaux, etc.).
  - Variantes de mise en page (Sidebar latérale, En-tête supérieur).
  - Typographies sélectionnables (Sans-serif, Serif, Monospace).
- **Assistant IA de Rédaction (Optionnel) :** Optimisation et reformulation des descriptions de profil avec l'API Gemini.

---

## 🛠️ Stack Technique

- **Frontend :** React 19, TypeScript, Tailwind CSS v4, Lucide React (Icônes), Motion
- **Backend API :** Express.js, Node.js, `@google/genai` (SDK Gemini)
- **Export PDF :** `html2pdf.js` & `html2canvas`
- **Build Tool :** Vite, esbuild, tsx

---

## 💻 Installation & Lancement Local

### Prérequis

- [Node.js](https://nodejs.org/) (version 18 ou supérieure)
- `npm` (installé avec Node.js)

### Étapes

1. **Cloner le dépôt :**
   ```bash
   git clone https://github.com/taha108/cv-generator-web.git
   cd cv-generator-web
