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
        }
      );

      const data = await res.json();

      let textResponse =
        data?.candidates?.[0]?.content?.parts?.[0]?.text;

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
    <div className="min-h-screen bg-[#F0F2F1] p-6 lg:p-10 font-sans text-slate-800">
      <div className="grid grid-cols-12 gap-6">

        {/* INPUT */}
        <div className="col-span-12 bg-white p-8 rounded-3xl">
          <h2 className="text-lg font-bold mb-4">
            Enter Meal Description
          </h2>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Example: Rice 200g, Chicken 150g, Broccoli 100g"
            className="w-full h-40 p-4 bg-gray-50 rounded-2xl"
          />

          <button
            onClick={analyzeWithGemini}
            disabled={loading}
            className="w-full mt-6 bg-[#4E7355] text-white py-4 rounded-2xl font-bold"
          >
            {loading ? "Analyzing..." : "Analyze with AI"}
          </button>
        </div>

        {/* RESULTS */}
        <div className="col-span-12">

          {!stats && (
            <div className="text-center text-gray-400">
              Enter a meal to analyze with AI
            </div>
          )}

          {stats && (
            <div className="space-y-6">

              {/* Calories */}
              <div className="bg-[#4E7355] text-white p-8 rounded-3xl text-center">
                <div className="text-5xl font-black">
                  {stats.calories}
                </div>
                <p>Calories</p>
              </div>

              {/* Macros */}
              <div className="grid md:grid-cols-4 gap-4">
                {[
                  ["Protein", stats.protein],
                  ["Carbs", stats.carbs],
                  ["Fats", stats.fats],
                  ["Fiber", stats.fiber],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="bg-white p-4 rounded-2xl text-center"
                  >
                    <p className="font-bold text-[#4E7355]">
                      {value}g
                    </p>
                    <p className="text-xs text-gray-400">{label}</p>
                  </div>
                ))}
              </div>

              {/* Missing Nutrients */}
              <div className="bg-red-400/20 p-6 rounded-3xl col-span-12">
                <h3 className="font-bold mb-3">
                  Missing Nutrients
                </h3>
                <div className="flex flex-wrap gap-2">
                  {stats.missingNutrients?.map((n) => (
                    <span
                      key={n}
                      className="bg-white px-3 py-1 rounded-lg text-xs"
                    >
                      {n}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-white p-6 rounded-3xl col-span-12">
                <h3 className="font-bold mb-3">
                  AI Recommendations
                </h3>

                {stats.recommendations?.map((r, i) => (
                  <p key={i} className="text-sm mb-2">
                    • {r}
                  </p>
                ))}
              </div>

              <button
                onClick={() => {
                  setStats(null);
                  setText('')
                }}
                className="bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-2xl flex items-center gap-3 mx-auto transition"
              >
                <FaHistory />
                Analyze Another Herb
              </button>

            </div>
          )}
        </div>
      </div>
    </div>
  );
} 