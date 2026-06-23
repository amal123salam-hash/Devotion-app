import { BibleVerse } from "../types";

export interface CounselResponse {
  comfort: string;
  verses: BibleVerse[];
  prayer: string;
}

export async function getPastoralCounsel(situation: string, customApiKey?: string): Promise<CounselResponse> {
  const apiKey = customApiKey || import.meta.env.VITE_GEMINI_API_KEY || localStorage.getItem("GEMINI_API_KEY") || "";
  
  if (!apiKey) {
    throw new Error("Gemini API key is not configured. Please add your key in the settings (top-right icon).");
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  const prompt = `You are ChristCounsel, a compassionate and wise pastoral guide speaking in a soft, smooth, comforting Christian tone. 
A person comes to you with the following concern/situation: "${situation}".

Please provide a response that is split into exactly three parts:
1. "comfort": Compassionate counseling words quoting appropriate Holy Scripture, explaining it with grace, and concluding with: "Don't fear, I am with you."
2. "verses": An array of one or more relevant Bible scripture verses referenced in your response, with the reference (e.g. "Psalm 23:1") and text.
3. "prayer": A short, comforting, beautiful personal prayer written on behalf of the person.

You MUST respond strictly in the following JSON format:
{
  "comfort": "pastoral words...",
  "verses": [
    {
      "reference": "Bible verse reference",
      "text": "Full verse text"
    }
  ],
  "prayer": "short prayer..."
}`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [{
        parts: [{ text: prompt }]
      }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            comfort: { 
              type: "STRING", 
              description: "A comforting spiritual counsel response, quoting Scripture, explaining it with grace, and concluding with 'Don't fear, I am with you.'"
            },
            verses: {
              type: "ARRAY",
              items: {
                type: "OBJECT",
                properties: {
                  reference: { type: "STRING" },
                  text: { type: "STRING" }
                },
                required: ["reference", "text"]
              }
            },
            prayer: { 
              type: "STRING", 
              description: "A comforting prayer written on behalf of the person." 
            }
          },
          required: ["comfort", "verses", "prayer"]
        }
      }
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message = errorData?.error?.message || `HTTP ${response.status} Error`;
    throw new Error(`Failed to call Gemini API: ${message}`);
  }

  const result = await response.json();
  const textContent = result.candidates?.[0]?.content?.parts?.[0]?.text;
  
  if (!textContent) {
    throw new Error("No response received from Gemini.");
  }

  try {
    return JSON.parse(textContent) as CounselResponse;
  } catch (parseError) {
    console.error("Failed to parse Gemini response as JSON:", textContent);
    throw new Error("Invalid response format received from Gemini.");
  }
}
