import { GoogleGenerativeAI } from "@google/generative-ai";
// import { GoogleGenAI } from "@google/genai"

export default async function generateCalmingContent(emotion: string,intensity:string): Promise<string> {
    // 1. Vérification obligatoire de la clé API
    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
    if (!API_KEY) {
        console.error("Erreur : La clé API Gemini n'est pas configurée");
        return "Service temporairement indisponible. Veuillez réessayer plus tard.";
    }

    // 2. Initialisation de l'API
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); // Version optimisée

    // 3. VOTRE PROMPT ORIGINAL (inchangé)
    const systemContext = `
        You are Bloom, a therapeutic assistant focused on mental health and wellness. 
        A person is experiencing strong ${emotion} (intensity ${intensity}/10). 
        Based on these inputs, provide a compassionate observation or a brief advice.

        Guidelines:
        Use conversational language, no clinical terms
        Keep the paragraph under 50 words
        Sound like a wise friend, not a therapist
    `;

    try {
        // 4. Appel API avec timeout implicite
        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: systemContext }] }],
            generationConfig: {
                temperature: 0.9, // Plus créatif
                topP: 0.95
            }
        });

        // 5. Vérification de la réponse
        if (!result?.response?.text) {
            throw new Error("Réponse vide de l'API");
        }

        return result.response.text();

    } catch (error) {
        console.error("Erreur Gemini API:", error);
        
        // 6. Messages de repli contextuels
        if (error.message.includes("safety")) {
            return "Je détecte une requête sensible. Pour votre sécurité, je vous recommande de contacter un professionnel. Vous pouvez appeler le 3114 en France (SOS Suicide).";
        }
        
        return `Je rencontre des difficultés techniques. Voici un exercice apaisant : 
        Inspirez profondément (4s), retenez (4s), expirez lentement (6s). Répétez 3 fois.`;
    }
}