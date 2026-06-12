import React, { useEffect, useState } from "react";
import { getQuizById, submitQuizAnswers } from "../Services/QuizeServices";
import toast from "react-hot-toast";

export default function QuizPlay({ quizId, onExit }) {
  const [questions, setQuestions] = useState([]);
  const [quizTitle, setQuizTitle] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizDetails = async () => {
      try {
        setLoading(true);
        const res = await getQuizById(quizId);
        let currentQuiz = null;

        if (Array.isArray(res?.data)) {
          currentQuiz = res.data.find((q) => q.quizId == quizId);
        } else if (res?.data && res.data.quizId == quizId) {
          currentQuiz = res.data;
        }

        if (currentQuiz) {
          setQuizTitle(currentQuiz.title);
          setQuestions(currentQuiz.questions || []);
        } else {
          toast.error("Quiz not found");
        }
      } catch (err) {
        toast.error("Failed to load quiz data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuizDetails();
  }, [quizId]);

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500 dark:text-emerald-400 font-medium animate-pulse">
        Loading Question...
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="text-center text-gray-600 dark:text-gray-200 py-10 font-medium">
        No questions available in this quiz.
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  const options = [
    { key: "A", text: currentQuestion?.optionA },
    { key: "B", text: currentQuestion?.optionB },
    { key: "C", text: currentQuestion?.optionC },
    { key: "D", text: currentQuestion?.optionD },
  ].filter((opt) => opt.text);

  const handleSelectAnswer = (questionId, optionKey) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: optionKey,
    });
  };

  const handleNext = async () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setSubmitting(true);

      const formattedAnswers = Object.keys(selectedAnswers).map((qId) => ({
        questionId: parseInt(qId),
        selectedAnswer: selectedAnswers[qId],
      }));

      try {
        const result = await submitQuizAnswers(quizId, {
          answers: formattedAnswers,
        });

        const earnedPoints = result?.data?.score || 0;

        toast.success(
          `Successfully Submitted! 🎉 You earned ${earnedPoints} points!`,
        );

        if (onExit) {
          onExit({
            quizId: quizId,
            answers: formattedAnswers,
            score: earnedPoints,
          });
        }
      } catch (err) {
        toast.error("Failed to submit answers. Please check your data.");
        console.error("Submission error details:", err);
      } finally {
        setSubmitting(false);
      }
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-[#232925] rounded-2xl shadow-sm border border-gray-100 dark:border-[#2C3530] max-w-4xl mx-auto transition-colors duration-200">
      {/* Header */}
      <div className="flex justify-between items-center mb-12">
        <button
          onClick={() => onExit && onExit(null)}
          className="text-gray-400 hover:text-[#446C4F] dark:hover:text-[#94C973] font-medium flex items-center gap-1 cursor-pointer transition-colors"
        >
          ← Exit
        </button>
        <div className="text-center hidden sm:block">
          <h2 className="font-bold text-[#94A3B8] dark:text-zinc-500 text-sm uppercase tracking-wider">
            {quizTitle}
          </h2>
        </div>
        <span className="bg-[#E8F3EE] text-[#446C4F] dark:bg-[#446C4F]/20 dark:text-[#94C973] px-4 py-1 rounded-full text-sm font-semibold">
          Question {currentIndex + 1}/{questions.length}
        </span>
      </div>

      <h2 className="text-2xl font-bold text-center text-[#3E4E36] dark:text-[#E2E8F0] mb-12 leading-snug max-w-2xl mx-auto">
        {currentQuestion?.text}
      </h2>

      {/* Dynamic Answers Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
        {options.map((option) => {
          const isSelected =
            selectedAnswers[currentQuestion?.questionId] === option.key;
          return (
            <button
              key={option.key}
              onClick={() =>
                handleSelectAnswer(currentQuestion.questionId, option.key)
              }
              className={`p-5 rounded-xl border text-center font-semibold transition-all cursor-pointer ${
                isSelected
                  ? "bg-[#446C4F] border-[#446C4F] text-white shadow-md scale-[1.01]"
                  : "bg-[#F5F7F3] dark:bg-[#1A1F1C] border-gray-200 dark:border-[#2C3530] text-[#3E4E36] dark:text-[#E2E8F0] hover:border-[#446C4F] dark:hover:border-[#528B63] hover:bg-white dark:hover:bg-[#232925]"
              }`}
            >
              {option.text}
            </button>
          );
        })}
      </div>

      {/* Progress Bar & Next Button */}
      <div className="space-y-4">
        <div className="w-full h-1.5 bg-[#E8F3EE] dark:bg-[#1A1F1C] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#446C4F] dark:bg-[#528B63] transition-all duration-300"
            style={{
              width: `${((currentIndex + 1) / questions.length) * 100}%`,
            }}
          ></div>
        </div>

        <div className="flex justify-end">
          <button
            disabled={
              !selectedAnswers[currentQuestion?.questionId] || submitting
            }
            onClick={handleNext}
            className={`px-8 py-3 rounded-xl font-bold text-white transition-all ${
              selectedAnswers[currentQuestion?.questionId] && !submitting
                ? "bg-[#446C4F] hover:bg-[#3E4E36] cursor-pointer shadow-md"
                : "bg-gray-300 dark:bg-[#2C3530] text-gray-500 dark:text-zinc-500 cursor-not-allowed"
            }`}
          >
            {currentIndex === questions.length - 1
              ? submitting
                ? "Submitting..."
                : "Submit Quiz"
              : "Next Question →"}
          </button>
        </div>
      </div>
    </div>
  );
}
