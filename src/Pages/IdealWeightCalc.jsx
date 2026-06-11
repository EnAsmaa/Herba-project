import React, { useState } from "react";
import { IoPerson } from "react-icons/io5";
import { postWeightCalc } from "../Services/IdealWeightCalc";
import { Button } from "@heroui/react";

export default function IdealWeightWeb() {
  const [isLoading,setIsLoading]=useState(false);
  const [idealData,setIdealData]=useState();
  const [inputs, setInputs] = useState({
    gender: "",
    height: 0,
    age: 0,
    currentWeight: 0,
  });

  const idealWeightCalc=async()=>{
    setIsLoading(true);
    const res = await postWeightCalc(inputs);
    if(res && res.success)
    {
      setIdealData(res.data);
      setIsLoading(false);
    }
    console.log(idealData);
  }

  

  return (
    <div className="min-h-screen bg-[#F8F9FA] p-6 lg:p-12 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: EXACT INPUTS FROM SCREEN 1 */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6  rounded-xl shadow-sm border border-gray-100">
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
                    onClick={() => setInputs({ ...inputs, gender: g })}
                    className={`flex-1 py-4 rounded-xl cursor-pointer border-2 transition-all ${inputs.gender === g ? "bg-[#84B38E] border-[#84B38E] text-white" : "bg-white border-gray-100 text-gray-500"}`}
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
                Current Weight (kg) - Optional
              </label>
              <input
                type="number"
                value={inputs.weight}
                onChange={(e) =>
                  setInputs({ ...inputs, weight: e.target.value })
                }
                placeholder="Enter current weight"
                className="w-full bg-[#F3F5F4] p-4 py-3 rounded-xl outline-none"
              />
            </div>

            <Button
              isLoading={isLoading}
              onClick={idealWeightCalc}
              className="w-full  bg-[#4E7355] text-white py-3 my-4 cursor-pointer rounded-xl font-bold text-lg hover:bg-[#3d5a42] transition-colors"
            >
              Calculate Ideal Weight
            </Button>
          </div>
        </div>

        {/* RIGHT COLUMN: RESULTS DASHBOARD (SCREENS 2 & 3) */}
        <div className="lg:col-span-8 space-y-6">
          {idealData ? (
            <>
              {/* Top Result Card */}
              <div className="bg-gradient-to-r from-[#4E7355] to-[#79A683] p-10 rounded-xl text-white text-center shadow-lg">
                <div className="inline-block p-3 text-xl bg-white/20 rounded-full mb-4">
                  <IoPerson/>
                </div>
                <p className="text-sm uppercase tracking-widest opacity-90">
                  Ideal Weight
                </p>
                <h2 className="text-6xl font-bold mt-2">{idealData.idealWeight}</h2>
              </div>

              {/* Range Cards - Exact Layout from Screen 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center">
                  <p className="text-gray-400 text-sm mb-2">Minimum</p>
                  <h3 className="text-3xl font-bold text-gray-800">
                    {idealData.minW} kg
                  </h3>
                </div>
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center">
                  <p className="text-gray-400 text-sm mb-2">Maximum</p>
                  <h3 className="text-3xl font-bold text-gray-800">
                    {idealData.maxW} kg
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
                      <span className="font-bold">{idealData.bmi || "--"}</span>
                    </div>
                    <span className={`${idealData.status==='Normal weight'?'bg-[#D1F7D6]  text-[#4E7355]':idealData.status==='Obese'?'text-red-800 bg-red-600/20':idealData.status==='Underweight'?'bg-blue-200 text-blue-800':'text-yellow-700 bg-yellow-200'} px-4 py-1 rounded-full text-sm font-semibold`}>
                      {idealData.weightStatus}
                    </span>
                  </div>
                </div>
                {/* Added a Web Visual: BMI Progress Bar */}
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
          {/* Recommendations from Screen 3 */}
          {idealData ? (
            <>
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <h4 className="font-bold text-gray-800 mb-6">
                  Recommendations
                </h4>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3 text-gray-600">
                    <span className="text-[#4E7355] mt-1">•</span>
                        {idealData.recommendation}
                  </li>
                  {/* <li className="flex items-start gap-3 text-gray-600">
                    <span className="text-[#4E7355] mt-1">•</span>
                    Exercise regularly for 30 minutes daily
                  </li>
                  <li className="flex items-start gap-3 text-gray-600">
                    <span className="text-[#4E7355] mt-1">•</span>
                    Get adequate sleep (7-8 hours)
                  </li>
                  <li className="flex items-start gap-3 text-gray-600">
                    <span className="text-[#4E7355] mt-1">•</span>
                    Consult a doctor or nutritionist for a personalized plan
                  </li> */}
                </ul>
              </div>
            </>
          ) : null}
        </div>

      </div>
    </div>
  );
}
