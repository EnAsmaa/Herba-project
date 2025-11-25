import React, { useState } from "react";
import { FaLeaf } from "react-icons/fa6";
import { Link } from "react-router-dom";
import playStore from "../../assets/PlayStore.png";
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
    <footer className="shadow-2xl bg-[#F4F7F5] dark:bg-[#0D161C] border-b border-[#adabab] dark:border-[#294353a6] border-t py-5">
      <div className="container lg:px-7 px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-2">
              <FaLeaf className="text-2xl text-[#335D39] dark:text-[#4d7c5c]" />
              <h3 className="m-0 text-xl font-bold dark:text-[#E9EDEF]">HerbalCare</h3>
            </div>
            <p className="mt-2 text-base  text-[#333333]  dark:text-[#C5CFD6]">
              Your Journey to Holistic Wellness
            </p>
          </div>

          {/* Dynamic Sections */}
          {sections.map((section, index) => (
            <div key={index} className="footer-section text-[#333333]  dark:text-[#8696A0]">

              {/* Section Header */}
              <div
                className="flex justify-between items-center footer-title cursor-pointer md:cursor-default"
                onClick={() => toggleSection(index)}
              >
                <h5 className="font-medium m-0 text-black dark:text-[#C5CFD6]">{section.title}</h5>

                {/* Toggle Icon (mobile only) */}
                <span className="md:hidden text-lg">
                  {openSection === index ? <FaAngleUp /> : <FaAngleDown />}
                </span>
              </div>

              {/* Links */}
              <ul
                className={`list-none mt-3 space-y-2 
              ${openSection === index ? "block" : "hidden"} 
              md:block`}
              >
                {section.links.map((link, i) => (
                  <li key={i}>
                    {link.path ? (
                      <Link
                        to={link.path}
                        className="text-base  hover:underline"
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <span className="text-base">{link.name}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* App Download */}
          <div>
            <h5 className="font-medium dark:text-[#C5CFD6]">Download The App</h5>
            <Link className="block mt-3">
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
      <div className="border-t border-[#adabab] dark:border-[#294353a6] text-center mt-6 pt-4">
        <p className="m-0 text-base text-[#333333] dark:text-[#8696A0]">
          &copy; 2026 HerbalCare. All Rights Reserved.
        </p>
      </div>
    </footer>

  );
}
