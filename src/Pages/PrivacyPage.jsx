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
      <div className="min-h-screen bg-main py-5 px-4 ">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-emerald-950 mb-6">
            Privacy & Security
          </h2>

          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <h2 className="text-xl font-semibold text-[#14532D] mb-2">
              Our Commitment to Your Privacy
            </h2>
            <p className="text-gray-500">
              At HerbaCare, we take your privacy seriously. We are committed to
              protecting your personal information and ensuring that your data
              is safe and secure.
            </p>
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {privacySections.map((item, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition flex items-start gap-3">
                <div className="p-3  text-xl font-bold bg-[#5ab67f42] rounded-lg text-[#14532D]">{item.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold text-[#14532D] ">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div className="bg-green-100 rounded-xl p-6 mt-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Have Questions?
            </h3>
            <p className="text-gray-600 mb-3">
              If you have any questions about our privacy policy, feel free to
              contact us.
            </p>
            <p className="font-semibold text-gray-900">privacy@herbacare.com</p>
          </div>

          {/* Footer */}
          <p className="text-center text-gray-400 text-sm mt-6">
            Last updated: October 2025
          </p>
        </div>
      </div>
    </>
  );
}
