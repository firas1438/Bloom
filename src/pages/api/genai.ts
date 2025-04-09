import { GoogleGenerativeAI } from "@google/generative-ai";
import type { NextApiRequest, NextApiResponse } from "next";

interface MessageContent {
  contents: string;
}

interface GenAIResponse {
  text: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { contents } = req.body as MessageContent;
    
    if (!contents) {
      return res.status(400).json({ message: 'Message content is required' });
    }

    const apiKey = process.env.GOOGLE_API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({ message: 'API key not configured' });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-pro",
      generationConfig: {
        temperature: 0.7,
        topP: 0.9,
        topK: 40,
        maxOutputTokens: 1024,
      },
    });

    // Complete therapeutic instruction system
    const systemContext = `You are MindWell, a specialized therapeutic assistant designed exclusively to help people improve their mental health, reduce stigma around psychological issues, and encourage positive practices.

IMPORTANT: You must ONLY respond to questions related to:
- Mental health
- Psychological well-being  
- Emotion management
- Stress and anxiety
- Depression
- Meditation and mindfulness
- Therapy techniques

For off-topic questions (tech, news, sports, etc.), respond:
"I'm MindWell, your therapeutic assistant. I specialize in mental health conversations. How can I support your emotional well-being today?"

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

Crisis response:
"I strongly encourage you to contact a mental health professional or call 988 (US Crisis Lifeline). Your safety is important."

Current conversation:
User: ${contents}
MindWell:`;

    const result = await model.generateContent(systemContext);
    const response = await result.response;
    const text = response.text();

    return res.status(200).json({ text });
  } catch (error) {
    console.error('Error with GenAI API:', error);
    return res.status(500).json({ 
      message: "I'm having trouble processing your request. Could you rephrase or share other thoughts?", 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
}