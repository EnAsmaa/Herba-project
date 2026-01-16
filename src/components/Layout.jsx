import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import NavbarComponent from "./NavbarComponent";
import Footer from "./Footer";

export default function Layout() {
  const [profileToggle, setProfileToggle] = useState(false);
  const [cartToggle, setCartToggle] = useState(false)
  const [theme, setTheme] = useState(
    localStorage.getItem("herbaTheme") || "light"
  );

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("herbaTheme", newTheme);
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") {
        setCartToggle(false);
        setProfileToggle(false);
      }
    };

    window.addEventListener("keyup", handleKey);

    return () => {
      window.removeEventListener("keyup", handleKey);
    }

  }, []);

  return (
    <main className={theme === "dark" ? "dark" : "light"}>
      {(profileToggle || cartToggle) && (
        <div className="fixed inset-0 bg-black opacity-40 z-20"></div>
      )}
      <div className="bg-[#F7F7F7] dark:bg-[#111B21] text-black dark:text-[#C5CFD6]">
        <NavbarComponent
          toggleTheme={toggleTheme}
          theme={theme}
          profileToggle={profileToggle}
          setProfileToggle={setProfileToggle}
          cartToggle={cartToggle}
          setCartToggle={setCartToggle}
        />
        <div>
          <Outlet></Outlet>
        </div>
        <Footer />
      </div>
    </main>
  );
}
