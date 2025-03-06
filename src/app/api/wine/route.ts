import { getWineRecommendationOpenAI } from "@/services/openAI";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const answers = await req.json();

    // Get the wine recommendation from OpenAI
    const recommendation = await getWineRecommendationOpenAI(answers);

    console.log("Recommendation:", recommendation);

    // Return the recommendation as JSON
    return NextResponse.json({ recommendation });
  } catch (error) {
    console.error("Error fetching recommendation:", error);
    return NextResponse.json(
      { recommendation: "Oops! Something went wrong. Try again later." },
      { status: 500 }
    );
  }
}
