import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getQuestionsAPI, sendReplyAPI } from "../../Services/ConsultationServices";

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
            const response = await getQuestionsAPI()
            if (response.success) {
                setConsultations(response.data)
            }
        } catch (err) {
            toast.error(err?.message)
        }
    }

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
    const sendReply = async (conId) => {
        try {
            const response = await sendReplyAPI(conId, replies)
            if (response.success) {
                await getConsultations();

                setReplies((prev) => ({
                    ...prev,
                    [conId]: "",
                }));
            }
        } catch (err) {
            toast.error(err?.message)
        }
    }


return(
    <div className="min-h-screen bg-[#F5F7F3] dark:bg-[#1A1F1C] p-6 transition-colors duration-300">
  <div className="max-w-5xl mx-auto">
    <h1 className="text-4xl font-bold text-center mt-8 mb-10 text-[#446C4F] dark:text-[#528B63]">
      Patient Consultations
    </h1>

    {/* FILTER BUTTONS */}
    <div className="flex justify-center mb-10 gap-4">
      {['all', 'notAnswered', 'Answered'].map((filter) => (
        <button
          key={filter}
          onClick={() => setShownConsultationslabel(filter)}
          className={`px-6 py-2 rounded-xl cursor-pointer font-medium transition-all ${
            shownConsultationslabel === filter 
              ? 'bg-[#446C4F] text-white shadow-md' 
              : 'bg-[#E8F3EE] dark:bg-[#232925] text-[#3E4E36] dark:text-[#94A3B8]'
          }`}
        >
          {filter.charAt(0).toUpperCase() + filter.slice(1).replace(/([A-Z])/g, ' $1')}
        </button>
      ))}
    </div>

    {/* CONSULTATION LIST */}
    <div className="space-y-6">
      {shownConsultations?.map((consultation) => {
        const isUnread = !consultation.reply;
        return (
          <div
            key={consultation.conId}
            className={`rounded-2xl shadow-sm p-6 border transition-all duration-300 ${
              isUnread
                ? "bg-[#E8F3EE]/50 border-[#94C973] dark:bg-[#232925] dark:border-[#528B63]"
                : "bg-white dark:bg-[#232925] border-gray-100 dark:border-[#2C3530]"
            }`}
          >
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-[#E8F3EE] dark:bg-[#2C3530] text-[#446C4F] dark:text-[#528B63] flex items-center justify-center font-bold text-lg">
                {consultation.userName.slice(0, 2).toUpperCase()}
              </div>
              <div className="flex-1">
                <h2 className="font-bold text-lg text-[#3E4E36] dark:text-[#E2E8F0]">
                  {consultation.userName}
                </h2>
                <p className="text-sm text-gray-500 dark:text-[#94A3B8]">Patient Consultation</p>
              </div>
              {isUnread && (
                <span className="px-3 py-1 text-xs font-bold bg-[#446C4F] text-white rounded-full">
                  NEW
                </span>
              )}
            </div>

            {/* Question */}
            <div className="bg-[#F5F7F3] dark:bg-[#1A1F1C] rounded-xl p-4 mb-4">
              <p className="font-bold text-[#446C4F] dark:text-[#94C973] text-sm mb-1 uppercase">Question:</p>
              <p 
                onClick={() => setQuestionExpanded(consultation.conId === questionexpanded ? null : consultation.conId)}
                className={`text-[#3E4E36] dark:text-[#E2E8F0] cursor-pointer ${consultation.conId === questionexpanded ? 'whitespace-pre-wrap' : 'truncate'}`}
              >
                {consultation.message}
              </p>
            </div>

            {/* Reply if exists */}
            {consultation.reply && (
              <div className="bg-[#E8F3EE] dark:bg-[#2C3530] border-l-4 border-[#446C4F] dark:border-[#528B63] rounded-r-lg p-4 mb-4">
                <p className="font-bold text-[#446C4F] dark:text-[#94C973] text-sm mb-1 uppercase">Doctor Reply</p>
                <p 
                  onClick={() => setReplyExpanded(consultation.conId === replyExpanded ? null : consultation.conId)}
                  className={`text-[#3E4E36] dark:text-[#E2E8F0] cursor-pointer ${consultation.conId === replyExpanded ? 'whitespace-pre-wrap' : 'truncate'}`}
                >
                  {consultation.reply}
                </p>
              </div>
            )}

            {/* Reply input */}
            <textarea
              value={replies[consultation.conId] || ""}
              onChange={(e) => setReplies({...replies, [consultation.conId]: e.target.value})}
              placeholder="Write your reply..."
              className="w-full border border-gray-200 dark:border-[#2C3530] rounded-xl p-3 outline-none focus:ring-2 focus:ring-[#446C4F] dark:bg-[#1A1F1C] dark:text-[#E2E8F0] resize-none"
              rows="4"
            />

            <button
              onClick={() => sendReply(consultation.conId)}
              className="mt-4 px-6 py-2 bg-[#446C4F] dark:bg-[#528B63] hover:opacity-90 text-white rounded-xl font-bold transition"
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