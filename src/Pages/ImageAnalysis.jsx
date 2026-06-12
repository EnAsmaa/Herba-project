import React, { useState } from 'react';
import { IoCameraOutline } from "react-icons/io5";
import { GoZap } from "react-icons/go";
import { FaRegStar } from "react-icons/fa";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { FaRegFileImage } from "react-icons/fa";
import { LuBookOpenCheck } from "react-icons/lu";
import { FiAlertTriangle } from "react-icons/fi";
import { FaHistory } from "react-icons/fa";

const analysisResult = {
  herbName: 'Mint',
  scientificName: 'Mentha × piperita',
  matchPercentage: 94,
  imageThumb: 'https://images.unsplash.com/photo-1594191376049-74e64f0b2f1e?q=80&w=200', // Example Mint thumb
  healthBenefits: [
    'Relieves digestive issues',
    'Reduces stress and anxiety',
    'Helps with respiratory problems',
    'Natural pain reliever',
    'Rich in antioxidants'
  ],
  usageMethods: [
    'Brew fresh leaves in hot water',
    'Add to salads and desserts',
    'Use essential oil for aromatherapy',
    'Apply topically for pain relief'
  ],
  sideEffects: [
    { text: 'May cause heartburn', icon: '©' },
    { text: 'Can interfere with medications', icon: '©' },
    { text: 'Not recommended during pregnancy', icon: '©' },
    { text: 'May trigger allergies', icon: '©' }
  ],
  precautions: [
    'Consult doctor if pregnant',
    'May interact with blood pressure medications',
    'Start with small amounts',
    'Store in cool, dry place'
  ]
};
const ImageAnalysis = () => {

  const [activeView, setActiveView] = useState('upload'); // 'upload' | 'analyzing' | 'result'
  const [selectedFileName, setSelectedFileName] = useState('');


  // --- LOGIC FOR INPUT SIMULATION ---
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFileName(file.name);
      setActiveView('analyzing');
      // Simulate analysis delay
      setTimeout(() => {
        setActiveView('result');
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-[#3E4E36] dark:bg-[#1A1F1C] dark:text-[#E2E8F0] p-6 lg:p-10 font-sans transition-colors duration-200">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: SIDEBAR STATS & UPLOADER */}
        <div className="lg:col-span-4 space-y-6">
          {/* General Info Sidebar Card */}
          <div className="bg-white dark:bg-[#232925] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-[#2C3530]">
            <h2 className="text-[#446C4F] dark:text-[#528B63] font-bold text-lg mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-[#446C4F] dark:bg-[#528B63] rounded-full block"></span>
              General Info
            </h2>
            <div className="space-y-4 text-sm text-[#3E4E36]/80 dark:text-[#94A3B8]">
              <div className="flex justify-between items-center">
                <span>Total Herbas Found</span>
                <span className="font-extrabold text-[#446C4F] dark:text-[#528B63]">19</span>
              </div>
              <div className="flex justify-between items-center border-t border-gray-100 dark:border-[#2C3530] pt-4">
                <span>Analysis Points</span>
                <span className="font-bold text-amber-600 dark:text-amber-500 font-mono">15,050</span>
              </div>
            </div>
          </div>

          {/* Uploader Card (Persistent on Left) */}
          <div className="bg-white dark:bg-[#232925] p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-[#2C3530] text-center">
            <div className="inline-block p-4 bg-[#446C4F] dark:bg-[#2C3530] text-white dark:text-[#528B63] dark:border dark:border-[#528B63]/20 rounded-full mb-4 shadow-sm">
              <IoCameraOutline size={32} strokeWidth={2.5}/>
            </div>
            <h3 className="text-xl font-bold text-[#3E4E36] dark:text-[#E2E8F0] mb-2">Herb Image Analysis</h3>
            <p className="text-sm text-[#3E4E36]/70 dark:text-[#94A3B8] mb-6 leading-relaxed">
              Upload or take a photo. Our AI will analyze the image and tell you about the herb.
            </p>
            <label className="w-full inline-block cursor-pointer">
              <span className="flex items-center justify-center gap-2 bg-[#446C4F] dark:bg-[#528B63] text-white py-3 px-6 rounded-xl font-bold text-sm transition-all hover:opacity-95 shadow-sm active:scale-95">
                <FaRegFileImage size={18} /> Choose Image
              </span>
              <input type="file" onChange={handleFileChange} className="sr-only" />
            </label>
            {selectedFileName && (
              <p className="text-xs text-gray-400 dark:text-zinc-500 mt-3 truncate bg-gray-50 dark:bg-[#1A1F1C] px-3 py-1.5 rounded-lg border border-dashed border-gray-200 dark:border-[#2C3530]">
                {selectedFileName}
              </p>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: RESULTS DASHBOARD (Dynamic Area) */}
        <div className="lg:col-span-8 space-y-6 min-h-[500px]">
          {/* 1. UPLOAD STATE (Screen 1 Equivalent) */}
          {activeView === 'upload' && (
            <div className="h-full min-h-[450px] border-2 border-dashed border-gray-200 dark:border-[#2C3530] rounded-2xl flex flex-col items-center justify-center text-center p-10 text-gray-400 dark:text-zinc-600">
              <FaRegFileImage size={56} className="mb-4 opacity-30 text-[#446C4F] dark:text-[#528B63]"/>
              <p className="font-semibold text-base text-[#3E4E36]/60 dark:text-zinc-500 max-w-sm leading-relaxed">
                Input your Herb image on the left to see <br/> detailed botanical analysis.
              </p>
            </div>
          )}

          {/* 2. ANALYZING STATE (Transition equivalent) */}
          {activeView === 'analyzing' && (
            <div className="h-full min-h-[450px] bg-white dark:bg-[#232925] rounded-2xl border border-gray-100 dark:border-[#2C3530] flex flex-col items-center justify-center text-center p-10 shadow-sm">
              <div className="relative w-14 h-14 mb-4">
                <div className="absolute inset-0 border-4 border-gray-100 dark:border-[#1A1F1C] rounded-full"></div>
                <div className="absolute inset-0 border-4 border-[#446C4F] dark:border-[#528B63] border-t-transparent rounded-full animate-spin"></div>
              </div>
              <p className="font-bold text-[#446C4F] dark:text-[#528B63]">Analyzing image...</p>
              <p className="text-xs text-gray-400 dark:text-zinc-500 mt-1">Verifying botanical features</p>
            </div>
          )}

          {/* 3. RESULT STATE (Screens 2 & 3 Equivalent) */}
          {activeView === 'result' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              
              {/* Herb Header & Match Card (Screen 2 Top) */}
              <div className="bg-white dark:bg-[#232925] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-[#2C3530] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-5">
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 dark:bg-[#1A1F1C] shadow-inner border border-gray-100 dark:border-[#2C3530] shrink-0">
                    <img src={analysisResult.imageThumb} className="object-cover w-full h-full" alt="Detected Herb" />
                  </div>
                  <div>
                    <h4 className="font-black text-2xl text-[#3E4E36] dark:text-[#E2E8F0]">{analysisResult.herbName}</h4>
                    <p className="text-gray-400 dark:text-zinc-500 italic font-medium text-sm mt-0.5">{analysisResult.scientificName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-400 px-4 py-1.5 rounded-full text-xs font-bold border border-green-200 dark:border-green-900/20 w-fit self-end sm:self-center">
                  <IoShieldCheckmarkOutline size={14}/> {analysisResult.matchPercentage}% Match
                </div>
              </div>

              {/* Grid for Benefits and Use Cases */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Health Benefits (Screen 2 List) */}
                <div className="bg-white dark:bg-[#232925] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-[#2C3530]">
                  <h5 className="font-bold text-[#3E4E36] dark:text-[#E2E8F0] flex items-center gap-2 mb-4 text-base">
                    <GoZap className="text-[#446C4F] dark:text-[#528B63] text-lg"/> Health Benefits
                  </h5>
                  <ul className="space-y-3">
                    {analysisResult.healthBenefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-2.5 text-sm text-[#3E4E36]/90 dark:text-[#94A3B8] leading-relaxed">
                        <IoShieldCheckmarkOutline size={16} className="text-[#446C4F] dark:text-[#528B63] mt-0.5 shrink-0"/> 
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* How to Use (Screen 3 List) */}
                <div className="bg-white dark:bg-[#232925] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-[#2C3530]">
                  <h5 className="font-bold text-[#3E4E36] dark:text-[#E2E8F0] flex items-center gap-2 mb-4 text-base">
                    <LuBookOpenCheck className="text-[#446C4F] dark:text-[#528B63] text-lg"/> How to Use
                  </h5>
                  <ul className="space-y-3">
                    {analysisResult.usageMethods.map((method) => (
                      <li key={method} className="flex items-start gap-2 text-sm text-[#3E4E36]/90 dark:text-[#94A3B8] leading-relaxed">
                        <span className="text-[#446C4F] dark:text-[#528B63] font-bold mt-0.5 select-none">•</span> 
                        <span>{method}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Grid for Warnings and Precautions (Screen 3 Warnings) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Side Effects */}
                <div className="bg-red-50/50 dark:bg-red-950/20 p-6 rounded-2xl border border-red-100 dark:border-red-900/30">
                  <h5 className="font-bold text-red-900 dark:text-red-400 flex items-center gap-2 mb-4 text-base">
                    <FiAlertTriangle className="text-red-600 dark:text-red-400"/> Side Effects
                  </h5>
                  <ul className="space-y-3">
                    {analysisResult.sideEffects.map((effect) => (
                      <li key={effect.text} className="flex items-start gap-2 text-sm text-red-800 dark:text-red-300/90 leading-relaxed">
                        <span className="opacity-60 text-base font-bold select-none">•</span> 
                        <span>{effect.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Precautions */}
                <div className="bg-amber-50/50 dark:bg-amber-950/20 p-6 rounded-2xl border border-amber-100 dark:border-amber-900/30">
                  <h5 className="font-bold text-amber-900 dark:text-amber-400 flex items-center gap-2 mb-4 text-base">
                    <IoShieldCheckmarkOutline className="text-amber-600 dark:text-amber-400"/> Precautions
                  </h5>
                  <ul className="space-y-3">
                    {analysisResult.precautions.map((precaution) => (
                      <li key={precaution} className="flex items-start gap-2 text-sm text-amber-800 dark:text-amber-300/90 leading-relaxed">
                        <span className="opacity-60 text-base font-bold select-none">•</span> 
                        <span>{precaution}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Final Analyze New Button (Web Positioned) */}
              <div className="text-center pt-6">
                <button 
                  onClick={() => {setActiveView('upload'); setSelectedFileName('');}}
                  className="flex items-center cursor-pointer gap-2 mx-auto bg-white dark:bg-[#232925] border border-gray-200 dark:border-[#2C3530] text-[#446C4F] dark:text-[#528B63] font-bold text-sm py-3 px-8 rounded-xl hover:bg-gray-100 dark:hover:bg-[#2C3530]/50 shadow-sm transition-colors active:scale-95"
                >
                  <FaHistory size={16}/> Analyze New Image
                </button>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );

}
export default ImageAnalysis;