import { GoogleGenerativeAI } from "npm:@google/generative-ai@0.2.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  
};

interface QuoteResponse {
  sanskrit: string;
  translations: {
    [key: string]: string;
  };
  chapter: number;
  verse: number;
  keywords: string[];
}

const generatePrompt = (mood: string) => {
  const timestamp = Date.now();
  const randomSeed = Math.random().toString(36).substring(7);
  return `Generate a unique, random Bhagavad Gita quote that would be relevant for someone feeling ${mood}. 
  Make sure to choose a different verse each time and avoid common verses. Current timestamp: ${timestamp}, random seed: ${randomSeed}.
  The quote should be meaningful and directly related to the mood.
  Return the response in the following JSON format:
  {
    "sanskrit": "Sanskrit language text only with line breaks using without english\\n",
    "translations": {
      "english": "English translation",
      "marathi": "Marathi translation",
      "hindi": "Hindi translation",
      "spanish": "Spanish translation",
      "german": "German translation",
      "french": "French translation"
    },
    "chapter": chapter_number,
    "verse": verse_number,
    "keywords": ["keyword1", "keyword2", "keyword3"]
  }`;
};

Deno.serve(async (req) => {
  try {
    // Handle CORS preflight request
    if (req.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    // Validate request method
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      });
    }

    // Get request body
    const { moodId } = await req.json();

    if (!moodId) {
      return new Response(JSON.stringify({ error: "Mood ID is required" }), {
        status: 400,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      });
    }

    // Initialize Gemini AI with API key from environment variable
    const genAI = new GoogleGenerativeAI(Deno.env.get("GEMINI_API_KEY") || "");

    // Generate the quote
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const prompt = generatePrompt(moodId);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const cleanedResult = response.text()
      .replace(/^```json\s*/, "")
      .replace(/```\s*$/, "")
      .trim();

    const quoteData: QuoteResponse = JSON.parse(cleanedResult);
    const quote = {
      id: `${moodId}-${Date.now()}-${Math.random().toString(36).substring(7)}`,
      ...quoteData,
    };

    return new Response(JSON.stringify(quote), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error generating quote:", error);
    return new Response(
      JSON.stringify({ 
        error: "Failed to generate quote",
        details: error.message 
      }), {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
