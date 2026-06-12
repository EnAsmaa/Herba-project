import React, { useState } from "react";
import { FaHistory } from "react-icons/fa";

const GEMINI_KEY = import.meta.env.VITE_GEMINI_KEY2;

export default function NutritionCalculator() {
  const [text, setText] = useState("");
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  // تحويل النص فقط (مش صورة هنا)
  const analyzeWithGemini = async () => {
    setLoading(true);

    const prompt = `
You are a professional nutritionist AI.

Analyze the following meal and return ONLY valid JSON:

Meal:
${text}

Return format:
{
  "calories": number,
  "protein": number,
  "carbs": number,
  "fats": number,
  "fiber": number,
  "missingNutrients": string[],
  "recommendations": string[]
}

Rules:
- Use realistic nutrition values
- Assume grams if not specified
- Return JSON only, no text
`;

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${GEMINI_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: prompt }],
              },
            ],
          }),
        },
      );

      const data = await res.json();

      let textResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      // تنظيف JSON لو فيه markdown
      textResponse = textResponse.replace(/```json|```/g, "");

      const result = JSON.parse(textResponse);

      setStats(result);
    } catch (err) {
      console.error(err);
      alert("Error analyzing meal");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#F5F7F3] p-6 lg:p-10 font-sans text-[#3E4E36]">
      <div className="max-w-4xl mx-auto grid grid-cols-12 gap-6">
        {/* INPUT SECTION */}
        <div className="col-span-12 bg-white dark:bg-[#232925] p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-[#2C3530]">
          <h2 className="text-lg font-bold mb-4 text-[#3E4E36] dark:text-[#E2E8F0]">
            Enter Meal Description
          </h2>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Example: Rice 200g, Chicken 150g, Broccoli 100g"
            className="w-full h-40 p-4 bg-[#F5F7F3] dark:bg-[#1A1F1C] border border-gray-200 dark:border-[#2C3530] rounded-2xl outline-none focus:ring-1 focus:ring-[#446C4F] dark:text-[#E2E8F0]"
          />

          <button
            onClick={analyzeWithGemini}
            disabled={loading}
            className="w-full mt-6 bg-[#446C4F] hover:bg-[#3E4E36] text-white py-4 rounded-2xl font-bold transition-all active:scale-95"
          >
            {loading ? "Analyzing..." : "Analyze with AI"}
          </button>
        </div>

        {/* RESULTS SECTION */}
        <div className="col-span-12">
          {!stats && (
            <div className="text-center text-[#94A3B8] py-10">
              Enter a meal to analyze with AI
            </div>
          )}

          {stats && (
            <div className="space-y-6">
              {/* Calories */}
              <div className="bg-[#446C4F] text-white p-8 rounded-3xl text-center shadow-lg">
                <div className="text-5xl font-black">{stats.calories}</div>
                <p className="opacity-90">Calories</p>
              </div>

              {/* Macros */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  ["Protein", stats.protein],
                  ["Carbs", stats.carbs],
                  ["Fats", stats.fats],
                  ["Fiber", stats.fiber],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="bg-white dark:bg-[#232925] p-4 rounded-2xl text-center border border-gray-100 dark:border-[#2C3530]"
                  >
                    <p className="font-bold text-[#446C4F] dark:text-[#528B63]">
                      {value}g
                    </p>
                    <p className="text-xs text-[#94A3B8]">{label}</p>
                  </div>
                ))}
              </div>

              {/* Missing Nutrients */}
              <div className="bg-[#E8F3EE] dark:bg-[#446C4F]/10 p-6 rounded-3xl border border-[#94C973]/20">
                <h3 className="font-bold mb-3 text-[#3E4E36] dark:text-[#E2E8F0]">
                  Missing Nutrients
                </h3>
                <div className="flex flex-wrap gap-2">
                  {stats.missingNutrients?.map((n) => (
                    <span
                      key={n}
                      className="bg-white dark:bg-[#2C3530] px-3 py-1 rounded-lg text-xs text-[#446C4F] dark:text-[#94C973] border border-[#94C973]/30"
                    >
                      {n}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-white dark:bg-[#232925] p-6 rounded-3xl border border-gray-100 dark:border-[#2C3530]">
                <h3 className="font-bold mb-3 text-[#3E4E36] dark:text-[#E2E8F0]">
                  AI Recommendations
                </h3>
                {stats.recommendations?.map((r, i) => (
                  <p
                    key={i}
                    className="text-sm mb-2 text-[#3E4E36]/80 dark:text-[#E2E8F0]/80"
                  >
                    • {r}
                  </p>
                ))}
              </div>

              <button
                onClick={() => {
                  setStats(null);
                  setText("");
                }}
                className="bg-[#446C4F] hover:bg-[#3E4E36] text-white px-8 py-4 rounded-2xl flex items-center gap-3 mx-auto transition active:scale-95"
              >
                <FaHistory />
                Analyze Another Meal
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
