import person1 from "../../assets/person1.jpg";
import person4 from "../../assets/person4.jpg";
import person2 from "../../assets/person2.jpg";
import person3 from "../../assets/person3.jpg";
import Search from "../../components/Search";
import { useContext, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import { FaRegStar } from "react-icons/fa";
import toast from "react-hot-toast";
import { getDoctorsAPI } from "../../Services/ConsultationServices";

const doctorTypes = [
  { id: 1, name: "All" },
  { id: 2, name: "Herb & Plant Experts" },
  { id: 3, name: "Nutrition Experts" },
  { id: 4, name: "Sports & Gym Experts" },
];

export default function Consultation() {
  const [selectedDoctor, setSelectedDoctor] = useState("All");
  const [doctors, setDoctors] = useState();

  const getDoctors = async () => {
    try {
      const response = await getDoctorsAPI();
      if (response.success) {
        setDoctors(response.data);
      }
    } catch (err) {
      toast.error(err?.message);
    }
  };

  useEffect(() => {
    getDoctors();
  }, []);

  return (
    <>
      <section className="min-h-screen bg-[#F5F7F3] text-[#3E4E36] dark:bg-[#1A1F1C] dark:text-[#E2E8F0] py-9 font-sans transition-colors duration-200">
        <div className="container px-4 lg:px-7 mx-auto">
          {/* Header Layout */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div className="consult-head">
              <h2 className="text-2xl md:text-3xl font-black text-[#3E4E36] dark:text-[#E2E8F0] mb-1 tracking-tight">
                Herbal Consultation
              </h2>
              <p className="text-xs md:text-sm text-[#3E4E36]/70 dark:text-[#94A3B8]">
                Book your session with the best certified consultants and
                specialists
              </p>
            </div>

            <NavLink
              to={"/my-consultation"}
              className="px-5 py-2.5 bg-[#446C4F] dark:bg-[#528B63] hover:opacity-95 font-bold text-xs md:text-sm text-white rounded-xl shadow-sm cursor-pointer flex gap-3 items-center transition-all active:scale-95 whitespace-nowrap"
            >
              My Questions
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#94C973] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#94C973]"></span>
              </span>
            </NavLink>
          </div>

          {/* Search Component */}
          <Search placehoder={"doctors"} />

          {/* Filtration Categories Slider */}
          <div className="filteration mt-8 overflow-x-auto scrollbar-none pb-2">
            <ul className="flex items-center gap-3 w-max sm:w-full sm:justify-center">
              {doctorTypes.map((doc) => (
                <li
                  key={doc.id}
                  onClick={() => setSelectedDoctor(doc.name)}
                  className={`cursor-pointer px-5 py-2 rounded-full font-bold text-xs transition-all border whitespace-nowrap select-none active:scale-95
                ${
                  selectedDoctor === doc.name
                    ? "bg-[#446C4F] text-white border-[#446C4F] dark:bg-[#528B63] dark:border-[#528B63]"
                    : "bg-white dark:bg-[#232925] text-[#3E4E36] dark:text-[#E2E8F0] border-gray-200 dark:border-[#2C3530] hover:border-[#446C4F] dark:hover:border-[#528B63]"
                }`}
                >
                  {doc.name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="container mx-auto px-4 lg:px-7 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {doctors?.map((doc) => (
              <Link
                key={doc.id}
                to={`/ask-consultation/${doc.id}`}
                className="group"
              >
                <div className="consult-content flex flex-col items-center text-center shadow-sm bg-white dark:bg-[#232925] border border-gray-100 dark:border-[#2C3530] rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md relative">
                  {/* Avatar */}
                  <div className="w-16 h-16 rounded-2xl bg-[#E8F3EE] dark:bg-[#2C3530] flex items-center justify-center text-[#446C4F] dark:text-[#528B63] font-black text-xl uppercase border border-[#94C973]/20 dark:border-green-900/10 shadow-inner group-hover:scale-105 transition-transform duration-300">
                    {doc?.firstName?.charAt(0)}
                    {doc?.lastName?.charAt(0)}
                  </div>

                  {/* Doctor Name */}
                  <h4 className="text-base font-bold text-[#3E4E36] dark:text-[#E2E8F0] mt-4 group-hover:text-[#446C4F] dark:group-hover:text-[#528B63] transition-colors">
                    Dr. {doc.firstName} {doc.lastName}
                  </h4>

                  {/* Specialty */}
                  <p className="text-xs font-bold text-[#446C4F] dark:text-[#528B63] mt-0.5">
                    {doc.specialty}
                  </p>

                  {/* Rating Stars */}
                  <div className="flex justify-center items-center gap-0.5 mt-3">
                    {Array.from({ length: 5 }).map((_, index) =>
                      index < doc.rating ? (
                        <FaStar
                          key={index}
                          className="text-amber-400 text-xs"
                        />
                      ) : (
                        <FaRegStar
                          key={index}
                          className="text-amber-400 text-xs"
                        />
                      ),
                    )}
                  </div>

                  {/* Rate Count Info */}
                  <p className="text-[#94A3B8] dark:text-zinc-500 text-xs mt-1.5 font-medium">
                    ({doc.rateCount} reviews) •{" "}
                    <span className="font-bold text-[#3E4E36] dark:text-[#E2E8F0]">
                      {doc.rating}
                    </span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
