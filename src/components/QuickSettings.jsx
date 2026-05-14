import React from "react";
import { CiSettings } from "react-icons/ci";
import { useTranslation } from "react-i18next";

export default function QuickSettings({
  quickSettings,
  setQuickSettings,
  newTheme,
  setNewTheme,
  language,
  setLanguage,
  saveQuickSettings
}) {
  const { i18n } = useTranslation();
  return (
    <>
      <div
        className={`${i18n.language === "en" ? "-left-12 hover:-left-2 rounded-br-xl rounded-tr-xl" : "-right-11 hover:-right-2 rounded-bl-xl rounded-tl-xl"} fixed z-50 top-1/4 transition-all duration-450 bg-green-800 dark:bg-[white] text-[#1A242A] dark:text-[#4E7355] py-2 px-3 cursor-pointer group`}
        onClick={(e) => {
          setQuickSettings(true);
          e.stopPropagation();
        }}
      >
        <CiSettings
          className={`${quickSettings ? "hidden" : "block"} text-white dark:text-black group-hover:animate-spin`}
          size={30}
        />
      </div>

      <div
        className={`${i18n.language === "en" ? (quickSettings ? "left-0 rounded-br-xl rounded-tr-xl" : "-left-80") : quickSettings ? "right-0 rounded-bl-xl rounded-tl-xl" : "-right-80"} fixed z-50! top-1/4 p-3 transition-all duration-700 bg-gray-200 text-white`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="space-y-3">
          <div className="rounded-lg bg-linear-to-br from-green-950/80 to-green-800/80 p-3">
            <p className="font-semibold">Mode:</p>
            <div className="flex gap-2 mt-1">
              <button
                onClick={() => {
                  setNewTheme("system");
                }}
                className={` ${newTheme === "system" && "bg-green-950/60 text-white"} px-4 py-2 bg-gray-100 text-black hover:bg-green-950/60 hover:text-white rounded-lg`}
              >
                System
              </button>
              <button
                onClick={() => {
                  setNewTheme("light");
                }}
                className={`${newTheme === "light" && "bg-green-950/60 text-white"} px-4 py-2 bg-gray-100 text-black hover:bg-green-950/60 hover:text-white rounded-lg`}
              >
                Light
              </button>
              <button
                onClick={() => {
                  setNewTheme("dark");
                }}
                className={`${newTheme === "dark" && "bg-green-950/60 text-white"} px-4 py-2 bg-gray-100 text-black hover:bg-green-950/60 hover:text-white rounded-lg`}
              >
                Dark
              </button>
            </div>
          </div>
          <div className="rounded-lg bg-linear-to-br from-green-950/80 to-green-800/80 p-3">
            <p className="font-semibold">Language:</p>
            <div className="flex gap-2 mt-1">
              <button
                onClick={() => {
                  setLanguage("en");
                }}
                className={`${language === "en" && "bg-green-950/60 text-white"} px-4 py-2 w-1/2 bg-gray-100 text-black hover:bg-green-950/60 hover:text-white rounded-lg`}
              >
                En
              </button>
              <button
                onClick={() => {
                  setLanguage("ar");
                }}
                className={`${language === "ar" && "bg-green-950/60 text-white"} px-4 py-2 w-1/2 bg-gray-100 text-black hover:bg-green-950/60 hover:text-white rounded-lg`}
              >
                Ar
              </button>
            </div>
          </div>
          <button
            className="rounded-lg bg-linear-to-br from-green-950/80 to-green-800/80 p-3 text-black! hover:bg-green-950/60 hover:text-white! w-full! mt-2"
            onClick={() => {
              saveQuickSettings();
            }}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
}
