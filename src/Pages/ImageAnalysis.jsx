import React, { useState } from "react";
import { IoCameraOutline } from "react-icons/io5";
import { GoZap } from "react-icons/go";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { FaRegFileImage } from "react-icons/fa";
import { LuBookOpenCheck } from "react-icons/lu";
import { FiAlertTriangle } from "react-icons/fi";
import { FaHistory } from "react-icons/fa";
import toast from "react-hot-toast";

const GEMINI_KEY = import.meta.env.VITE_GEMINI_KEY1;

// const analysisResultFallback = {
//   herbName: "Mint",
//   scientificName: "Mentha × piperita",
//   matchPercentage: 94,
//   healthBenefits: [
//     "Relieves digestive issues",
//     "Reduces stress and anxiety",
//     "Helps with respiratory problems",
//     "Natural pain reliever",
//     "Rich in antioxidants",
//   ],
//   usageMethods: [
//     "Brew fresh leaves in hot water",
//     "Add to salads and desserts",
//     "Use essential oil for aromatherapy",
//     "Apply topically for pain relief",
//   ],
//   sideEffects: [
//     "May cause heartburn",
//     "Can interfere with medications",
//     "Not recommended during pregnancy",
//     "May trigger allergies",
//   ],
//   precautions: [
//     "Consult doctor if pregnant",
//     "May interact with blood pressure medications",
//     "Start with small amounts",
//     "Store in cool, dry place",
//   ],
// };

