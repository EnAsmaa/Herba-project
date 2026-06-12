import React, { useState } from "react";
import { IoPerson } from "react-icons/io5";
import { getWeightBmi, postWeightCalc } from "../Services/IdealWeightCalc";
import { Button } from "@heroui/react";
import toast, { Toaster } from "react-hot-toast";

export default function IdealWeightWeb() {
  const [isLoading, setIsLoading] = useState(false);
  const [idealData, setIdealData] = useState();
  const [bmiData, setbmiData] = useState();
  const [inputs, setInputs] = useState({
    gender: "male",
    height: "",
    age: "",
    currentWeight: "",
  });

  // bmi
  const getBmi = async (weight, height) => {
    const res = await getWeightBmi(weight, height);
    if (res && res.success) {
      setbmiData(res.data);
    }
  };

  // idealweight
  const idealWeightCalc = async () => {
    const h = parseFloat(inputs.height);
    const w = parseFloat(inputs.currentWeight);
    const a = parseInt(inputs.age);

    if (!h || h <= 0 || !w || w <= 0 || !a || a <= 0) {
      return toast.error("Please enter valid positive numbers for height, weight, and age.")
    }

    setIsLoading(true);

    const formattedPayload = {
      gender: inputs.gender.toLowerCase(),
      height: h,
      age: a,
      currentWeight: w,
    };

    const res = await postWeightCalc(formattedPayload);
    if (res && res.success) {
      setIdealData(res.data);
    }
    await getBmi(w, h);
    toast.success("IdealWeight calculated successfully! 🎉");
    setIsLoading(false);
  };

 return (
    <div className="min-h-screen bg-gray-50 text-[#3E4E36] dark:bg-[#1A1F1C] dark:text-[#E2E8F0] p-6 lg:p-12 font-sans transition-colors duration-200">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: INPUTS */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-[#232925] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-[#2C3530]">
            <div className="bg-[#446C4F] dark:bg-[#2C3530] text-white dark:text-[#E2E8F0] dark:border dark:border-[#528B63]/20 p-4 rounded-xl mb-6 text-sm leading-relaxed shadow-sm">
              Calculate your ideal weight based on your height, age, and gender.
              Results are approximate and for guidance only.
            </div>

            {/* Gender */}
            <div className="my-4">
              <label className="text-[#3E4E36] dark:text-[#E2E8F0] font-bold mb-3 block text-sm">
                Gender
              </label>
              <div className="flex gap-4">
                {["Male", "Female"].map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setInputs({ ...inputs, gender: g })}
                    className={`flex-1 py-3.5 rounded-xl cursor-pointer border-2 font-semibold transition-all duration-200 ${
                      inputs.gender === g
                        ? "bg-[#446C4F] dark:bg-[#528B63] border-[#446C4F] dark:border-[#528B63] text-white shadow-sm"
                        : "bg-transparent border-gray-200 dark:border-[#2C3530] text-gray-400 dark:text-zinc-500 hover:border-gray-300 dark:hover:border-zinc-700"
                    }`}
                  >
                    {g === "Male" ? "♂" : "♀"} {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Height Section */}
            <div className="my-4">
              <label className="text-[#3E4E36] dark:text-[#E2E8F0] font-bold mb-2 block text-sm">
                Height (cm)
              </label>
              <input
                type="number"
                value={inputs.height}
                onChange={(e) =>
                  setInputs({ ...inputs, height: e.target.value })
                }
                placeholder="e.g. 180"
                className="w-full bg-gray-50 dark:bg-[#1A1F1C] text-[#3E4E36] dark:text-[#E2E8F0] p-4 py-3 rounded-xl outline-none border border-gray-100 dark:border-[#2C3530] focus:border-[#446C4F] dark:focus:border-[#528B63] transition-colors"
              />
            </div>

            {/* Age */}
            <div className="my-4">
              <label className="text-[#3E4E36] dark:text-[#E2E8F0] font-bold mb-2 block text-sm">
                Age (years)
              </label>
              <input
                type="number"
                value={inputs.age}
                onChange={(e) => setInputs({ ...inputs, age: e.target.value })}
                placeholder="Enter your age"
                className="w-full bg-gray-50 dark:bg-[#1A1F1C] text-[#3E4E36] dark:text-[#E2E8F0] p-4 py-3 rounded-xl outline-none border border-gray-100 dark:border-[#2C3530] focus:border-[#446C4F] dark:focus:border-[#528B63] transition-colors"
              />
            </div>

            {/* Weight */}
            <div className="my-4">
              <label className="text-[#3E4E36] dark:text-[#E2E8F0] font-bold mb-2 block text-sm">
                Current Weight (kg)
              </label>
              <input
                type="number"
                value={inputs.currentWeight}
                onChange={(e) =>
                  setInputs({ ...inputs, currentWeight: e.target.value })
                }
                placeholder="Enter current weight"
                className="w-full bg-gray-50 dark:bg-[#1A1F1C] text-[#3E4E36] dark:text-[#E2E8F0] p-4 py-3 rounded-xl outline-none border border-gray-100 dark:border-[#2C3530] focus:border-[#446C4F] dark:focus:border-[#528B63] transition-colors"
              />
            </div>

            <Button
              isLoading={isLoading}
              onClick={idealWeightCalc}
              className="w-full bg-[#446C4F] dark:bg-[#528B63] text-white py-3.5 mt-6 cursor-pointer rounded-xl font-bold text-base hover:opacity-95 transition-all shadow-sm"
            >
              Calculate Ideal Weight
            </Button>
          </div>
        </div>

        {/* RIGHT COLUMN: RESULTS DASHBOARD */}
        <div className="lg:col-span-8 space-y-6">
          {idealData ? (
            <>
              {/* Top Result Card */}
              <div className="bg-gradient-to-r from-[#446C4F] to-[#528B63] dark:from-[#2C3530] dark:to-[#446C4F] p-10 rounded-2xl text-white text-center shadow-md border border-black/5">
                <div className="inline-block p-3 text-xl bg-white/10 dark:bg-white/5 rounded-full mb-3 backdrop-blur-sm">
                  <IoPerson className="text-2xl" />
                </div>
                <p className="text-xs uppercase tracking-widest font-semibold opacity-80">
                  Ideal Weight
                </p>
                <h2 className="text-5xl md:text-6xl font-black mt-2 drop-shadow-sm">
                  {idealData?.idealWeight} <span className="text-2xl font-medium">kg</span>
                </h2>
              </div>

              {/* Range Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-[#232925] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-[#2C3530] flex flex-col items-center justify-center">
                  <p className="text-gray-400 dark:text-zinc-500 text-xs uppercase tracking-wider font-semibold mb-2">Minimum Healthy Weight</p>
                  <h3 className="text-3xl font-bold text-[#3E4E36] dark:text-[#E2E8F0]">
                    {bmiData?.healthyWeightRange
                      ? bmiData.healthyWeightRange.split("-")[0].trim()
                      : "--"}
                    <span className="text-sm font-medium text-gray-400 ml-1">kg</span>
                  </h3>
                </div>
                <div className="bg-white dark:bg-[#232925] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-[#2C3530] flex flex-col items-center justify-center">
                  <p className="text-gray-400 dark:text-zinc-500 text-xs uppercase tracking-wider font-semibold mb-2">Maximum Healthy Weight</p>
                  <h3 className="text-3xl font-bold text-[#3E4E36] dark:text-[#E2E8F0]">
                    {bmiData?.healthyWeightRange
                      ? bmiData.healthyWeightRange
                          .split("-")[1]
                          .replace("kg", "")
                          .trim()
                      : "--"}
                    <span className="text-sm font-medium text-gray-400 ml-1">kg</span>
                  </h3>
                </div>
              </div>

              {/* BMI Status Card */}
              <div className="bg-white dark:bg-[#232925] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-[#2C3530]">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                  <h4 className="font-bold text-[#3E4E36] dark:text-[#E2E8F0]">
                    Body Mass Index (BMI)
                  </h4>
                  <div className="flex items-center gap-6">
                    <div>
                      <span className="text-gray-400 dark:text-zinc-500 text-xs uppercase block font-semibold">
                        Index
                      </span>
                      <span className="font-bold text-lg text-[#3E4E36] dark:text-[#E2E8F0]">{bmiData?.bmi || "--"}</span>
                    </div>
                    <span
                      className={`${
                        bmiData?.category === "Normal weight"
                          ? "bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-900/30"
                          : bmiData?.category === "Obese"
                            ? "bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900/30"
                            : bmiData?.category === "Underweight"
                              ? "bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-900/30"
                              : "bg-yellow-100 dark:bg-yellow-950/40 text-yellow-700 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-900/30"
                      } px-4 py-1.5 rounded-full text-sm font-bold shadow-sm`}
                    >
                      {bmiData?.category}
                    </span>
                  </div>
                </div>
                
                {/* BMI Progress Bar */}
                <div className="w-full h-3 bg-gray-100 dark:bg-[#1A1F1C] rounded-full flex overflow-hidden border border-gray-200/20">
                  <div className="w-[20%] bg-blue-400 dark:bg-blue-500/80" title="Underweight (< 18.5)"></div>
                  <div className="w-[30%] bg-[#528B63]" title="Normal (18.5 - 24.9)"></div>
                  <div className="w-[25%] bg-yellow-400 dark:bg-yellow-500/80" title="Overweight (25 - 29.9)"></div>
                  <div className="w-[25%] bg-red-400 dark:bg-red-500/80" title="Obese (>= 30)"></div>
                </div>
              </div>
            </>
          ) : (
            <div className="h-64 lg:h-full flex flex-col items-center justify-center border-2 border-dashed border-gray-200 dark:border-[#2C3530] rounded-2xl text-gray-400 dark:text-zinc-600 font-medium px-4 text-center">
              <IoPerson className="text-4xl mb-2 opacity-40 text-[#446C4F]" />
              Enter your details and click calculate to see results
            </div>
          )}

          {/* Recommendations & Risks */}
          {bmiData && idealData ? (
            <div className="bg-white dark:bg-[#232925] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-[#2C3530] space-y-6">
              <div>
                <h4 className="font-bold text-[#3E4E36] dark:text-[#E2E8F0] mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-[#446C4F] dark:bg-[#528B63] rounded-full block"></span>
                  Recommendations
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2.5 text-sm text-[#3E4E36]/90 dark:text-[#94A3B8] leading-relaxed">
                    <span className="text-[#446C4F] dark:text-[#528B63] font-bold mt-0.5">•</span>
                    {idealData?.recommendation}
                  </li>
                </ul>
              </div>

              <div className="pt-2 border-t border-gray-100 dark:border-[#2C3530]">
                <h4 className="font-bold text-[#3E4E36] dark:text-[#E2E8F0] mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-red-500 rounded-full block"></span>
                  Health Risk
                </h4>
                <div className="flex items-start gap-2.5 text-sm text-[#3E4E36]/90 dark:text-[#94A3B8] leading-relaxed">
                  <span className="text-red-500 font-bold mt-0.5">•</span>
                  {bmiData?.healthRisk}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
