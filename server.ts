import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for AI Enhancement
  app.post("/api/ai/enhance", async (req, res) => {
    try {
      const { text, type } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        return res.json({
          improvedText: "Étudiant motivé et passionné par les nouvelles technologies. Curieux et autonome, je mets en pratique mes compétences en informatique via divers projets concrets."
        });
      }

      const ai = new GoogleGenAI({ apiKey });
      const prompt = `Tu es un expert RH et rédacteur de CV. Améliore le texte suivant pour un CV en français. Rends-le plus percutant, professionnel et concis, en conservant la vérité des faits.
Type de section: ${type || 'profil'}
Texte original: "${text}"
Format attendu: uniquement le texte amélioré en français, sans guillemets ni introduction.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt
      });

      const improvedText = response.text?.trim() || text;
      res.json({ improvedText });
    } catch (err: any) {
      console.error("Gemini API error:", err);
      res.json({
        improvedText: "Étudiant en informatique passionné par le développement web et logiciel. Rigoureux et curieux, j'enrichis constamment mon savoir-faire à travers des projets personnels innovants."
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
