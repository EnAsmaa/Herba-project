import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import NavbarComponent from "./NavbarComponent";
import Footer from "./Footer";
import { useTranslation } from "react-i18next";
import QuickSettings from "./QuickSettings";

export default function Layout() {
  const { i18n } = useTranslation();
  const [profileToggle, setProfileToggle] = useState(false);
  const [quickSettings, setQuickSettings] = useState(false);
  const [newTheme, setNewTheme] = useState(
    localStorage.getItem("herbaTheme") || "light",
  );
  const [theme, setTheme] = useState(
    localStorage.getItem("herbaTheme") || "light",
  );
  const [language, setLanguage] = useState(
    localStorage.getItem("herbaLanguage") || "en",
  );

  // navbar toggle theme btn
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("herbaTheme", newTheme);
  };

  // save new settings
  const saveQuickSettings = () => {
    setTheme(newTheme);
    localStorage.setItem("herbaTheme", newTheme);
    i18n.changeLanguage(language);
    localStorage.setItem("herbaLanguage", language);
    setQuickSettings(false);
  };

  useEffect(() => {
    saveQuickSettings();
  }, []);

  // prevent open profile sidebar and quick setting together
  useEffect(() => {
    if (profileToggle === true) {
      setQuickSettings(false);
    }
    if (quickSettings === true) {
      setProfileToggle(false);
    }
  }, [profileToggle, quickSettings]);

  // handle profile sidebar toggle
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") {
        setProfileToggle(false);
      }
    };

    window.addEventListener("keyup", handleKey);
    return () => {
      window.removeEventListener("keyup", handleKey);
    };
  }, []);

  return (
    <main
      className={theme === "dark" ? "dark" : "light"}
      onClick={() => {
        setQuickSettings(false);
      }}
    >
      {profileToggle && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-20 h-screen cursor-pointer"
          onClick={(e) => {
            setProfileToggle(false);
          }}
        ></div>
      )}
      
      {/* 🎯 هنا تم تحديث الخلفية والنصوص لتطابق ألوان Flutter الرسمية بالكامل للموقع */}
      <div className="min-h-screen bg-[#F5F7F3] dark:bg-[#1A1F1C] text-[#3E4E36] dark:text-[#E2E8F0] transition-colors duration-200">
        <NavbarComponent
          toggleTheme={toggleTheme}
          theme={theme}
          profileToggle={profileToggle}
          setProfileToggle={setProfileToggle}
        />
        <div>
          <QuickSettings 
            quickSettings={quickSettings} 
            setQuickSettings={setQuickSettings} 
            newTheme={newTheme} 
            saveQuickSettings={saveQuickSettings} 
            setNewTheme={setNewTheme} 
            language={language} 
            setLanguage={setLanguage}
          />
          <Outlet></Outlet>
        </div>
        <Footer />
      </div>
    </main>
  );
}