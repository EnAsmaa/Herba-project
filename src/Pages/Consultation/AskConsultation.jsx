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
        <div className="min-h-screen bg-gray-50 dark:bg-[#0f172a] p-6">
            <div className="max-w-3xl mx-auto space-y-6">

                {/* Doctor Card */}
                <div className="bg-white dark:bg-[#1e293b] shadow-lg rounded-2xl p-6 border border-gray-100 dark:border-slate-700">
                    <div className="flex items-center gap-4">

                        {/* Avatar */}
                        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-xl uppercase">
                            {doctor?.firstName?.charAt(0)}
                            {doctor?.lastName?.charAt(0)}
                        </div>

                        {/* Info */}
                        <div>
                            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                                Dr {doctor?.firstName + ' ' + doctor?.lastName}
                            </h2>

                            <p className="text-gray-500">{doctor?.specialty}</p>

                            <p className="text-sm text-gray-400">
                                {doctor?.email}
                            </p>

                            {/* Rating */}
                            <div className="flex gap-1 mt-2">
                                {Array.from({ length: 5 }).map((_, i) =>
                                    i < doctor?.rating ? (
                                        <FaStar key={i} className="text-yellow-400" />
                                    ) : (
                                        <FaRegStar key={i} className="text-yellow-400" />
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Ask Question */}
                <div className="bg-white dark:bg-[#1e293b] shadow-lg rounded-2xl p-6 border border-gray-100 dark:border-slate-700">
                    <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">
                        Ask a Question
                    </h3>

                    <textarea
                        ref={question}
                        placeholder="Write your question..."
                        className="w-full p-3 border rounded-xl dark:bg-slate-800 dark:border-slate-600 dark:text-white outline-none focus:ring-2 focus:ring-green-500"
                        rows={4}
                    />

                    <button
                        onClick={() => { sendQuestion(question.current.value) }}
                        className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl transition"
                    >
                        Send Question
                    </button>
                </div>

            </div>
        </div>
    );
}