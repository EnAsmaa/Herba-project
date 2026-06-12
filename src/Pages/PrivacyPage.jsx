import React, { useState } from "react";
import { MdLockOutline } from "react-icons/md";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { FaTableCells } from "react-icons/fa6";
import { MdOutlinePersonalInjury } from "react-icons/md";
import { RiFileList3Line } from "react-icons/ri";
import { MdOutlineCookie } from "react-icons/md";

export default function PrivacyPage() {
  const privacySections = [
    {
      title: "Data Protection",
      icon: <MdLockOutline />,
      description:
        "We are committed to protecting your personal data and use the latest encryption technologies to ensure the security of your information.",
    },
    {
      title: "Privacy & Security",
      icon: <MdOutlinePrivacyTip />,
      description:
        "Your data is protected with strong passwords and two factor authentication. We will not share your information without your consent.",
    },
    {
      title: "Data Collection",
      icon:<FaTableCells />,
      description:
        "We only collect the necessary data to improve your experience. You can control the data you share with us.",
    },
    {
      title: "Your Rights",
      icon:<MdOutlinePersonalInjury />,
      description:
        "You have the right to access, update, delete, or restrict the processing of your data at any time.",
    },
    {
      title: "Usage Policy",
      icon:<RiFileList3Line />,
      description:
        "We use your data only to provide our services and improve your experience. We do not sell your data to third parties.",
    },
    {
      title: "Cookies",
      icon:<MdOutlineCookie />,
      description:
        "We use cookies to improve app performance. You can manage your preferences in settings.",
    },
  ];
  return (
    <>
      <div className="min-h-screen bg-gray-50 text-[#3E4E36] dark:bg-[#1A1F1C] dark:text-[#E2E8F0] py-12 px-4 font-sans transition-colors duration-200">
        <div className="max-w-5xl mx-auto">
          
          {/* Title */}
          <h2 className="text-3xl font-black text-[#3E4E36] dark:text-[#E2E8F0] mb-8 tracking-tight">
            Privacy & Security
          </h2>

          {/* Main Commitment Card */}
          <div className="bg-white dark:bg-[#232925] rounded-2xl p-6 md:p-8 border border-gray-100 dark:border-[#2C3530] shadow-sm mb-6">
            <h2 className="text-xl font-black text-[#446C4F] dark:text-[#528B63] mb-3 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-[#446C4F] dark:bg-[#528B63] rounded-full block"></span>
              Our Commitment to Your Privacy
            </h2>
            <p className="text-sm md:text-base text-[#3E4E36]/80 dark:text-[#94A3B8] leading-relaxed">
              At HerbaCare, we take your privacy seriously. We are committed to
              protecting your personal information and ensuring that your health data,
              consultations, and choices are perfectly safe and secure.
            </p>
          </div>

          {/* Feature Grid Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {privacySections.map((item, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-[#232925] rounded-2xl border border-gray-100 dark:border-[#2C3530] shadow-sm p-6 hover:shadow-md transition-all duration-200 flex items-start gap-4"
              >
                {/* Icon Wrapper Optimized */}
                <div className="p-3 bg-green-50 dark:bg-green-950/30 text-[#446C4F] dark:text-[#528B63] rounded-xl text-xl shrink-0 border border-green-100 dark:border-green-900/10">
                  {item.icon}
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-[#3E4E36] dark:text-[#E2E8F0]">
                    {item.title}
                  </h3>
                  <p className="text-xs md:text-sm text-[#3E4E36]/70 dark:text-[#94A3B8] mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Support Box */}
          <div className="bg-green-50/60 dark:bg-[#232925] rounded-2xl p-6 md:p-8 mt-8 border border-green-100 dark:border-[#2C3530] relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-lg font-bold text-[#3E4E36] dark:text-[#E2E8F0] mb-2">
                Have Questions?
              </h3>
              <p className="text-sm text-[#3E4E36]/80 dark:text-[#94A3B8] mb-4 max-w-xl">
                If you have any inquiries or concerns regarding our privacy policies, data handling, or security protocols, feel free to reach out to our dedicated compliance team.
              </p>
              <a 
                href="mailto:privacy@herbacare.com"
                className="inline-block font-bold text-sm text-[#446C4F] dark:text-[#528B63] hover:underline"
              >
                privacy@herbacare.com
              </a>
            </div>
          </div>

          {/* Meta Footer */}
          <p className="text-center text-gray-400 dark:text-zinc-500 text-xs mt-8">
            Last updated: October 2025
          </p>
        </div>
      </div>
    </>
  );
}
