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
    <div className="min-h-screen bg-gray-50 dark:bg-[#1A1F1C] py-10 px-4 transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        
        {/* HERO SECTION */}
          <div className="relative z-10 mb-8">
            <h1 className="text-3xl md:text-4xl font-black mb-3 tracking-tight">
              AI Herb Identifier
            </h1>
            <p className="text-sm md:text-base text-gray-500/80 max-w-2xl">
              Upload a herb image and let our advanced AI identify the plant, provide health benefits, usage methods, and necessary precautions.
            </p>
          </div>


        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* LEFT PANEL: UPLOAD */}
          <div className="lg:col-span-4">
            <div className="bg-white dark:bg-[#232925] rounded-3xl shadow-sm border border-gray-100 dark:border-[#2C3530] p-8">
              <div className="flex justify-center">
                <div className="w-20 h-20 rounded-2xl bg-green-50 dark:bg-green-950/20 flex items-center justify-center border border-green-100 dark:border-green-900/10">
                  <IoCameraOutline size={40} className="text-[#446C4F] dark:text-[#528B63]" />
                </div>
              </div>

              <h2 className="text-center text-xl font-bold mt-5 text-[#3E4E36] dark:text-[#E2E8F0]">
                Upload Herb Image
              </h2>
              <p className="text-center text-xs md:text-sm text-gray-400 dark:text-zinc-500 mt-2">
                Choose a clear, high-quality image for precise analysis.
              </p>

              <label className="block mt-8 cursor-pointer group">
                <div className="bg-[#446C4F] dark:bg-[#528B63] hover:opacity-90 transition-all text-white rounded-2xl py-4 flex justify-center items-center gap-3 font-bold text-sm shadow-md active:scale-95">
                  <FaRegFileImage />
                  Choose Image
                </div>
                <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
              </label>

              {selectedFileName && (
                <p className="text-center text-[10px] md:text-xs pt-4 text-[#446C4F] dark:text-[#528B63] font-medium truncate">
                  {selectedFileName}
                </p>
              )}
            </div>
          </div>

          {/* RIGHT PANEL: ANALYSIS / RESULT */}
          <div className="lg:col-span-8">
            {activeView === "upload" && (
              <div className="bg-white dark:bg-[#232925] rounded-3xl shadow-sm border border-gray-100 dark:border-[#2C3530] p-12 text-center min-h-[300px] flex flex-col items-center justify-center">
                <IoCameraOutline size={60} className="text-gray-300 dark:text-zinc-700 mb-4" />
                <h2 className="text-xl font-bold text-[#3E4E36] dark:text-[#E2E8F0]">Ready For Analysis</h2>
                <p className="text-sm text-gray-400 mt-2">Upload a herb image to get started.</p>
              </div>
            )}

            {activeView === "analyzing" && (
              <div className="bg-white dark:bg-[#232925] rounded-3xl shadow-sm border border-gray-100 dark:border-[#2C3530] p-16 text-center">
                <div className="w-16 h-16 border-4 border-green-100 dark:border-green-900 border-t-[#446C4F] dark:border-t-[#528B63] rounded-full animate-spin mx-auto mb-6"></div>
                <h2 className="text-xl font-bold text-[#3E4E36] dark:text-[#E2E8F0]">Analyzing Herb...</h2>
                <p className="text-sm text-gray-400 mt-2">Our AI is processing your request.</p>
              </div>
            )}

            {activeView === "result" && (
              <div className="space-y-6">
                {/* RESULT HEADER */}
                <div className="bg-[#446C4F] dark:bg-[#232925] rounded-3xl p-6 md:p-8 text-white shadow-lg">
                  <div className="flex flex-col md:flex-row gap-6 items-center">
                    {previewImage && <img src={previewImage} alt="Herb" className="w-40 h-40 object-cover rounded-2xl shadow-md" />}
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="bg-white/10 px-3 py-1 rounded-full font-bold text-sm">{data.matchPercentage}% Match</span>
                      </div>
                      <h2 className="text-3xl font-black">{data.herbName}</h2>
                      <p className="italic text-green-100">{data.scientificName}</p>
                    </div>
                  </div>
                </div>

                {/* INFO GRID */}
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="bg-white dark:bg-[#232925] rounded-2xl p-6 border border-gray-100 dark:border-[#2C3530]">
                    <h3 className="font-bold text-[#446C4F] dark:text-[#528B63] flex items-center gap-2 mb-4">
                      <GoZap /> Health Benefits
                    </h3>
                    <ul className="space-y-2 text-xs md:text-sm text-[#3E4E36] dark:text-[#E2E8F0]">
                      {data.healthBenefits.map((item, i) => <li key={i} className="flex gap-2">• {item}</li>)}
                    </ul>
                  </div>

                  <div className="bg-white dark:bg-[#232925] rounded-2xl p-6 border border-gray-100 dark:border-[#2C3530]">
                    <h3 className="font-bold text-[#446C4F] dark:text-[#528B63] flex items-center gap-2 mb-4">
                      <LuBookOpenCheck /> Usage Methods
                    </h3>
                    <ul className="space-y-2 text-xs md:text-sm text-[#3E4E36] dark:text-[#E2E8F0]">
                      {data.usageMethods.map((item, i) => <li key={i}>• {item}</li>)}
                    </ul>
                  </div>
                </div>

                {/* ALERTS */}
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="bg-amber-50/50 dark:bg-amber-950/20 rounded-2xl p-6 border border-amber-100 dark:border-amber-900/30">
                    <h3 className="font-bold text-amber-700 dark:text-amber-500 flex items-center gap-2 mb-4">
                      <FiAlertTriangle /> Precautions
                    </h3>
                    <ul className="space-y-2 text-xs md:text-sm text-[#3E4E36] dark:text-[#E2E8F0]">
                      {data.precautions.map((item, i) => <li key={i}>• {item}</li>)}
                    </ul>
                  </div>

                  <div className="bg-red-50/50 dark:bg-red-950/20 rounded-2xl p-6 border border-red-100 dark:border-red-900/30">
                    <h3 className="font-bold text-red-700 dark:text-red-500 flex items-center gap-2 mb-4">
                      <FiAlertTriangle /> Side Effects
                    </h3>
                    <ul className="space-y-2 text-xs md:text-sm text-[#3E4E36] dark:text-[#E2E8F0]">
                      {data.sideEffects.map((item, i) => <li key={i}>• {item}</li>)}
                    </ul>
                  </div>
                </div>

                <button
                  onClick={() => { setResult(null); setActiveView("upload"); }}
                  className="w-full bg-[#446C4F] dark:bg-[#528B63] text-white py-4 rounded-2xl font-bold text-sm shadow-md hover:opacity-90 active:scale-95 transition-all"
                >
                  Analyze Another Herb
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}