import React, { useEffect, useState } from "react";
import { MdOutlineAssignment } from "react-icons/md";
import { getAllQuizes } from "../Services/QuizeServices";

export default function QuizessStates({ onStartQuiz, completedQuizzes = [] }) {
  const [quizes, setQuizes] = useState([]);
  const [loading, setLoading] = useState(false);

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
      <h3 className="font-bold text-[#3E4E36] dark:text-[#E2E8F0] text-lg mb-2">
        Available Quizzes
      </h3>

      {quizes.length === 0 ? (
        <div className="text-center py-10 text-[#94A3B8] dark:text-zinc-500 border-2 border-dashed border-gray-200 dark:border-[#2C3530] rounded-2xl">
          No quizzes available at the moment.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quizes.map((quiz) => {
            const isCompleted = completedQuizzes.some(
              (cq) => cq.quizId === quiz.quizId || cq.quizId == quiz.quizId,
            );

            return (
              <div
                key={quiz.quizId}
                className={`p-5 rounded-2xl border flex flex-col justify-between gap-4 shadow-sm transition-all duration-200 ${
                  isCompleted
                    ? "bg-[#F5F7F3]/70 dark:bg-[#1A1F1C] border-gray-200 dark:border-[#2C3530] opacity-75"
                    : "bg-white dark:bg-[#232925] border-gray-100 dark:border-[#2C3530] hover:shadow-md"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${
                      isCompleted
                        ? "bg-gray-200 text-gray-400 dark:bg-[#2C3530] dark:text-zinc-500"
                        : "bg-[#E8F3EE] dark:bg-[#446C4F]/20 text-[#446C4F] dark:text-[#94C973]"
                    }`}
                  >
                    <MdOutlineAssignment />
                  </div>

                  <div className="space-y-2 flex-1">
                    <h4
                      className={`font-bold text-base capitalize tracking-wide line-clamp-1 ${
                        isCompleted
                          ? "text-[#94A3B8] dark:text-zinc-500 line-through"
                          : "text-[#3E4E36] dark:text-[#E2E8F0]"
                      }`}
                    >
                      {quiz.title}
                    </h4>
                    <div className="flex flex-wrap gap-2 items-center">
                      <span className="bg-gray-100 dark:bg-[#2C3530] dark:text-[#E2E8F0] text-[#3E4E36] px-3 py-0.5 rounded-full text-xs font-medium">
                        {quiz.questions?.length || 0} Questions
                      </span>
                      <span
                        className={`px-3 py-0.5 rounded-full text-xs font-semibold ${
                          isCompleted
                            ? "bg-gray-200/60 text-gray-500 dark:bg-[#2C3530] dark:text-zinc-400"
                            : "bg-[#E8F3EE] dark:bg-[#446C4F]/20 dark:text-[#94C973] text-[#446C4F]"
                        }`}
                      >
                        {quiz.totalPoints} Points
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-100 dark:border-[#2C3530]">
                  <button
                    disabled={isCompleted}
                    onClick={() => onStartQuiz(quiz.quizId)}
                    className={`px-6 py-2.5 w-full rounded-xl font-semibold text-sm transition-all text-center block ${
                      isCompleted
                        ? "bg-gray-200 dark:bg-[#2C3530] text-gray-400 dark:text-zinc-600 cursor-not-allowed select-none"
                        : "bg-[#446C4F] dark:bg-[#528B63] text-white hover:opacity-90 cursor-pointer"
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
