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
    console.log(res?.data);
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
    <div className="min-h-screen bg-[#F8F9FA] p-6 lg:p-12 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: INPUTS */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="bg-[#4E7355] text-white p-4 rounded-xl mb-8 text-sm leading-relaxed">
              Calculate your ideal weight based on your height, age, and gender.
              Results are approximate and for guidance only.
            </div>

            {/* Gender */}
            <div className="my-3">
              <label className="text-gray-800 font-bold mb-4 block">
                Gender
              </label>
              <div className="flex gap-4">
                {["Male", "Female"].map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setInputs({ ...inputs, gender: g })}
                    className={`flex-1 py-4 rounded-xl cursor-pointer border-2 transition-all ${
                      inputs.gender === g
                        ? "bg-[#84B38E] border-[#84B38E] text-white"
                        : "bg-white border-gray-100 text-gray-500"
                    }`}
                  >
                    {g === "Male" ? "♂" : "♀"} {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Height Section */}
            <div className="relative my-3 pt-3">
              <label className="text-gray-800 font-bold mb-2 block">
                Height (cm)
              </label>
              <input
                type="number"
                value={inputs.height}
                onChange={(e) =>
                  setInputs({ ...inputs, height: e.target.value })
                }
                placeholder="e.g. 180"
                className="w-full bg-[#F3F5F4] p-4 py-3 rounded-xl outline-none border-none"
              />
            </div>

            {/* Age */}
            <div className="my-3 pt-3">
              <label className="text-gray-800 font-bold mb-2 block">
                Age (years)
              </label>
              <input
                type="number"
                value={inputs.age}
                onChange={(e) => setInputs({ ...inputs, age: e.target.value })}
                placeholder="Enter your age"
                className="w-full bg-[#F3F5F4] p-4 py-3 rounded-xl outline-none"
              />
            </div>

            {/* Weight */}
            <div className="my-3 pt-3">
              <label className="text-gray-800 font-bold mb-2 block text-sm">
                Current Weight (kg)
              </label>
              <input
                type="number"
                value={inputs.currentWeight} // تعديل الارتباط لـ currentWeight ليتطابق مع الـ State والـ API
                onChange={(e) =>
                  setInputs({ ...inputs, currentWeight: e.target.value })
                }
                placeholder="Enter current weight"
                className="w-full bg-[#F3F5F4] p-4 py-3 rounded-xl outline-none"
              />
            </div>

            <Button
              isLoading={isLoading}
              onClick={idealWeightCalc}
              className="w-full bg-[#4E7355] text-white py-3 my-4 cursor-pointer rounded-xl font-bold text-lg hover:bg-[#3d5a42] transition-colors"
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
              <div className="bg-gradient-to-r from-[#4E7355] to-[#79A683] p-10 rounded-xl text-white text-center shadow-lg">
                <div className="inline-block p-3 text-xl bg-white/20 rounded-full mb-4">
                  <IoPerson />
                </div>
                <p className="text-sm uppercase tracking-widest opacity-90">
                  Ideal Weight
                </p>
                <h2 className="text-6xl font-bold mt-2">
                  {idealData?.idealWeight} kg
                </h2>
              </div>

              {/* Range Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center">
                  <p className="text-gray-400 text-sm mb-2">Minimum</p>
                  <h3 className="text-3xl font-bold text-gray-800">
                    {bmiData?.healthyWeightRange
                      ? bmiData.healthyWeightRange.split("-")[0].trim()
                      : "--"}
                    kg
                  </h3>
                </div>
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center">
                  <p className="text-gray-400 text-sm mb-2">Maximum</p>
                  <h3 className="text-3xl font-bold text-gray-800">
                    {bmiData?.healthyWeightRange
                      ? bmiData.healthyWeightRange
                          .split("-")[1]
                          .replace("kg", "")
                          .trim()
                      : "--"}
                    kg
                  </h3>
                </div>
              </div>

              {/* BMI Status Card */}
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <h4 className="font-bold text-gray-800">
                    Body Mass Index (BMI)
                  </h4>
                  <div className="flex items-center gap-6">
                    <div>
                      <span className="text-gray-400 text-xs uppercase block">
                        Index
                      </span>
                      <span className="font-bold">{bmiData?.bmi || "--"}</span>
                    </div>
                    <span
                      className={`${
                        bmiData?.category === "Normal weight"
                          ? "bg-[#D1F7D6] text-[#4E7355]"
                          : bmiData?.category === "Obese"
                            ? "text-red-800 bg-red-600/20"
                            : bmiData?.category === "Underweight"
                              ? "bg-blue-200 text-blue-800"
                              : "text-yellow-700 bg-yellow-200"
                      } px-4 py-1 rounded-full text-sm font-semibold`}
                    >
                      {bmiData?.category}
                    </span>
                  </div>
                </div>
                {/* BMI Progress Bar */}
                <div className="w-full h-3 bg-gray-100 rounded-full flex overflow-hidden">
                  <div className="w-[20%] bg-blue-300"></div>
                  <div className="w-[30%] bg-[#84B38E]"></div>
                  <div className="w-[25%] bg-yellow-300"></div>
                  <div className="w-[25%] bg-red-400"></div>
                </div>
              </div>
            </>
          ) : (
            <div className="h-full flex items-center justify-center border-2 border-dashed border-gray-200 rounded-3xl text-gray-400">
              Enter your details and click calculate to see results
            </div>
          )}

          {/* Recommendations */}
          {bmiData && idealData ? (
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <h4 className="font-bold text-gray-800 mb-6">Recommendations</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-gray-600">
                  <span className="text-[#4E7355] mt-1">•</span>
                  {idealData?.recommendation}
                </li>
              </ul>
              <h4 className="font-bold text-gray-800 mb-6 mt-3">Risk</h4>
              <li className="flex items-start gap-3 text-gray-600">
                <span className="text-[#4E7355] mt-1">•</span>
                {bmiData?.healthRisk}
              </li>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
