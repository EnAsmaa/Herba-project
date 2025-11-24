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
    <footer className="shadow-2xl bg-gray-100 text-black dark:bg-gray-900 dark:text-gray-100 border-b border-t py-5">
      <div className="container lg:px-7 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-2">
              <FaLeaf className="text-2xl" />
              <h3 className="m-0 font-bold">HerbalCare</h3>
            </div>
            <p className="mt-3 text-sm">
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
                <h5 className="font-medium m-0">{section.title}</h5>

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
                        className="text-sm hover:underline"
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <span className="text-sm">{link.name}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* App Download */}
          <div>
            <h5 className="font-medium">Download The App</h5>
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
      <div className="border-t text-center mt-6 pt-4">
        <p className="m-0 text-sm">
          &copy; 2026 HerbalCare. All Rights Reserved.
        </p>
      </div>
    </footer>

  );
}
