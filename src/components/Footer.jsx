import React, { useState } from "react";
import { FaLeaf } from "react-icons/fa6";
import { Link } from "react-router-dom";
import playStore from "../assets/PlayStore.png";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

export default function Footer() {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const sections = [
    {
      title: "Quick Links",
      links: [
        { name: "Herbas", path: "herbas" },
        { name: "Activity", path: "activity" },
        { name: "AI Tools", path: "features" },
        { name: "Shop", path: "shop" },
        { name: "Login", path: "login" },
        { name: "Register", path: "register" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "FAQ" },
        { name: "Privacy Policy" },
        { name: "Terms & Conditions" },
        { name: "Shipping Info" },
        { name: "Contact Us", path: "contactus" }
      ],
    },
  ];

 return (
    <footer className="shadow-2xl bg-[#E8F3EE]/40 text-[#3E4E36] dark:bg-[#232925] dark:text-[#94A3B8] border-b border-gray-200 dark:border-[#2C3530] border-t py-6 mt-12 transition-colors duration-200">
      <div className="container lg:px-7 px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <FaLeaf className="text-2xl text-[#446C4F] dark:text-[#528B63]" />
              <h3 className="m-0 text-xl font-bold text-[#3E4E36] dark:text-[#E2E8F0]">HerbalCare</h3>
            </div>
            <p className="text-sm text-[#3E4E36]/80 dark:text-[#94A3B8]">
              Your Journey to Holistic Wellness
            </p>
          </div>

          {/* Dynamic Sections */}
          {sections.map((section, index) => (
            <div key={index} className="footer-section">

              {/* Section Header */}
              <div
                className="flex justify-between items-center footer-title cursor-pointer md:cursor-default"
                onClick={() => toggleSection(index)}
              >
                <h5 className="font-bold text-sm uppercase tracking-wider text-[#3E4E36] dark:text-[#E2E8F0]">
                  {section.title}
                </h5>

                {/* Toggle Icon (mobile only) */}
                <span className="md:hidden text-lg text-[#446C4F] dark:text-[#528B63]">
                  {openSection === index ? <FaAngleUp /> : <FaAngleDown />}
                </span>
              </div>

              {/* Links */}
              <ul
                className={`list-none mt-3 space-y-2 text-sm
                ${openSection === index ? "block" : "hidden"} 
                md:block`}
              >
                {section.links.map((link, i) => (
                  <li key={i}>
                    {link.path ? (
                      <Link
                        to={link.path}
                        className="hover:text-[#446C4F] dark:hover:text-[#528B63] transition-colors duration-150"
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <span>{link.name}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* App Download */}
          <div className="space-y-3">
            <h5 className="font-bold text-sm uppercase tracking-wider text-[#3E4E36] dark:text-[#E2E8F0]">
              Download The App
            </h5>
            <Link className="block w-fit hover:scale-[1.02] transition-transform duration-200">
              <img
                src={playStore}
                alt="Download from Play Store"
                className="w-40"
              />
            </Link>
          </div>

        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-200 dark:border-[#2C3530] text-center mt-8 pt-4">
        <p className="m-0 text-sm text-[#3E4E36]/70 dark:text-[#94A3B8]/70">
          &copy; 2026 HerbalCare. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
