import React, { useState } from "react";

// 1. Mock Data: Nutrients per 1g
const NUTRITION_DATABASE = {
  rice: { cal: 1.3, pro: 0.027, carb: 0.28, fat: 0.003, fiber: 0.004 },
  chicken: { cal: 1.65, pro: 0.31, carb: 0, fat: 0.036, fiber: 0 },
  broccoli: { cal: 0.34, pro: 0.028, carb: 0.07, fat: 0.004, fiber: 0.026 },
  salmon: { cal: 2.08, pro: 0.2, carb: 0, fat: 0.13, fiber: 0 },
  avocado: { cal: 1.6, pro: 0.02, carb: 0.09, fat: 0.15, fiber: 0.07 },
  spinach: { cal: 0.23, pro: 0.029, carb: 0.036, fat: 0.004, fiber: 0.022 },
};

export default function NutritionCalculator() {
  // State for input and calculated values
  const [text, setText] = useState("");
  const [stats, setStats] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
    fiber: 0,
  });

  const analyzeMeal = () => {
    // Regex to find "Word" followed by "Number"
    // Matches "Rice 200g", "Rice 200", or "Rice: 200"
    const regex = /([a-zA-Z\s]+)\s*[:\-]?\s*(\d+)/g;
    let match;

    let totals = { cal: 0, pro: 0, carb: 0, fat: 0, fib: 0 };

    while ((match = regex.exec(text)) !== null) {
      const name = match[1].trim().toLowerCase();
      const weight = parseInt(match[2]);

      if (NUTRITION_DATABASE[name]) {
        const food = NUTRITION_DATABASE[name];
        totals.cal += food.cal * weight;
        totals.pro += food.pro * weight;
        totals.carb += food.carb * weight;
        totals.fat += food.fat * weight;
        totals.fib += food.fiber * weight;
      }
    }

    setStats({
      calories: Math.round(totals.cal),
      protein: Math.round(totals.pro),
      carbs: Math.round(totals.carb),
      fats: Math.round(totals.fat),
      fiber: Math.round(totals.fib),
    });
  };

  return (
    <div className="min-h-screen bg-[#F0F2F1] p-6 lg:p-10 font-sans text-slate-800 ">
      <div className="grid grid-cols-12 gap-6 ">
        {/* Left: Input Panel */}
        <div className="col-span-12 lg:col-span-4 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold mb-4">Enter Meal Ingredients</h2>
          <p className="text-sm text-gray-500 mb-6">
            Specify quantities in grams for accurate results.
          </p>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Example: Rice 200g, Chicken 150g, Broccoli 100g"
            className="w-full h-40 p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#4E7355] transition-all resize-none"
          />
          <button
            onClick={analyzeMeal}
            className="w-full mt-6 bg-[#4E7355] text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-[#3d5a42] active:scale-[0.98] transition-all"
          >
            Analyze Meal
          </button>
        </div>

        {/* Center: Main Nutrition Stats */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-[#4E7355] p-8 rounded-3xl text-white text-center shadow-md">
            <span className="text-5xl font-black">{stats.calories}</span>
            <p className="text-sm opacity-80 mt-1">Calories</p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-700 mb-6">Macronutrients</h3>
            <div className="flex justify-between gap-4 text-center">
              {[
                {
                  label: "Protein",
                  val: `${stats.protein}g`,
                  bg: "bg-blue-100",
                  text: "text-blue-600",
                },
                {
                  label: "Carbs",
                  val: `${stats.carbs}g`,
                  bg: "bg-amber-100",
                  text: "text-amber-600",
                },
                {
                  label: "Fats",
                  val: `${stats.fats}g`,
                  bg: "bg-yellow-100",
                  text: "text-yellow-600",
                },
              ].map((m) => (
                <div key={m.label} className="flex-1">
                  <div
                    className={`${m.bg} ${m.text} font-bold py-3 rounded-xl mb-2`}
                  >
                    {m.val}
                  </div>
                  <span className="text-xs text-gray-400 font-medium">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-gray-50 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Fiber</span>
                <span className="font-bold">{stats.fiber}g</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Vitamins</span>
                <span className="font-bold">B12, C, D</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Minerals</span>
                <span className="font-bold">Iron, Calcium, Zinc</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Recommendations */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-[#FFF9E5] p-6 rounded-3xl border border-[#FFF0CB]">
            <h3 className="font-bold text-amber-900 mb-4 flex items-center gap-2">
              ⚠️ Missing Nutrients
            </h3>
            <div className="flex flex-wrap gap-2">
              {["Omega-3", "Vitamin A", "Potassium", "Magnesium"].map((n) => (
                <span
                  key={n}
                  className="bg-white px-3 py-1 rounded-lg text-xs font-bold text-amber-700"
                >
                  {n}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 ">
            <h3 className="font-bold text-gray-700 mb-6">
              Smart Recommendations
            </h3>
            <div className="space-y-4">
              {[
                {
                  title: "+ Add Spinach",
                  desc: "Rich in Vitamin A, Iron, and Magnesium",
                },
                {
                  title: "+ Include Salmon",
                  desc: "Excellent source of Omega-3 and Vitamin D",
                },
                {
                  title: "+ Add Avocado",
                  desc: "Provides healthy fats and Potassium",
                },
              ].map((rec) => (
                <div
                  key={rec.title}
                  className="p-4 rounded-2xl bg-[#F0F4F1] border border-gray-100"
                >
                  <p className="font-bold text-[#4E7355] text-sm">
                    {rec.title}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{rec.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
