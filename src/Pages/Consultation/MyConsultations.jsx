import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function MyConsultations() {

    const [token, setToken] = useState(localStorage.getItem("loginToken") || null)
    const [questions, setQuestions] = useState([])
    const [questionexpanded, setQuestionExpanded] = useState(null)
    const [replyExpanded, setReplyExpanded] = useState(null)
    const [shownConsultationslabel, setShownConsultationslabel] = useState('all')
    const [shownQuestions, setShownQuestions] = useState([])

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
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getQuestions()
    }, [])

    useEffect(() => {
        if (shownConsultationslabel === 'notAnswered') {
            setShownQuestions(questions.filter(c => c.reply === null));
        }
        else if (shownConsultationslabel === 'Answered') {
            setShownQuestions(questions.filter(c => c.reply !== null));
        }
        else {
            setShownQuestions(questions);
        }
    }, [shownConsultationslabel, questions]);

    return <>
        {/* page header */}
        <div className="consult-head my-10 text-center">
            <h1 className="text-4xl font-bold text-center mt-8 mb-10 text-green-700 dark:text-green-400">
                My Consultations
            </h1>

            <div className="flex justify-center mb-6 gap-4">
                <button
                    onClick={() => setShownConsultationslabel('all')}
                    className={`px-4 py-2 rounded-lg cursor-pointer ${shownConsultationslabel === 'all' ? 'bg-green-800 text-white shadow-md' : 'dark:bg-[#0C1A1A] bg-green-800/10'}`}
                >
                    All Consultations
                </button>
                <button
                    onClick={() => setShownConsultationslabel('notAnswered')}
                    className={`px-4 py-2 rounded-lg cursor-pointer ${shownConsultationslabel === 'notAnswered' ? 'bg-green-800 text-white shadow-md' : 'dark:bg-[#0C1A1A] bg-green-800/10'}`}
                >
                    Not Answered
                </button>
                <button
                    onClick={() => setShownConsultationslabel('Answered')}
                    className={`px-4 py-2 rounded-lg cursor-pointer ${shownConsultationslabel === 'Answered' ? 'bg-green-800 text-white shadow-md' : 'dark:bg-[#0C1A1A] bg-green-800/10'}`}
                >
                    Answered
                </button>
            </div>

        </div>
        {/* Questions List */}
        <div className="grid grid-cols-6 gap-5 px-10">
            {shownQuestions?.map((q, index) => (
                <div
                    key={q.conId}
                    className={`bg-white dark:bg-[#1e293b] p-5 rounded-2xl shadow border border-gray-100 dark:border-slate-700 md:col-span-3 col-span-6 ${index === 0 && 'col-span-6! md:col-span-4!'} ${index === 1 && 'col-span-6! md:col-span-2!'}`}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-3 relative">
                        <div className={`absolute top-1 right-2 px-2 py-1 rounded-md ${q.reply !== null ? 'bg-green-700/20 text-green-900' : 'bg-red-600/20 text-red-900'}`}>
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
                        <p className={`text-sm font-medium text-gray-500 mb-1`}>
                            Question
                        </p>

                        <p onClick={() => { setQuestionExpanded(q.conId === questionexpanded ? null : q.conId) }} className={`text-gray-700 dark:text-gray-200 w-full! ${q.conId === questionexpanded ? 'whitespace-pre-wrap break-all' : 'truncate cursor-pointer'}`}>
                            {q.message}`
                        </p>
                    </div>

                    {/* Reply */}
                    {q.reply &&
                        <div className="bg-green-400/10 dark:bg-zinc-500 rounded-xl p-4 mt-5">
                            <p className="text-sm font-medium text-green-900 mb-1">
                                Reply
                            </p>

                            <p onClick={() => { setReplyExpanded(q.conId === replyExpanded ? null : q.conId) }} className={`text-gray-700 dark:text-gray-200 w-full! ${q.conId === replyExpanded ? 'whitespace-pre-wrap break-all' : 'truncate cursor-pointer'}`}>
                                {q.reply}
                            </p>
                        </div>
                    }
                </div>
            ))}
        </div>
    </>
}
