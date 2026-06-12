import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { getQuestionsAPI } from '../../Services/ConsultationServices'

export default function MyConsultations() {

    const [questions, setQuestions] = useState([])
    const [questionexpanded, setQuestionExpanded] = useState(null)
    const [replyExpanded, setReplyExpanded] = useState(null)
    const [shownConsultationslabel, setShownConsultationslabel] = useState('all')
    const [shownQuestions, setShownQuestions] = useState([])

    // get questions
    const getQuestions = async () => {
        try {
            const response = await getQuestionsAPI()
            if (response.success) {
                setQuestions(response.data)
            }
        } catch (err) {
            toast.error(err?.message)
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

   return (
    <>
      <div className="min-h-screen bg-gray-50 text-[#3E4E36] dark:bg-[#1A1F1C] dark:text-[#E2E8F0] py-10 px-4 md:px-8 font-sans transition-colors duration-200">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Page Header */}
          <div className="consult-head text-center space-y-4">
            <h1 className="text-2xl md:text-3xl font-black text-[#3E4E36] dark:text-[#E2E8F0] tracking-tight">
              My Consultations
            </h1>

            {/* Filter Buttons */}
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

          {/* Questions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {shownQuestions?.map((q) => (
              <div
                key={q.conId}
                className="bg-white dark:bg-[#232925] p-5 md:p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-[#2C3530] flex flex-col justify-between space-y-4 transition-all duration-300 hover:shadow-md"
              >
                {/* Header Row */}
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm md:text-base text-[#3E4E36] dark:text-[#E2E8F0]">
                      <span className="text-gray-400 dark:text-zinc-500 font-normal">From:</span> {q.userName}
                    </h3>
                    <h6 className="text-xs md:text-sm font-bold text-[#446C4F] dark:text-[#528B63]">
                      <span className="text-gray-400 dark:text-zinc-500 font-normal">To:</span> Dr. {q.doctorName}
                    </h6>
                    <p className="text-[11px] text-gray-400 dark:text-zinc-500 font-medium">
                      {new Date(q.date).toLocaleString()}
                    </p>
                  </div>

                  {/* Dynamic Status Badge */}
                  <span className={`px-2.5 py-1 rounded-lg font-bold text-[10px] uppercase tracking-wider shrink-0 border
                    ${q.reply !== null 
                      ? 'bg-green-50/60 dark:bg-green-950/20 text-green-700 dark:text-green-400 border-green-100 dark:border-green-900/20' 
                      : 'bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400 border-amber-100 dark:border-amber-900/20'}`}
                  >
                    {q.reply !== null ? 'Answered' : 'Pending'}
                  </span>
                </div>

                {/* Question Block */}
                <div className="bg-gray-50/60 dark:bg-[#1A1F1C] border border-gray-100 dark:border-[#2C3530]/40 rounded-xl p-4">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-zinc-500 mb-1">
                    Question
                  </p>
                  <p 
                    onClick={() => setQuestionExpanded(q.conId === questionexpanded ? null : q.conId)} 
                    className={`text-xs md:text-sm text-[#3E4E36]/90 dark:text-[#E2E8F0]/90 leading-relaxed transition-all
                      ${q.conId === questionexpanded ? 'whitespace-pre-wrap break-all' : 'truncate cursor-pointer hover:text-[#446C4F] dark:hover:text-[#528B63]'}`}
                  >
                    {q.message}
                  </p>
                </div>

                {/* Reply Block (Renders conditionally if answer exists) */}
                {q.reply && (
                  <div className="bg-green-50/30 dark:bg-[#446C4F]/5 border border-green-100/40 dark:border-[#528B63]/10 rounded-xl p-4 animate-in fade-in duration-200">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#446C4F] dark:text-[#528B63] mb-1">
                      Doctor's Response
                    </p>
                    <p 
                      onClick={() => setReplyExpanded(q.conId === replyExpanded ? null : q.conId)} 
                      className={`text-xs md:text-sm text-[#3E4E36]/90 dark:text-[#E2E8F0]/90 leading-relaxed transition-all
                        ${q.conId === replyExpanded ? 'whitespace-pre-wrap break-all' : 'truncate cursor-pointer hover:text-[#446C4F] dark:hover:text-[#528B63]'}`}
                    >
                      {q.reply}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
