import OpenAI from "openai";

// Initialize the Grok client
const openai = new OpenAI({
  apiKey: process.env.GROK_API_KEY, // Store your API key in .env.local
  baseURL: "https://api.x.ai/v1",
});

/**
 * Get a wine recommendation from Grok based on user preferences.
 * @param answers - User's wine preferences.
 * @returns A wine recommendation with reasoning and store locations.
 */
export async function getWineRecommendationGrok(answers: {
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
    // Construct the prompt for Grok
    const gptPrompt = `As a wine sommelier, recommend wines based on these preferences:
      - Flavor: ${answers.flavor}
      - Type: ${answers.type}
      - Occasion: ${answers.occasion}
      - Budget: ${answers.budget}
      - Boldness: ${answers.boldness}
      - Location: ${answers.country || "Not specified"}
      - City: ${answers.city || "Not specified"}
      - Extra Preferences: ${answers.extraPreferences || "None"}

      **Important Rules:**
      1. If extra preferences specify a wine region/country (e.g., "Love Italian wine"), prioritize wines from that region
      2. Use the Location parameter to suggest where to buy wines (e.g., if Location is "Germany", suggest stores in Germany)
      3. If no specific region is mentioned in extra preferences, suggest wines from various regions matching the preferences

      **Format Response As:**
      <h3>Summary</h3>
      <p>Brief recap of preferences</p>

      <h3>Recommendations</h3>
      <p>2-3 specific wines with prices and pairing notes</p>

      <h3>Where to Buy</h3>
      <p>Available stores in specified location</p>

      Keep responses concise and friendly.`;

    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a professional wine sommelier." },
        { role: "user", content: gptPrompt },
      ],
      model: "grok-2-latest",
    });

    // Extract the recommendation from the API response
    let recommendation = completion.choices[0].message.content;

    if (!recommendation) {
      return `
      <h3>Oops, Sip Happens!</h3>
      <p>We couldn't find your perfect wine right now—give it another swirl soon!</p>
    `;
    }

    // Clean up Markdown code fences if present
    recommendation = recommendation.replace(/```html|```/g, "").trim();

    return recommendation;
  } catch (error) {
    console.error("Error fetching Grok recommendation:", error);
    return `
      <h3>Oops, Sip Happens!</h3>
      <p>We couldn't find your perfect wine right now—give it another swirl soon!</p>
    `;
  }
}
