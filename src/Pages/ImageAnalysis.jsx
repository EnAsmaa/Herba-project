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
  // --- STATE MANAGEMENT ---
  const [activeView, setActiveView] = useState('upload'); // 'upload' | 'analyzing' | 'result'
  const [selectedFileName, setSelectedFileName] = useState('');

  // --- MOCK RESULT DATA (Example based on Mint image) ---

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
    <div className="min-h-screen bg-[#F0F2F1] p-6 lg:p-10 font-sans text-slate-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: SIDEBAR STATS & UPLOADER */}
        <div className="lg:col-span-4 space-y-6">
          {/* General Info Sidebar Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-[#4E7355] font-bold text-xl mb-6">General Info</h2>
            <div className="space-y-4 text-gray-500 text-sm">
              <div className="flex justify-between items-center">
                <span>Total Herbas Found</span>
                <span className="font-bold text-[#4E7355]">19</span>
              </div>
              <div className="flex justify-between items-center border-t pt-4">
                <span>Analysis Points</span>
                <span className="font-bold text-amber-600 font-mono">15,050</span>
              </div>
            </div>
          </div>

          {/* Uploader Card (Persistent on Left) */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
            <div className="inline-block p-4 bg-[#4E7355] rounded-full mb-6">
              <IoCameraOutline className="text-white" size={32} strokeWidth={2.5}/>
            </div>
            <h3 className="text-xl font-bold text-slate-700 mb-2">Herb Image Analysis</h3>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
              Upload or take a photo. Our AI will analyze the image and tell you about the herb.
            </p>
            <label className="w-full inline-block cursor-pointer">
              <span className="flex items-center justify-center gap-2 bg-[#4E7355] text-white py-3 cursor-pointer my-3 px-6 rounded-xl font-bold transition-all hover:bg-[#3d5a42]">
                <FaRegFileImage size={20} /> Choose Image
              </span>
              <input type="file" onChange={handleFileChange} className="sr-only" />
            </label>
            {selectedFileName && <p className="text-xs text-gray-400 mt-2">{selectedFileName}</p>}
          </div>
        </div>

        {/* RIGHT COLUMN: RESULTS DASHBOARD (Dynamic Area) */}
        <div className="lg:col-span-8 space-y-6 min-h-[500px]">
          {/* 1. UPLOAD STATE (Screen 1 Equivalent) */}
          {activeView === 'upload' && (
            <div className="h-full border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center text-center p-10 text-gray-300">
              <FaRegFileImage size={64} className="mb-4 opacity-20"/>
              <p className="font-medium text-lg">Input your Herb image on the left to see <br/> detailed botanical analysis.</p>
            </div>
          )}

          {/* 2. ANALYZING STATE (Transition equivalent) */}
          {activeView === 'analyzing' && (
            <div className="h-full bg-white rounded-xl flex flex-col items-center justify-center text-center p-10 shadow-sm">
                <div className="relative w-16 h-16 mb-4">
                    <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-[#4E7355] border-t-transparent rounded-full animate-spin"></div>
                </div>
                <p className="font-bold text-[#4E7355]">Analyzing image...</p>
                <p className="text-sm text-gray-400">Verifying botanical features</p>
            </div>
          )}

          {/* 3. RESULT STATE (Screens 2 & 3 Equivalent) */}
          {activeView === 'result' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              
              {/* Herb Header & Match Card (Screen 2 Top) */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between gap-4">
                <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 shadow-inner">
                        <img src={analysisResult.imageThumb} className="object-cover w-full h-full" alt="Detected Herb" />
                    </div>
                    <div>
                        <h4 className="font-black text-2xl text-slate-800">{analysisResult.herbName}</h4>
                        <p className="text-gray-400 italic font-medium">{analysisResult.scientificName}</p>
                    </div>
                </div>
                <div className="flex items-center gap-1.5 bg-[#D1F7D6] text-[#4E7355] px-4 py-1 rounded-full text-xs font-bold whitespace-nowrap">
                   <IoShieldCheckmarkOutline size={14}/> {analysisResult.matchPercentage}% Match
                </div>
              </div>

              {/* Grid for Benefits and Use Cases (Web-Specific Multicolumn) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Health Benefits (Screen 2 List) */}
                  <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                    <h5 className="font-bold text-slate-700 flex items-center gap-2 mb-6">
                        <GoZap className="text-[#4E7355]"/> Health Benefits
                    </h5>
                    <ul className="space-y-3.5">
                      {analysisResult.healthBenefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-2 text-sm text-gray-600">
                           <IoShieldCheckmarkOutline size={16} className="text-[#4E7355] mt-0.5 shrink-0"/> {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* How to Use (Screen 3 List) */}
                  <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                    <h5 className="font-bold text-slate-700 flex items-center gap-2 mb-6">
                        <LuBookOpenCheck className="text-[#4E7355]"/> How to Use
                    </h5>
                    <ul className="space-y-3.5">
                      {analysisResult.usageMethods.map((method) => (
                        <li key={method} className="flex items-start gap-2 text-sm text-gray-600">
                           <span className="text-[#4E7355] font-bold">•</span> {method}
                        </li>
                      ))}
                    </ul>
                  </div>
              </div>

              {/* Grid for Warnings and Precautions (Screen 3 Warnings) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Side Effects */}
                  <div className="bg-[#FFF1F1] p-8 rounded-xl border border-[#FFE1E1]">
                    <h5 className="font-bold text-red-900 flex items-center gap-2 mb-6">
                        <FiAlertTriangle className="text-red-700"/> Side Effects
                    </h5>
                    <ul className="space-y-3.5">
                      {analysisResult.sideEffects.map((effect) => (
                        <li key={effect.text} className="flex items-start gap-2.5 text-sm text-red-800">
                           <span className="opacity-60 text-lg">©</span> {effect.text}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Precautions */}
                  <div className="bg-[#FFF9E5] p-8 rounded-xl border border-[#FFF0CB]">
                    <h5 className="font-bold text-amber-900 flex items-center gap-2 mb-6">
                        <IoShieldCheckmarkOutline className="text-amber-700"/> Precautions
                    </h5>
                    <ul className="space-y-3.5">
                      {analysisResult.precautions.map((precaution) => (
                        <li key={precaution} className="flex items-start gap-2 text-sm text-amber-800">
                           <span className="opacity-60 text-lg">•</span> {precaution}
                        </li>
                      ))}
                    </ul>
                  </div>
              </div>

              {/* Final Analyze New Button (Web Positioned) */}
              <div className="text-center pt-8">
                <button 
                    onClick={() => {setActiveView('upload'); setSelectedFileName('');}}
                    className="flex items-center cursor-pointer gap-2 mx-auto bg-[#F3F5F4] text-[#4E7355] py-3 px-10 rounded-xl font-bold hover:bg-gray-200 transition-colors"
                >
                    <FaHistory size={18}/> Analyze New Image
                </button>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  )

}
export default ImageAnalysis;