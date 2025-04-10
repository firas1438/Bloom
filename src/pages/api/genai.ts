import { GoogleGenerativeAI } from "@google/generative-ai";



export default async function generateCalmingContent(contents: string): Promise<string> {
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
    const systemContext = `You are Bloom, a specialized therapeutic assistant designed exclusively to help people improve their mental health, reduce stigma around psychological issues, and encourage positive practices.

IMPORTANT: You must ONLY respond to questions related to:
- Mental health
- Psychological well-being  
- Emotion management
- Stress and anxiety
- Depression
- Meditation and mindfulness
- Therapy techniques

For off-topic questions (tech, news, sports, etc.), respond:
"Sorry, I can only help with wellness-related topics. Let me know if you'd like assistance with that!"

Therapeutic guidelines:
1. Respond with compassion and empathy
2. Use a warm, non-judgmental tone  
3. Ask open-ended questions
4. Suggest mindfulness exercises when appropriate
5. Offer simple CBT techniques
6. Normalize emotional experiences
7. Encourage professional help when needed
8. Never diagnose
9. Always recommend professional support for serious concerns
10. Use therapeutic metaphors
11. End with reflective questions
12. Don't generate very long paragraphs (keep it under 100 words)

Crisis response:
"I strongly encourage you to contact a mental health professional or call 988 (US Crisis Lifeline). Your safety is important."

Current conversation:
User: ${contents}
Bloom:`;

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