import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function MyConsultations() {

    const [token, setToken] = useState(localStorage.getItem("loginToken") || null)
    const [questions, setQuestions] = useState([])

    // get questions
    const getQuestions = async () => {
        try {
            const { data } = await axios.get('http://herbs.runasp.net/api/Consultation/my-consultations', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (data.success) {
                setQuestions(data.data)
                console.log(data.data)
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getQuestions()
    }, [])

    return <>
        {/* page header */}
        <div className="consult-head my-10 text-center">
            <h2 className="mb-1 font-bold text-4xl dark:text-[#E9EDEF]">
                My Consultaion
            </h2>

        </div>
        {/* Questions List */}
        <div className="grid grid-cols-6 gap-5 px-10">
            {questions?.map((q, index) => (
                <div
                    key={q.conId}
                    className={`bg-white dark:bg-[#1e293b] p-5 rounded-2xl shadow border border-gray-100 dark:border-slate-700 md:col-span-3 col-span-6 ${index === 0 && 'col-span-6! md:col-span-4!'} ${index === 1 && 'col-span-6! md:col-span-2!'}`}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-3 relative">
                        <div className={`absolute top-1 right-2 px-2 py-1 rounded-md text-gray-50 ${q.reply !== null ? 'bg-green-700/70' : 'bg-red-600/70'}`}>
                            {q.reply !== null ? 'Answered' : 'not Answered'}
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800 dark:text-white">
                                from: {q.userName}
                            </h3>

                            <h6 className="text-green-800 dark:text-white text-sm">
                                to: Dr {q.doctorName}
                            </h6>

                            <p className="text-xs text-gray-500">
                                {new Date(q.date).toLocaleString()}
                            </p>
                        </div>
                    </div>

                    {/* Question */}
                    <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-4">
                        <p className="text-sm font-medium text-gray-500 mb-1">
                            Question
                        </p>

                        <p className="text-gray-700 dark:text-gray-200 truncate whitespace-nowrap overflow-hidden w-full">
                            {q.message}
                        </p>
                    </div>

                    {/* Reply */}
                    {q.reply &&
                        <div className="bg-green-400/10 dark:bg-zinc-500 rounded-xl p-4 mt-5">
                            <p className="text-sm font-medium text-green-900 mb-1">
                                Reply
                            </p>

                            <p className="text-gray-700 dark:text-gray-200 line-clamp-1">
                                {q.reply}
                            </p>
                        </div>
                    }
                </div>
            ))}
        </div>
    </>
}
