import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoNotifications } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { FaLeaf } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";
import ProfileSideBar from "./ProfileSideBar";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../Context/AuthContext";

export default function NavbarComponent({
  toggleTheme,
  theme,
  profileToggle,
  setProfileToggle,
}) {
  const { t } = useTranslation("home");
  const { isLogin, role } = useContext(AuthContext);
  const [menuToggle, setMenuToggle] = useState(false);
  const [isRead, setIsRead] = useState(false);

  useEffect(() => {
    const syncReadStatus = () => {
      const value = localStorage.getItem("dailyTipRead") === "true";
      setIsRead(value);
    };

    // initial sync
    syncReadStatus();

    // listen to custom event
    window.addEventListener("notification-read", syncReadStatus);

    // backup sync (important fix)
    const interval = setInterval(syncReadStatus, 500);

    return () => {
      window.removeEventListener("notification-read", syncReadStatus);
      clearInterval(interval);
    };
  }, []);

  const navigate = useNavigate();
  return (
    <>
      {/* 🎯 تحديث خلفية ونصوص الهيدر ليتطابق مع ألوان التطبيق الرسمية */}
      <nav className="shadow-md bg-white text-[#3E4E36] dark:bg-[#232925] dark:text-[#E2E8F0] relative transition-colors duration-200">
        <div className="container lg:px-7 p-4 mx-auto">
          <div className="flex justify-between items-center mt-2 lg:mt-0">
            <Link to={'/'} className="flex gap-2 items-center group">
              <FaLeaf className="text-2xl text-[#446C4F] dark:text-[#528B63] group-hover:rotate-12 transition-transform" />
              <span className="text-2xl font-bold text-[#3E4E36] dark:text-[#E2E8F0]">HerbalCare</span>
            </Link>
            
            <div className="navLinks order-first lg:order-0">
              <ul className="hidden lg:flex items-center gap-6 font-semibold">
                <li>
                  <NavLink className={"link"} to={""}>
                    {t("home")}
                  </NavLink>
                </li>
                <li>
                  <NavLink className={"link"} to={"herbas"}>
                    {t("herbas")}
                  </NavLink>
                </li>
                <li>
                  <NavLink className={"link"} to={"activity"}>
                    {t("activity")}
                  </NavLink>
                </li>
                <li>
                  <NavLink className={"link"} to={"aitools"}>
                    {t("aiTools")}
                  </NavLink>
                </li>
                <li>
                  <NavLink className={"link"} to={"market"}>
                    {t("market")}
                  </NavLink>
                </li>
                <li>
                  <NavLink className={"link"} to={role === 'user' ? '/consultation' : '/reply-consultation/'}>
                    {t("consultation")}
                  </NavLink>
                </li>
              </ul>
              <IoMenu
                onClick={() => {
                  setMenuToggle(!menuToggle);
                }}
                className="lg:hidden text-2xl cursor-pointer text-[#446C4F] dark:text-[#528B63]"
              />
            </div>
            
            {isLogin ? (
              <div className="flex items-center gap-5">
                {/* theme mode */}
                {theme === "dark" ? (
                  <MdLightMode
                    onClick={() => {
                      toggleTheme();
                    }}
                    className="text-xl cursor-pointer hover:text-[#528B63] transition-colors duration-200"
                  />
                ) : (
                  <MdDarkMode
                    onClick={() => {
                      toggleTheme();
                    }}
                    className="text-xl cursor-pointer hover:text-[#446C4F] transition-colors duration-200"
                  />
                )}

                <div className="relative">
                  <NavLink to="notification">
                    <IoNotifications className="text-xl cursor-pointer hover:text-[#446C4F] dark:hover:text-[#528B63] transition-colors" />
                  </NavLink>
                  {!isRead &&
                    <div className='rounded-full size-2 bg-red-500 absolute -top-0.5 right-0 animate-pulse'></div>
                  }
                </div>

                {/* cart */}
                <FaCartShopping
                  className="text-xl cursor-pointer hover:text-[#446C4F] dark:hover:text-[#528B63] transition-colors"
                  onClick={() => navigate("./cart")}
                />

                {/* profile */}
                <div>
                  <FaUserCircle
                    onClick={() => {
                      setProfileToggle(!profileToggle);
                    }}
                    className="text-xl cursor-pointer hover:text-[#446C4F] dark:hover:text-[#528B63] transition-colors"
                  />
                  {/* profile toggle */}
                  <ProfileSideBar
                    profileToggle={profileToggle}
                    setProfileToggle={setProfileToggle}
                  />
                </div>
              </div>
            ) : (
              /* 🎯 توحيد وتنسيق ألوان أزرار الـ Auth بدلاً من تضارب درجات الأصفر والأخضر العشوائي القديم */
              <ul className="flex gap-3 text-sm font-bold text-white">
                <li>
                  <NavLink className="block bg-[#446C4F] dark:bg-[#528B63] hover:bg-[#4E8369] rounded-lg px-4 py-2 transition-all shadow-sm" to={"/login"}>
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink className="block bg-[#4E8369] dark:bg-[#2C3530] dark:text-[#E2E8F0] dark:border dark:border-[#528B63]/30 hover:opacity-90 rounded-lg px-4 py-2 transition-all shadow-sm" to={"/register"}>
                    Register
                  </NavLink>
                </li>
              </ul>
            )}
          </div>
          
          {/* Mobile Menu */}
          <ul
            className={`lg:hidden space-y-3 text-md font-medium mt-3 overflow-hidden transition-all duration-300 ${menuToggle ? "max-h-96 opacity-100 py-2 border-t border-gray-100 dark:border-zinc-800" : "max-h-0 opacity-0"}`}
          >
            <li>
              <NavLink className={"link block py-1"} onClick={() => { setMenuToggle(false) }} to={""}>
                {t("home")}
              </NavLink>
            </li>
            <li>
              <NavLink className={"link block py-1"} onClick={() => { setMenuToggle(false) }} to={"herbas"}>
                {t("herbas")}
              </NavLink>
            </li>
            <li>
              <NavLink className={"link block py-1"} onClick={() => { setMenuToggle(false) }} to={"activity"}>
                {t("activity")}
              </NavLink>
            </li>
            <li>
              <NavLink className={"link block py-1"} onClick={() => { setMenuToggle(false) }} to={"aitools"}>
                {t("aiTools")}
              </NavLink>
            </li>
            <li>
              <NavLink className={"link block py-1"} onClick={() => { setMenuToggle(false) }} to={"market"}>
                {t("market")}
              </NavLink>
            </li>
            <li>
              <NavLink className={"link block py-1"} onClick={() => { setMenuToggle(false) }} to={role === 'user' ? '/consultation' : '/reply-consultation'}>
                {t("consultation")}
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
