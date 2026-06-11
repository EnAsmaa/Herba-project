import React, { useEffect, useState } from "react";
import { MdOutlineAssignment } from "react-icons/md"; 
import { getAllQuizes } from "../Services/QuizeServices";

export default function QuizessStates({ onStartQuiz, completedQuizzes = [] }) {
  const [quizes, setQuizes] = useState([]);
  const [loading, setLoading] = useState(false);

  // جلب الكويزات المتاحة من الـ API
  const getQuizes = async () => {
    setLoading(true);
    try {
      const res = await getAllQuizes();
      if (res && res.success) {
        setQuizes(res.data || []);
        
      }
    } catch (err) {
      console.error("Failed to load quizzes:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getQuizes();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-12 text-gray-400 dark:text-gray-200 font-medium animate-pulse">
        Loading available quizzes...
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="font-bold text-gray-800 dark:text-gray-200 text-lg mb-2">Available Quizzes</h3>
      
      {quizes.length === 0 ? (
        <div className="text-center py-10 text-gray-400 dark:text-gray-200 border-2 border-dashed border-gray-200 rounded-2xl">
          No quizzes available at the moment.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quizes.map((quiz) => {
            // الفحص الذهبي: التحقق إذا كان الـ quizId الخاص بهذا الكارت موجود في قائمة المكتملين
            const isCompleted = completedQuizzes.some(
              (cq) => cq.quizId === quiz.quizId || cq.quizId == quiz.quizId
            );

            return (
              <div 
                key={quiz.quizId} 
                className={`p-5 rounded-2xl border flex flex-col justify-between gap-4 shadow-sm transition-all duration-200 ${
                  isCompleted 
                    ? "bg-gray-50/70 dark:bg-zinc-800/20 border-gray-200 dark:border-zinc-800 opacity-75" 
                    : "bg-white dark:bg-gray-800/10 border-gray-100 dark:border-gray-700 hover:shadow-md"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${
                    isCompleted 
                      ? "bg-gray-200 text-gray-400 dark:bg-zinc-700/50 dark:text-zinc-500" 
                      : "bg-[#E8EFEA] dark:bg-gray-600/30 text-[#4E7355] dark:text-[#64bb74]"
                  }`}>
                    <MdOutlineAssignment />
                  </div>
                  
                  <div className="space-y-2 flex-1">
                    <h4 className={`font-bold text-base capitalize tracking-wide line-clamp-1 ${
                      isCompleted ? "text-gray-450 dark:text-gray-500 line-through" : "text-gray-880 dark:text-gray-200"
                    }`}>
                      {quiz.title}
                    </h4>
                    <div className="flex flex-wrap gap-2 items-center">
                      <span className="bg-gray-100 dark:bg-gray-600/30 dark:text-gray-50 text-gray-600 px-3 py-0.5 rounded-full text-xs font-medium">
                        {quiz.questions?.length || 0} Questions
                      </span>
                      <span className={`px-3 py-0.5 rounded-full text-xs font-semibold ${
                        isCompleted 
                          ? "bg-gray-200/60 text-gray-500 dark:bg-zinc-700/40 dark:text-zinc-400" 
                          : "bg-emerald-50 dark:bg-[#64bb744d] dark:text-emerald-50 text-[#4E7355]"
                      }`}>
                        {quiz.totalPoints} Points
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* قسم الزر السفلي مع التعطيل التلقائي والديناميكي */}
                <div className="pt-2 border-t border-gray-55 dark:border-gray-700">
                  <button 
                    disabled={isCompleted} // تعطيل الضغط ومنع فتح الكويز نهائياً
                    onClick={() => onStartQuiz(quiz.quizId)}
                    className={`px-6 py-2.5 w-full rounded-xl font-semibold text-sm transition-all text-center block ${
                      isCompleted
                        ? "bg-gray-200 dark:bg-zinc-800 text-gray-400 dark:text-zinc-600 cursor-not-allowed select-none"
                        : "bg-[#4E7355] dark:bg-[#64bb74] text-white hover:bg-[#3d5a42] dark:hover:bg-[#52a362] cursor-pointer"
                    }`}
                  >
                    {isCompleted ? "✓ Completed" : "Start Quiz"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}