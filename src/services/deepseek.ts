import OpenAI from "openai";

// Initialize the DeepSeek client
const openai = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: process.env.DEEPSEEK_API_KEY, // Store your API key in .env.local
});

// const openai = new OpenAI({
//   apiKey: process.env.OPEN_API_KEY, // Store your API key in .env.local
// });

/**
 * Get a wine recommendation from DeepSeek AI based on user preferences.
 * @param answers - User's wine preferences.
 * @returns A wine recommendation with reasoning and store locations.
 */
export async function getWineRecommendation(answers: {
  flavor: string;
  type: string;
  occasion: string;
  budget: string;
  boldness: string;
  country?: string;
  city?: string;
  extraPreferences?: string;
}) {
  // Construct the prompt for DeepSeek
  const prompt = `You are a friendly, professional sommelier helping beginners and intermediate wine lovers. Based on these preferences, recommend a wine in a casual, approachable way:
    - Flavor: ${answers.flavor}
    - Type: ${answers.type}
    - Occasion/Food Pairing: ${answers.occasion}
    - Budget: ${answers.budget}
    - Boldness: ${answers.boldness}
    - Country: ${answers.country || "Not specified"}
    - City: ${answers.city || "Not specified"}
    - Extra Preferences: ${answers.extraPreferences || "None"}
    
    **Provide a casual but professional recommendation, your response should including:**
    1. **Summary**: Casually recap the users input to show you understand their preferences.
    2. **Suggestion**: Suggest 2-3 general wine styles (e.g., Riesling, Silvaner) based on their flavor, type, boldness, and pairing—adjusted for any extra preferences.
    3. **Brands**: Recommend 2–3 specific brands with details like:
    - Availability in their city (if provided).
    - Price range (matching their budget).
    - Pairing suggestions.
    - Any special features (e.g., organic, low sulfites).
    4. **Where to Buy**: Suggest common stores (e.g., REWE, Edeka) and wine shops in their city (if provided) where they can find the recommended wines.
    5. **Extra Preferences**: Address any extra preferences (e.g., "no sulfites") and explain how the recommendation aligns with them.

    **Provide your recommendation as HTML-ready text with this structure:**
    - Use <h3> for the wine name and type (e.g., "<h3>Dr. Loosen Riesling (White)</h3>").
    - Use <p> for the explanation of why it fits (e.g., "<p>This fruity Riesling...perfect for you!</p>").
    - Use <p> for where to buy it (e.g., "<p>Pick it up at REWE in Berlin.</p>").
    
    Keep it concise, friendly, and tailored. If info is missing (e.g., city), suggest general options like "local wine shops" in the <p> tag. Return only the HTML content, no extra text outside the tags.`;

  // Call DeepSeek API
  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "deepseek-chat",
  });

  //   const gptPrompt = `You are a friendly, professional sommelier assisting beginner and intermediate wine lovers. Based on these preferences, provide a casual, approachable wine recommendation:
  //     - Flavor: ${answers.flavor}
  //     - Type: ${answers.type}
  //     - Occasion/Food Pairing: ${answers.occasion}
  //     - Budget: ${answers.budget}
  //     - Boldness: ${answers.boldness}
  //     - Country: ${answers.country || "Not specified"}
  //     - City: ${answers.city || "Not specified"}
  //     - Extra Preferences: ${answers.extraPreferences || "None"}

  //     **Your response must include:**
  //     1. **Summary**: A short, casual recap of the user's preferences to confirm understanding (e.g., "You want a sweet rosé for pizza...").
  //     2. **Suggestion**: Suggest 2-3 general wine styles (e.g., Riesling, Silvaner) matching their flavor, type, boldness, and pairing, adjusted for extra preferences.
  //     3. **Brands**: Recommend 2-3 specific wines with:
  //     - Availability in their city (if provided, otherwise general options).
  //     - Price range within their budget.
  //     - Pairing notes.
  //     - Special features (e.g., organic, low sulfites) if relevant.
  //     4. **Where to Buy**: List common stores or wine shops in their city (if provided, e.g., "REWE in Berlin") or general options (e.g., "local wine shops").
  //     5. **Extra Preferences**: Address any extra preferences (e.g., "no sulfites") and explain how the picks align.

  //     **Format your response as HTML-ready text:**
  //     - Use <h3> for section headers (e.g., "<h3>Summary</h3>", "<h3>Dr. Loosen Riesling (White)</h3>").
  //     - Use <p> for all explanatory text (e.g., "<p>This fruity Riesling pairs great...</p>", "<p>Get it at REWE.</p>").
  //     - Keep each section concise (under 50 words per <p>).
  //     - Return only the HTML content, no text outside the tags.

  //     Keep the tone casual, friendly, and professional. Tailor to the preferences, and adapt sensibly if info is missing (e.g., no city).`;

  //   const completion = await openai.chat.completions.create({
  //     messages: [
  //       { role: "system", content: "You are a professional wine sommelier." },
  //       { role: "user", content: gptPrompt },
  //     ],
  //     model: "gpt-4o-mini",
  //   });

  // Extract the recommendation from the API response
  const recommendation = completion.choices[0].message.content;

  return recommendation;
}
