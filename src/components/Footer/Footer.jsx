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
    <footer className="bg-bg-secondary-subtle border-top border-bottom text-dark px-lg-5 px-md-4 px-5 py-4">
      <div className="container-fluid">
        <div className="row g-4">
          {/* Brand Section */}
          <div className="col-12 col-lg-3">
            <div>
              <div className="d-flex align-items-center gap-2">
                <FaLeaf className='active fs-2'/>
                <h3 className="m-0 fw-bold">HerbalCare</h3>
              </div>
              <p className="mt-3 text-muted small">
                Your Journey to Holistic Wellness
              </p>
            </div>
          </div>

          {/* Dynamic Sections */}
          {sections.map((section, index) => (
            <div key={index} className="col-12 col-lg-3">
              <div className="footer-section">
                <div
                  className="d-flex justify-content-between align-items-center footer-title"
                  onClick={() => toggleSection(index)}
                  style={{ cursor: "pointer" }}
                >
                  <h5 className="fw-semibold m-0">{section.title}</h5>
                  <span className="d-lg-none fs-5">
                    {openSection === index ? <FaAngleUp /> : <FaAngleDown />}
                  </span>
                </div>

                <ul
                  className={`list-unstyled mt-3 mb-0 ${
                    openSection === index ? "d-block" : "d-none"
                  } d-lg-block`}
                >
                  {section.links.map((link, i) => (
                    <li key={i} className="my-1">
                      {link.path ? (
                        <Link
                          to={link.path}
                          className="text-decoration-none text-muted small"
                        >
                          {link.name}
                        </Link>
                      ) : (
                        <span className="text-muted small">{link.name}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

          {/* App Download Section */}
          <div className="col-12 col-lg-3 text-center text-lg-start">
            <h5 className="fw-semibold">Download The App</h5>
            <Link className="d-inline-block mt-3">
              <img
                src={playStore}
                alt="Download from Play Store"
                className="img-fluid"
                style={{ maxWidth: "160px" }}
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-top text-center mt-4 pt-4">
        <p className="m-0 small text-muted">
          &copy; 2026 HerbalCare. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
