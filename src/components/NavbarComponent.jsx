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

  console.log(role)

  const navigate = useNavigate();
  return (
    <>
      <nav className=" shadow-lg bg-[#F7F7F7] text-[#1A242A] dark:bg-[#1A242A] dark:text-[#F7F7F7] relative">
        <div className="container lg:px-7 p-4 mx-auto">
          <div className="flex justify-between items-center mt-2 lg:mt-0">
            <div className="flex gap-1 items-center">
              <FaLeaf className="text-2xl text-[#335D39] dark:text-[#6bb683]" />
              <span className="text-2xl font-medium">HerbalCare</span>
            </div>
            <div className="navLinks order-first lg:order-0">
              <ul className="hidden lg:flex items-center gap-6 font-medium">
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
                className="lg:hidden text-2xl cursor-pointer"
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
                    className="text-xl cursor-pointer hover:animate-spin"
                  />
                ) : (
                  <MdDarkMode
                    onClick={() => {
                      toggleTheme();
                    }}
                    className="text-xl cursor-pointer hover:animate-spin"
                  />
                )}

                <div className="relative">
                  <NavLink to="notification">
                    <IoNotifications className="text-xl cursor-pointer" />
                  </NavLink>
                  <div className="rounded-full size-1.5 bg-green-800 absolute -top-1 left-0 animate-blink"></div>
                </div>

                {/* cart */}
                <FaCartShopping
                  className="text-xl cursor-pointer"
                  onClick={() => navigate("./cart")}
                />

                {/* profile */}
                <div>
                  <FaUserCircle
                    onClick={() => {
                      setProfileToggle(!profileToggle);
                    }}
                    className="text-xl cursor-pointer"
                  />
                  {/* profile toggle */}
                  <ProfileSideBar
                    profileToggle={profileToggle}
                    setProfileToggle={setProfileToggle}
                  />
                </div>
              </div>
            ) : (
              <ul className="flex gap-2 ">
                <li>
                  <NavLink className={" bg-[#3e8b56] rounded-lg px-4 py-2 "} to={"/login"}>
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink className={" bg-[#c2aa3e] rounded-lg px-4 py-2 "} to={"/register"}>
                    Register
                  </NavLink>
                </li>
              </ul>
            )}
          </div>
          <ul
            className={`lg:hidden space-y-3 text-md mt-2 overflow-hidden transition-all duration-700 ${menuToggle ? "max-h-96" : "max-h-0"}`}
          >
            <li>
              <NavLink className={"link"} onClick={() => { setMenuToggle(false) }} to={""}>
                {t("home")}
              </NavLink>
            </li>
            <li>
              <NavLink className={"link"} onClick={() => { setMenuToggle(false) }} to={"herbas"}>
                {t("herbas")}
              </NavLink>
            </li>
            <li>
              <NavLink className={"link"} onClick={() => { setMenuToggle(false) }} to={"activity"}>
                {t("activity")}
              </NavLink>
            </li>
            <li>
              <NavLink className={"link"} onClick={() => { setMenuToggle(false) }} to={"aitools"}>
                {t("aiTools")}
              </NavLink>
            </li>
            <li>
              <NavLink className={"link"} onClick={() => { setMenuToggle(false) }} to={"market"}>
                {t("market")}
              </NavLink>
            </li>
            <li>
              <NavLink className={"link"} onClick={() => { setMenuToggle(false) }} to={role === 'user' ? '/consultation' : '/reply-consultation'}>
                {t("consultation")}
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
