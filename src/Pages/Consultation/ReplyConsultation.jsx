import axios from "axios";
import React, { useEffect, useState } from "react";

export default function ReplyConsultation() {
    const [token] = useState(localStorage.getItem("loginToken") || null);
    const [consultations, setConsultations] = useState([]);
    const [replies, setReplies] = useState({});
    const [questionexpanded, setQuestionExpanded] = useState(null)
    const [replyExpanded, setReplyExpanded] = useState(null)
    const [shownConsultationslabel, setShownConsultationslabel] = useState('all')
    const [shownConsultations, setShownConsultations] = useState([])


    // get doctor consultations
    const getConsultations = async () => {
        try {
            const { data } = await axios.get(
                "https://herbs.runasp.net/api/Consultation/my-consultations",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (data.success) {
                setConsultations(data.data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getConsultations();
    }, []);

    useEffect(() => {
        if (shownConsultationslabel === 'notAnswered') {
            setShownConsultations(consultations.filter(c => c.reply === null));
        }
        else if (shownConsultationslabel === 'Answered') {
            setShownConsultations(consultations.filter(c => c.reply !== null));
        }
        else {
            setShownConsultations(consultations);
        }
    }, [shownConsultationslabel, consultations]);

    // send reply
    const replyQuestion = async (conId) => {
        try {
            const { data } = await axios.post(
                "https://herbs.runasp.net/api/Consultation/reply",
                {
                    conId,
                    reply: replies[conId], // fixed field name
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (data.success) {
                await getConsultations();

                setReplies((prev) => ({
                    ...prev,
                    [conId]: "",
                }));
            }
        } catch (err) {
            console.log(err.response?.data || err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0f172a] p-6">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-4xl font-bold text-center mt-8 mb-10 text-green-700 dark:text-green-400">
                    Patient Consultations
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

                <div className="space-y-6">
                    {shownConsultations?.map((consultation) => {
                        const isUnread = !consultation.reply;
                        return (
                            <div
                                key={consultation.conId}
                                className={`rounded-2xl shadow-lg p-6 border transition-all duration-300
                                ${isUnread
                                        ? "bg-red-50 border-red-300 dark:bg-red-950"
                                        : "bg-white dark:bg-[#1e293b] border-gray-100 dark:border-slate-700"
                                    }`}
                            >
                                {/* Header */}
                                <div className="flex items-center gap-3 mb-4">
                                    {isUnread && (
                                        <span className="px-3 py-1 text-xs font-bold bg-red-500 text-white rounded-full">
                                            NEW
                                        </span>
                                    )}

                                    <div className="w-12 h-12 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-lg">
                                        {consultation.userName
                                            .charAt(0)
                                            .toUpperCase() +
                                            consultation.userName
                                                .charAt(1)
                                                .toLowerCase()}
                                    </div>

                                    <div>
                                        <h2 className="font-semibold text-lg text-gray-800 dark:text-white">
                                            {consultation.userName}
                                        </h2>
                                        <p className="text-sm text-gray-500">
                                            Patient Consultation
                                        </p>
                                    </div>
                                </div>

                                {/* Question */}
                                <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-4 mb-4">
                                    <p className="font-medium text-gray-700 dark:text-gray-200">
                                        Question:
                                    </p>

                                    <p onClick={() => { setQuestionExpanded(consultation.conId === questionexpanded ? null : consultation.conId) }} className={`mt-2 text-gray-600 dark:text-gray-300 w-full! ${consultation.conId === questionexpanded ? 'whitespace-pre-wrap break-all' : 'truncate cursor-pointer'}`}>
                                        {consultation.message}
                                    </p>
                                </div>

                                {/* Reply if exists */}
                                {consultation.reply && (
                                    <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-4 mb-4">
                                        <p className="font-semibold text-green-700">
                                            Doctor Reply
                                        </p>

                                        <p onClick={() => { setReplyExpanded(consultation.conId === replyExpanded ? null : consultation.conId) }} className={`text-green-800 mt-1 w-full! ${consultation.conId === replyExpanded ? 'whitespace-pre-wrap break-all' : 'truncate cursor-pointer'}`}>
                                            {consultation.reply}
                                        </p>
                                    </div>
                                )}

                                {/* Reply input */}
                                <textarea
                                    value={
                                        replies[consultation.conId] || ""
                                    }
                                    onChange={(e) =>
                                        setReplies({
                                            ...replies,
                                            [consultation.conId]:
                                                e.target.value,
                                        })
                                    }
                                    placeholder="Write your reply..."
                                    className="w-full border border-gray-300 dark:border-slate-600 rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-500 dark:bg-slate-800 dark:text-white resize-none"
                                    rows="4"
                                />

                                <button
                                    onClick={() =>
                                        replyQuestion(consultation.conId)
                                    }
                                    className="mt-4 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition"
                                >
                                    Send Reply
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}