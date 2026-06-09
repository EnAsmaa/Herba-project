import React, { useContext, useEffect, useState } from "react";
import { FaCalculator, FaXmark } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { FaAngleRight, FaHeart, FaPen } from "react-icons/fa6";
import { FaCrown } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { MdContactSupport } from "react-icons/md";
import profile from "../assets/profile.jpg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { AuthContext } from "../Context/AuthContext";
import { getProfileDataAPI } from './../Services/Authentication';

export default function ProfileSideBar(props) {
  const navigate = useNavigate();
  const { profileToggle, setProfileToggle } = props;
  const { setIslogin } = useContext(AuthContext);
  const { setRole } = useContext(AuthContext);
  const [userData, setUserData] = useState()


  const logOut = () => {
    localStorage.removeItem("loginToken");
    localStorage.removeItem("userType");
    setIslogin(false);
    setRole(null);
    navigate("/login");
    setProfileToggle(false);
  };

  const getProfileData = async () => {
    const response = await getProfileDataAPI()
    if (response.success) {
      setUserData(response.data)
    }
  }

  useEffect(() => {
    getProfileData()
  }, [])

  return (
    <>
      <div
        className={`overflow-auto no-scrollbar ${profileToggle ? "right-0 pointer-events-auto" : "-right-100 pointer-events-none"} profileToggle `}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="header flex justify-between items-center dark:text-black px-2 py-3">
          <p className="font-semibold text-2xl text-dark dark:text-white">
            Profile
          </p>
          <FaXmark
            onClick={() => {
              setProfileToggle(false);
            }}
            className="text-2xl cursor-pointer"
          />
        </div>
        <div className="content w-75 p-5 m-2 flex items-center gap-5 shadow bg-white rounded-xl">
          <div className="aspect-square w-15 rounded-full bg-green-900 flex items-center justify-center text-white font-semibold ">
              {userData?.firstName.charAt(0).toUpperCase() + userData?.lastName.charAt(0).toUpperCase()}
          </div>
          <div className="user-info">
            <p className="text-black whitespace-nowrap">{userData?.firstName.toUpperCase() + ' ' + userData?.lastName.toUpperCase()}</p>
            <p className="text-gray-500 text-sm">{userData?.email}</p>
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
              className="flex items-center gap-3 w-full"
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
              to={"/weight-calc"}
              className="flex items-center gap-3 w-full"
            >
              <FaCalculator />
              BMI Calculation
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
          <button
            className=" px-6 py-1.5 font-bold rounded-lg cursor-pointer w-full duration-300 text-red-800 flex  items-center justify-center gap-1"
            onClick={logOut}
          >
            <FiLogOut />
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
