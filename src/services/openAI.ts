import OpenAI from "openai";

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPEN_API_KEY, // Store your API key in .env.local
});

/**
 * Get a wine recommendation from OpenAI based on user preferences.
 * @param answers - User's wine preferences.
 * @returns A wine recommendation with reasoning and store locations.
 */
export async function getWineRecommendationOpenAI(answers: {
  flavor: string;
  type: string;
  occasion: string;
  budget: string;
  boldness: string;
  country?: string;
  city?: string;
  extraPreferences?: string;
}) {
  try {
    // Construct the prompt for OpenAI
    const gptPrompt = `You are a friendly, professional sommelier assisting beginner and intermediate wine lovers. Based on these preferences, provide a casual, approachable wine recommendation:
      - Flavor: ${answers.flavor}
      - Type: ${answers.type}
      - Occasion/Food Pairing: ${answers.occasion}
      - Budget: ${answers.budget}
      - Boldness: ${answers.boldness}
      - Country: ${answers.country || "Not specified"}
      - City: ${answers.city || "Not specified"}
      - Extra Preferences: ${answers.extraPreferences || "None"}

      **Your response must include:**
      1. **Summary**: A short, casual recap of the user's preferences to confirm understanding (e.g., "You want a sweet rosé for pizza...").
      2. **Suggestion**: Suggest 2-3 general wine styles (e.g., Riesling, Silvaner) matching their flavor, type, boldness, and pairing, adjusted for extra preferences.
      3. **Brands**: Recommend 2-3 specific wines with:
      - Availability in their city (if provided, otherwise general options).
      - Price range within their budget.
      - Pairing notes.
      - Special features (e.g., organic, low sulfites) if relevant.
      4. **Where to Buy**: List common stores or wine shops in their city (if provided, e.g., "REWE in Berlin") or general options (e.g., "local wine shops").
      5. **Extra Preferences**: Address any extra preferences (e.g., "no sulfites") and explain how the picks align.

      **Format your response as HTML-ready text:**
      - Use <h3> for section headers (e.g., "<h3>Summary</h3>", "<h3>Dr. Loosen Riesling (White)</h3>").
      - Use <p> for all explanatory text (e.g., "<p>This fruity Riesling pairs great...</p>", "<p>Get it at REWE.</p>").
      - Keep each section concise (under 50 words per <p>).
      - Return only the HTML content, no text outside the tags.

      Keep the tone casual, friendly, and professional. Tailor to the preferences, and adapt sensibly if info is missing (e.g., no city).`;

    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a professional wine sommelier." },
        { role: "user", content: gptPrompt },
      ],
      model: "gpt-4o-mini",
    });

    // Extract the recommendation from the API response
    let recommendation = completion.choices[0].message.content;

    if (!recommendation) {
      return `
      <h3>Oops, Sip Happens!</h3>
      <p>We couldn’t find your perfect wine right now—give it another swirl soon!</p>
    `;
    }

    // Clean up Markdown code fences if present
    recommendation = recommendation.replace(/```html|```/g, "").trim();

    return recommendation;
  } catch (error) {
    console.error("Error fetching OpenAI recommendation:", error);
    return `
      <h3>Oops, Sip Happens!</h3>
      <p>We couldn’t find your perfect wine right now—give it another swirl soon!</p>
    `;
  }
}
