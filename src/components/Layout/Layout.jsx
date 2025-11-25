import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import NavbarComponent from "./../Navbar/NavbarComponent";
import Footer from "../Footer/Footer";

export default function Layout() {
  const [profileToggle, setProfileToggle] = useState(false);
  const [theme, setTheme] = useState(
    localStorage.getItem("herbaTheme") || "light"
  );

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("herbaTheme", newTheme);
  };

  return (
    <main className={theme === "dark" ? "dark" : "light"}>
      {profileToggle && (
        <div className="fixed inset-0 bg-black opacity-40 z-20"></div>
      )}
      <div className="bg-[#F7F7F7] dark:bg-[#111B21] text-black dark:text-[#C5CFD6]">
        <NavbarComponent
          toggleTheme={toggleTheme}
          theme={theme}
          profileToggle={profileToggle}
          setProfileToggle={setProfileToggle}
        />
        <div className="">
          <Outlet></Outlet>
        </div>
        <Footer />
      </div>
    </main>
  );
}