export default function ImageAnalysis() {
  const [activeView, setActiveView] = useState("upload");
  const [selectedFileName, setSelectedFileName] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [result, setResult] = useState(null);

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = reject;
    });

  const analyzeWithGemini = async (base64Image) => {
    const prompt = `
You are a botanical expert.

Analyze this herb image and return ONLY valid JSON.

{
  "herbName": "",
  "scientificName": "",
  "matchPercentage": 0,
  "healthBenefits": [],
  "usageMethods": [],
  "sideEffects": [],
  "precautions": []
}
`;

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
              parts: [
                { text: prompt },
                {
                  inline_data: {
                    mime_type: "image/jpeg",
                    data: base64Image,
                  },
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await res.json();

    let text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    text = text.replace(/```json|```/g, "");

    return JSON.parse(text);
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (!file) return;

    setSelectedFileName(file.name);
    setPreviewImage(URL.createObjectURL(file));
    setActiveView("analyzing");

    try {
      const base64 = await toBase64(file);

      const aiResult = await analyzeWithGemini(base64);

      setResult(aiResult);
      setActiveView("result");
    } catch (error) {
      toast.error(error);
    }
  };

  const data = result;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4F7F5] via-[#EDF4EE] to-[#E4EFE6] dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* HERO */}
        <div className="bg-gradient-to-r from-green-700 to-emerald-500 rounded-3xl p-10 text-white shadow-xl mb-8">
          <h1 className="text-4xl font-bold mb-3">
            AI Herb Identifier
          </h1>

          <p className="text-lg text-green-100 max-w-2xl">
            Upload a herb image and let AI identify the plant,
            provide health benefits, usage methods, precautions,
            and possible side effects.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* LEFT PANEL */}
          <div className="lg:col-span-4">
            <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-lg p-8">
              <div className="flex justify-center">
                <div className="w-24 h-24 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                  <IoCameraOutline
                    size={45}
                    className="text-green-700"
                  />
                </div>
              </div>

              <h2 className="text-center text-2xl font-bold mt-5 dark:text-white">
                Upload Herb Image
              </h2>

              <p className="text-center text-slate-500 mt-3">
                Choose a clear herb image for accurate AI analysis.
              </p>

              <label className="block mt-6 cursor-pointer">
                <div className="bg-green-700 hover:bg-green-800 transition text-white rounded-2xl py-4 flex justify-center items-center gap-3">
                  <FaRegFileImage />
                  Choose Image
                </div>

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>

              {(selectedFileName) && (
                <p className="text-center text-sm pt-3 dark:text-gray-300">
                  {selectedFileName}
                </p>
              )}
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="lg:col-span-8">
            {activeView === "upload" && (
              <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-lg p-12 text-center">
                <IoCameraOutline
                  size={70}
                  className="mx-auto text-green-600"
                />

                <h2 className="text-3xl font-bold mt-4 dark:text-white">
                  Ready For Analysis
                </h2>

                <p className="text-slate-500 mt-4">
                  Upload a herb image to begin.
                </p>
              </div>
            )}

            {activeView === "analyzing" && (
              <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-lg p-16 text-center">
                <div className="w-24 h-24 border-4 border-green-200 border-t-green-700 rounded-full animate-spin mx-auto"></div>

                <h2 className="text-3xl font-bold mt-6 dark:text-white">
                  Analyzing Herb...
                </h2>

                <p className="text-slate-500 mt-3">
                  AI is identifying your herb.
                </p>
              </div>
            )}

            {activeView === "result" && (
              <div className="space-y-6">
                {/* RESULT HEADER */}
                <div className="bg-gradient-to-r from-green-700 to-emerald-500 rounded-3xl p-8 text-white shadow-xl">
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    {previewImage && (
                      <img
                        src={previewImage}
                        alt=""
                        className="w-60 h-60 object-cover rounded-3xl shadow-lg"
                      />
                    )}

                    <div className="flex-1">
                      <div className="flex items-center gap-5 flex-wrap">
                        <div className="w-24 h-24 rounded-full bg-white text-green-700 flex items-center justify-center font-bold text-2xl">
                          {data.matchPercentage}%
                        </div>

                        <div>
                          <h2 className="text-4xl font-bold">
                            {data.herbName}
                          </h2>

                          <p className="italic text-green-100 mt-2">
                            {data.scientificName}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* BENEFITS + USAGE */}
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-lg">
                    <h3 className="font-bold text-xl flex items-center gap-2 text-green-600">
                      <GoZap />
                      Health Benefits
                    </h3>

                    <ul className="mt-4 space-y-3">
                      {data.healthBenefits.map((item, index) => (
                        <li key={index} className="flex gap-2 dark:text-white">
                          <IoShieldCheckmarkOutline className="text-green-600 mt-1" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-lg">
                    <h3 className="font-bold text-xl flex items-center gap-2 text-blue-600">
                      <LuBookOpenCheck />
                      Usage Methods
                    </h3>

                    <ul className="mt-4 space-y-3 dark:text-white">
                      {data.usageMethods.map((item, index) => (
                        <li key={index}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* SIDE EFFECTS + PRECAUTIONS */}
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="bg-red-50 dark:bg-red-950/30 rounded-3xl p-6 border border-red-200 dark:border-red-800">
                    <h3 className="font-bold text-red-600 flex items-center gap-2 text-xl">
                      <FiAlertTriangle />
                      Side Effects
                    </h3>

                    <ul className="mt-4 space-y-3">
                      {data.sideEffects.map((item, index) => (
                        <li key={index}>• {item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-amber-50 dark:bg-amber-950/30 rounded-3xl p-6 border border-amber-200 dark:border-amber-800">
                    <h3 className="font-bold text-amber-700 text-xl flex items-center gap-2">
                      <IoShieldCheckmarkOutline />
                      Precautions
                    </h3>

                    <ul className="mt-4 space-y-3">
                      {data.precautions.map((item, index) => (
                        <li key={index}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="text-center">
                  <button
                    onClick={() => {
                      setResult(null);
                      setPreviewImage(null);
                      setSelectedFileName("");
                      setActiveView("upload");
                    }}
                    className="bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-2xl flex items-center gap-3 mx-auto transition"
                  >
                    <FaHistory />
                    Analyze Another Herb
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}