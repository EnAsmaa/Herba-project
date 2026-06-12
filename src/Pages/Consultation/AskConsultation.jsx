import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useParams } from "react-router-dom";

export default function AskConsultation() {

    const { id } = useParams()
    const [doctor, setDoctor] = useState(null)
    const [token, setToken] = useState(localStorage.getItem("loginToken") || null)
    const question = useRef(0)

    // get doctor data
    const getDoctorData = async () => {
        try {
            const { data } = await axios.get(`http://herbs.runasp.net/api/User/doctor/${id}`)
            if (data.success) {
                setDoctor(data.data)
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getDoctorData()
    }, [])

    // ask question
    const sendQuestion = async (message) => {
        try {
            const { data } = await axios.post('http://herbs.runasp.net/api/Consultation', {
                doctorId: id,
                message
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            console.log(data)

            if (data?.success) {
                console.log(data.data)
                question.current.value = ''
            }
        } catch (err) {
            console.log(err)
        }
    }


  return (
    <div className="min-h-screen bg-gray-50 text-[#3E4E36] dark:bg-[#1A1F1C] dark:text-[#E2E8F0] p-4 md:p-8 font-sans transition-colors duration-200">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Doctor Card */}
        <div className="bg-white dark:bg-[#232925] shadow-sm rounded-2xl p-6 border border-gray-100 dark:border-[#2C3530]">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">

            {/* Avatar */}
            <div className="w-20 h-20 rounded-2xl bg-green-50 dark:bg-green-950/20 flex items-center justify-center text-[#446C4F] dark:text-[#528B63] font-black text-2xl uppercase border border-green-100 dark:border-green-900/10 shrink-0 shadow-inner">
              {doctor?.firstName?.charAt(0)}
              {doctor?.lastName?.charAt(0)}
            </div>

            {/* Info */}
            <div className="flex-1">
              <h2 className="text-xl font-black text-[#3E4E36] dark:text-[#E2E8F0] tracking-tight">
                Dr. {doctor?.firstName} {doctor?.lastName}
              </h2>

              <p className="text-sm font-bold text-[#446C4F] dark:text-[#528B63] mt-0.5">
                {doctor?.specialty || "Phytotherapy Specialist"}
              </p>

              <p className="text-xs text-gray-400 dark:text-zinc-500 mt-1">
                {doctor?.email}
              </p>

              {/* Rating */}
              <div className="flex gap-1 mt-3 justify-center sm:justify-start">
                {Array.from({ length: 5 }).map((_, i) =>
                  i < (doctor?.rating || 5) ? (
                    <FaStar key={i} className="text-amber-400 text-sm" />
                  ) : (
                    <FaRegStar key={i} className="text-amber-400 text-sm" />
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Ask Question Card */}
        <div className="bg-white dark:bg-[#232925] shadow-sm rounded-2xl p-6 border border-gray-100 dark:border-[#2C3530]">
          <h3 className="text-base font-bold text-[#3E4E36] dark:text-[#E2E8F0] mb-4 flex items-center gap-2">
            <span className="w-1.5 h-4 bg-[#446C4F] dark:bg-[#528B63] rounded-full block"></span>
            Ask a Question
          </h3>

          <textarea
            ref={question}
            placeholder="Describe your symptoms or ask about specific herbal interactions..."
            className="w-full p-4 border border-gray-200 dark:border-[#2C3530] rounded-xl bg-gray-50 dark:bg-[#1A1F1C] text-sm text-[#3E4E36] dark:text-[#E2E8F0] placeholder-gray-400 dark:placeholder-zinc-500 outline-none focus:ring-1 focus:ring-[#446C4F] dark:focus:ring-[#528B63] transition-all resize-none leading-relaxed"
            rows={5}
          />

          <div className="flex justify-end mt-4">
            <button
              onClick={() => { if (question.current?.value) sendQuestion(question.current.value); }}
              className="w-full sm:w-auto bg-[#446C4F] dark:bg-[#528B63] hover:opacity-95 text-white px-8 py-2.5 rounded-xl font-bold text-sm shadow-sm transition-all active:scale-95 cursor-pointer"
            >
              Send Question
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}