"use client"; // Client-side component for interactivity

import React from "react";
import { useState } from "react";
import Link from "next/link";

interface WineAnswers {
  flavor: string;
  type: string;
  occasion: string;
  budget: string;
  boldness: string;
  country?: string;
  city?: string;
  extraPreferences?: string;
}

function WinePage() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<WineAnswers>({
    flavor: "",
    type: "",
    occasion: "",
    budget: "",
    boldness: "",
    country: "",
    city: "",
    extraPreferences: "",
  });
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnswer = (key: keyof WineAnswers, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    if (key === "country" || key === "city" || key === "extraPreferences") {
      // Optional fields, don't force next step
      return;
    }
    setStep((prev) => prev + 1);
  };

  const handleSubmit = async () => {
    // Summarize questions and answers as an object
    const summary = {
      "Flavor Preference": answers.flavor,
      "Type of Wine": answers.type,
      "Occasion/Food Pairing": answers.occasion,
      Budget: answers.budget,
      Boldness: answers.boldness,
      "Country (Optional)": answers.country || "Not provided",
      "City (Optional)": answers.city || "Not provided",
      "Extra Preferences (Optional)":
        answers.extraPreferences || "Not provided",
    };

    // Log the summary to the console
    console.log(summary);

    // Start Loading
    setLoading(true);
    setRecommendation(null); // Clear previous recommendation

    // Send answers to the API via POST request
    try {
      const response = await fetch("/api/wine", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(answers),
      });

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();
      setRecommendation(data.recommendation);
    } catch (error) {
      console.error("Error fetching recommendation:", error);
      setRecommendation("Oops! Something went wrong. Try again later.");
    } finally {
      // Stop loading regardless of success or failure
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-purple-800 mb-6">Wine Quiz</h1>

      {loading ? (
        <div className="text-center">
          <p className="text-lg text-gray-600 mb-4">
            Your Sixth Sense Is at Work...
          </p>
          <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      ) : recommendation ? (
        <div className="text-center max-w-2xl mx-auto">
          {/* Render HTML recommendation */}
          <div
            className="text-lg text-gray-600 mb-8 recommendation"
            dangerouslySetInnerHTML={{ __html: recommendation }}
          />
          <Link href="/">
            <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
              Back to Home
            </button>
          </Link>
        </div>
      ) : (
        <div className="w-full max-w-md">
          {step === 1 && (
            <div>
              <p className="text-lg text-gray-600 mb-4">
                Fruity, Dry, or Sweet?
              </p>
              <div className="flex flex-col gap-2">
                {["Fruity", "Dry", "Sweet"].map((option) => (
                  <button
                    key={option}
                    onClick={() => handleAnswer("flavor", option)}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <p className="text-lg text-gray-600 mb-4">
                Red, White, Rosé, or Sparkling?
              </p>
              <div className="flex flex-col gap-2">
                {["Red", "White", "Rosé", "Sparkling"].map((option) => (
                  <button
                    key={option}
                    onClick={() => handleAnswer("type", option)}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <p className="text-lg text-gray-600 mb-4">
                For a meal or solo? If meal, what’s cooking?
              </p>
              <input
                type="text"
                value={answers.occasion}
                onChange={(e) =>
                  setAnswers((prev) => ({ ...prev, occasion: e.target.value }))
                }
                placeholder="e.g., Steak or solo"
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              />
              <button
                onClick={() =>
                  handleAnswer("occasion", answers.occasion || "solo")
                }
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              >
                Next
              </button>
            </div>
          )}

          {step === 4 && (
            <div>
              <p className="text-lg text-gray-600 mb-4">
                Budget: Under €15, €15–30, or €30+?
              </p>
              <div className="flex flex-col gap-2">
                {["Under €15", "€15–30", "€30+"].map((option) => (
                  <button
                    key={option}
                    onClick={() => handleAnswer("budget", option)}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 5 && (
            <div>
              <p className="text-lg text-gray-600 mb-4">
                Light, Medium, or Bold?
              </p>
              <div className="flex flex-col gap-2">
                {["Light", "Medium", "Bold"].map((option) => (
                  <button
                    key={option}
                    onClick={() => handleAnswer("boldness", option)}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 6 && (
            <div>
              <p className="text-lg text-gray-600 mb-4">
                Where are you? (Optional)
              </p>
              <input
                type="text"
                value={answers.country}
                onChange={(e) =>
                  setAnswers((prev) => ({ ...prev, country: e.target.value }))
                }
                placeholder="e.g., Germany"
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              />
              <p className="text-lg text-gray-600 mb-4">
                Which city? (Optional)
              </p>
              <input
                type="text"
                value={answers.city}
                onChange={(e) =>
                  setAnswers((prev) => ({ ...prev, city: e.target.value }))
                }
                placeholder="e.g., Berlin"
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              />
              <p className="text-lg text-gray-600 mb-4">
                Anything else we should know? (Optional, e.g., region,
                allergies, tastes)
              </p>
              <input
                type="text"
                value={answers.extraPreferences}
                onChange={(e) =>
                  setAnswers((prev) => ({
                    ...prev,
                    extraPreferences: e.target.value,
                  }))
                }
                placeholder="e.g., no bitter, love Tuscany, sulfite allergy"
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              />
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              >
                Get My Wine
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default WinePage;
