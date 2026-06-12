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
                "http://herbs.runasp.net/api/Consultation/my-consultations",
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
                "http://herbs.runasp.net/api/Consultation/reply",
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
    <div className="min-h-screen bg-gray-50 text-[#3E4E36] dark:bg-[#1A1F1C] dark:text-[#E2E8F0] py-10 px-4 md:px-8 font-sans transition-colors duration-200">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Page Title */}
        <div className="text-center space-y-4">
          <h1 className="text-2xl md:text-3xl font-black text-[#3E4E36] dark:text-[#E2E8F0] tracking-tight">
            Patient Consultations
          </h1>

          {/* Filter Tab Buttons */}
          <div className="flex flex-wrap justify-center items-center gap-2 max-w-md mx-auto bg-gray-100 dark:bg-[#232925] p-1.5 rounded-xl border border-gray-200/50 dark:border-[#2C3530]/60">
            <button
              onClick={() => setShownConsultationslabel('all')}
              className={`flex-1 px-4 py-2 rounded-lg font-bold text-xs md:text-sm transition-all select-none cursor-pointer
                ${shownConsultationslabel === 'all' 
                  ? 'bg-[#446C4F] text-white shadow-sm dark:bg-[#528B63]' 
                  : 'text-[#3E4E36]/80 dark:text-[#94A3B8] hover:bg-gray-200/60 dark:hover:bg-[#1A1F1C]'}`}
            >
              All
            </button>
            <button
              onClick={() => setShownConsultationslabel('notAnswered')}
              className={`flex-1 px-4 py-2 rounded-lg font-bold text-xs md:text-sm transition-all select-none cursor-pointer
                ${shownConsultationslabel === 'notAnswered' 
                  ? 'bg-[#446C4F] text-white shadow-sm dark:bg-[#528B63]' 
                  : 'text-[#3E4E36]/80 dark:text-[#94A3B8] hover:bg-gray-200/60 dark:hover:bg-[#1A1F1C]'}`}
            >
              Pending
            </button>
            <button
              onClick={() => setShownConsultationslabel('Answered')}
              className={`flex-1 px-4 py-2 rounded-lg font-bold text-xs md:text-sm transition-all select-none cursor-pointer
                ${shownConsultationslabel === 'Answered' 
                  ? 'bg-[#446C4F] text-white shadow-sm dark:bg-[#528B63]' 
                  : 'text-[#3E4E36]/80 dark:text-[#94A3B8] hover:bg-gray-200/60 dark:hover:bg-[#1A1F1C]'}`}
            >
              Answered
            </button>
          </div>
        </div>

        {/* Consultations List */}
        <div className="space-y-6">
          {shownConsultations?.map((consultation) => {
            const isUnread = !consultation.reply;
            return (
              <div
                key={consultation.conId}
                className={`rounded-2xl p-6 border transition-all duration-300 shadow-sm flex flex-col space-y-4
                  ${isUnread
                    ? "bg-amber-50/40 border-amber-200/70 dark:bg-[#446C4F]/5 dark:border-[#528B63]/20"
                    : "bg-white border-gray-100 dark:bg-[#232925] dark:border-[#2C3530]"
                  }`}
              >
                {/* Header Profile Section */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    {/* Patient Initials Avatar */}
                    <div className="w-12 h-12 rounded-2xl bg-green-50 dark:bg-green-950/20 text-[#446C4F] dark:text-[#528B63] flex items-center justify-center font-black text-base border border-green-100 dark:border-green-900/10 shrink-0 shadow-inner">
                      {consultation.userName ? (
                        consultation.userName.charAt(0).toUpperCase() +
                        consultation.userName.charAt(1).toLowerCase()
                      ) : "PT"}
                    </div>

                    <div>
                      <h2 className="font-bold text-sm md:text-base text-[#3E4E36] dark:text-[#E2E8F0]">
                        {consultation.userName}
                      </h2>
                      <p className="text-xs text-gray-400 dark:text-zinc-500 font-medium">
                        Patient Inquiry
                      </p>
                    </div>
                  </div>

                  {/* Badge Label */}
                  {isUnread && (
                    <span className="px-2.5 py-1 text-[10px] font-black tracking-wider bg-amber-500 text-white rounded-lg shadow-sm animate-pulse">
                      NEW
                    </span>
                  )}
                </div>

                {/* Patient Question Text Block */}
                <div className="bg-gray-50/60 dark:bg-[#1A1F1C] border border-gray-100 dark:border-[#2C3530]/40 rounded-xl p-4">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-zinc-500 mb-1">
                    Patient Question
                  </p>
                  <p 
                    onClick={() => setQuestionExpanded(consultation.conId === questionexpanded ? null : consultation.conId)} 
                    className={`text-xs md:text-sm text-[#3E4E36]/90 dark:text-[#E2E8F0]/90 leading-relaxed transition-all
                      ${consultation.conId === questionexpanded ? 'whitespace-pre-wrap break-all' : 'truncate cursor-pointer hover:text-[#446C4F] dark:hover:text-[#528B63]'}`}
                  >
                    {consultation.message}
                  </p>
                </div>

                {/* Previous Doctor Reply Block (If exists) */}
                {consultation.reply && (
                  <div className="bg-green-50/30 dark:bg-[#446C4F]/5 border border-green-100/40 dark:border-[#528B63]/10 rounded-xl p-4">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#446C4F] dark:text-[#528B63] mb-1">
                      Your Sent Response
                    </p>
                    <p 
                      onClick={() => setReplyExpanded(consultation.conId === replyExpanded ? null : consultation.conId)} 
                      className={`text-xs md:text-sm text-[#3E4E36]/90 dark:text-[#E2E8F0]/90 leading-relaxed transition-all
                        ${consultation.conId === replyExpanded ? 'whitespace-pre-wrap break-all' : 'truncate cursor-pointer hover:text-[#446C4F] dark:hover:text-[#528B63]'}`}
                    >
                      {consultation.reply}
                    </p>
                  </div>
                )}

                {/* Reply Form Layout */}
                <div className="pt-2 space-y-3">
                  <textarea
                    value={replies[consultation.conId] || ""}
                    onChange={(e) =>
                      setReplies({
                        ...replies,
                        [consultation.conId]: e.target.value,
                      })
                    }
                    placeholder="Write medical advice or herb prescription details..."
                    className="w-full p-4 border border-gray-200 dark:border-[#2C3530] rounded-xl bg-gray-50 dark:bg-[#1A1F1C] text-xs md:text-sm text-[#3E4E36] dark:text-[#E2E8F0] placeholder-gray-400 dark:placeholder-zinc-500 outline-none focus:ring-1 focus:ring-[#446C4F] dark:focus:ring-[#528B63] transition-all resize-none leading-relaxed"
                    rows="4"
                  />

                  <div className="flex justify-end">
                    <button
                      onClick={() => replyQuestion(consultation.conId)}
                      className="w-full sm:w-auto bg-[#446C4F] dark:bg-[#528B63] hover:opacity-95 text-white px-8 py-2.5 rounded-xl font-bold text-sm shadow-sm transition-all active:scale-95 cursor-pointer"
                    >
                      Send Reply
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}