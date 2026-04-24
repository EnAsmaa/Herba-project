import React from "react";
import { FaXmark } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import {
  FaAngleRight,
  FaHeart,
  FaPen,
} from "react-icons/fa6";
import { FaCrown } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { MdContactSupport } from "react-icons/md";
import profile from "../assets/profile.jpg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

export default function ProfileSideBar(props) {
  const navigate = useNavigate();
  const { profileToggle, setProfileToggle } = props;
  return (
    <>
      <div
        className={`overflow-auto no-scrollbar ${profileToggle ? "right-0 pointer-events-auto" : "-right-100 pointer-events-none"} profileToggle `}
      >
        <div className="header flex justify-between items-center dark:text-black px-2 py-3">
          <p className="font-semibold text-2xl">Profile</p>
          <FaXmark
            onClick={() => {
              setProfileToggle(false);
            }}
            className="text-2xl cursor-pointer"
          />
        </div>
        <div className="content w-75 p-5 m-2 flex items-center gap-5 shadow bg-white rounded-xl">
          <div className="aspect-square w-15 rounded-full ">
            <img
              className="w-full object-cover rounded-full"
              src={profile}
              alt=""
            />
          </div>
          <div className="user-info">
            <p>Asmaa Elnagar</p>
            <p className="text-gray-500 text-sm">asmaa@gmail.com</p>
          </div>
          <NavLink
            className=" text-green-800 py-2 rounded-lg cursor-pointer duration-300"
            onClick={() => {
              setProfileToggle(false);
            }}
            to={"/profile"}
          >
            <FaPen />
          </NavLink>
        </div>
        <ul className="p-5 space-y-4 text-xl  m-2 ">
          <li className="border-gray-300 border-b pb-2 flex items-center justify-between cursor-pointer ">
            <Link
              onClick={() => {
                setProfileToggle(false);
              }}
              to={"/premium"}
              className="flex items-center gap-3 w-full w-full "
            >
              <FaCrown />
              Premium
            </Link>
            <FaAngleRight className="text-gray-500 " />
          </li>

          <li className="border-gray-300 border-b pb-2 flex items-center justify-between cursor-pointer ">
            <Link
              onClick={() => {
                setProfileToggle(false);
              }}
              to={"/favorites"}
              className="flex items-center gap-3 w-full"
            >
              <FaHeart />
              Favourite
            </Link>
            <FaAngleRight className="text-gray-500" />
          </li>

          <li className="border-gray-300 border-b pb-2 flex items-center justify-between cursor-pointer ">
            <Link
              onClick={() => {
                setProfileToggle(false);
              }}
              to={"/settings"}
              className="flex items-center gap-3 w-full"
            >
              <IoMdSettings />
              Settings
            </Link>
            <FaAngleRight className="text-gray-500" />
          </li>

          <li className="border-gray-300 border-b pb-2 flex items-center justify-between cursor-pointer ">
            <Link
              onClick={() => {
                setProfileToggle(false);
              }}
              to={"/privacy"}
              className="flex items-center gap-3 w-full"
            >
              <MdOutlinePrivacyTip />
              Privacy & Security
            </Link>
            <FaAngleRight className="text-gray-500" />
          </li>
          <li className="flex items-center justify-between cursor-pointer ">
            <Link
              onClick={() => {
                setProfileToggle(false);
              }}
              to={"/helpSupport"}
              className="flex items-center gap-3 w-full"
            >
              <MdContactSupport />
              Help & Support
            </Link>
            <FaAngleRight className="text-gray-500" />
          </li>
        </ul>
        <div className="px-5 mb-3">
          <button className=" px-6 py-1.5 font-bold rounded-lg cursor-pointer w-full duration-300 text-red-800 flex  items-center justify-center gap-1">
            <FiLogOut />
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
