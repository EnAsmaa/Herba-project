import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import ProgressStates from "./ProgressStates";
import QuizessStates from "./QuizessStates";
import QuizPlay from "./AnswerQuize";
import { getMyQuizResults } from "../Services/QuizeServices";
import { getAllExercise, getMyExercise, postExercise } from "../Services/ExerciseServices";
import toast from "react-hot-toast";

const ActivityPage = () => {
  const [activeTab, setActiveTab] = useState("Weekly Progress");
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [value, setValue] = useState(dayjs());

  const [activeQuizId, setActiveQuizId] = useState(null);
  const [completedQuizzesList, setCompletedQuizzesList] = useState([]);
  const [loadingStats, setLoadingStats] = useState(true);

  const [exercisesList, setExercisesList] = useState([]);
  const [completedExercisesList, setCompletedExercisesList] = useState([]);
  const [loadingExercises, setLoadingExercises] = useState(true);
  const [submittingExercise, setSubmittingExercise] = useState(false);

  const [instantPoints, setInstantPoints] = useState(0);

  const TOTAL_QUIZZES_COUNT = 10;
  const MAX_POINTS_PER_QUIZ = 10; 
  const MAX_POSSIBLE_POINTS = TOTAL_QUIZZES_COUNT * MAX_POINTS_PER_QUIZ;

  const fetchQuizStats = async () => {
    try {
      setLoadingStats(true);
      const res = await getMyQuizResults();
      let list = [];
      if (res?.data?.success && Array.isArray(res?.data?.data)) {
        list = res.data.data;
      } else if (res?.data && Array.isArray(res.data)) {
        list = res.data;
      } else if (Array.isArray(res)) {
        list = res;
      }
      setCompletedQuizzesList(list);
    } catch (err) {
      console.error("Failed to fetch quiz statistics:", err);
    } finally {
      setLoadingStats(false);
    }
  };

  const fetchExerciseStats = async () => {
    try {
      setLoadingExercises(true);
      const allRes = await getAllExercise();
      const allData = allRes?.data || allRes || [];
      setExercisesList(Array.isArray(allData) ? allData : []);

      const myRes = await getMyExercise();
      const myData = myRes?.data || myRes || [];
      console.log(completedExercisesList);
      
      setCompletedExercisesList(Array.isArray(myData) ? myData : []);
    } catch (err) {
      console.error("Failed to fetch exercises:", err);
    } finally {
      setLoadingExercises(false);
    }
  };

  useEffect(() => {
    fetchQuizStats();
    fetchExerciseStats();
  }, []);

  useEffect(() => {
    if (completedQuizzesList.length > 0) {
      const totalPointsCalculated = completedQuizzesList.reduce((acc, current) => {
        const score = current.score !== undefined ? Number(current.score) : 10;
        return acc + (isNaN(score) ? 10 : score);
      }, 0);
      setInstantPoints(totalPointsCalculated);
    } else {
      setInstantPoints(0);
    }
  }, [completedQuizzesList]);

  const handleQuizStatsUpdate = (quizSummaryData) => {
    setActiveQuizId(null);
    fetchQuizStats(); 

    if (quizSummaryData && quizSummaryData.score !== undefined) {
      const quizScore = Number(quizSummaryData.score);
      if (!isNaN(quizScore)) {
        setInstantPoints((prev) => prev + quizScore);
        toast.success(`Wallet updated! +${quizScore} points earned.`);
      }
    }
  };

  const handleCompleteExercise = async (exerciseId) => {
    try {
      setSubmittingExercise(true);
      await postExercise({ exerciseId: exerciseId });
      toast.success("Exercise progress saved successfully! 🎉");
      setSelectedExercise(null);
      fetchExerciseStats(); 
    } catch (err) {
      toast.error("Failed to save exercise progress.");
      console.error(err);
    } finally {
      setSubmittingExercise(false);
    }
  };

  const totalEarnedPoints = Number(instantPoints) || 0;

  const growthRatePercentage = MAX_POSSIBLE_POINTS > 0
    ? Math.min(Math.round((totalEarnedPoints / MAX_POSSIBLE_POINTS) * 100), 100)
    : 0;

  return (
    <div className="min-h-screen p-6 lg:p-10 font-sans text-slate-800 dark:text-zinc-100 bg-transparent">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT SIDEBAR: General Info */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white dark:bg-[#122416] p-6 rounded-xl shadow-sm border border-gray-100 dark:border-green-900/30">
            <h2 className="text-[#4E7355] dark:text-[#64bb74] font-bold text-xl mb-6">
              General Info
            </h2>
            <div className="space-y-4 text-gray-500 dark:text-gray-300 text-sm">

              <div className="flex justify-between items-center">
                <span>Quizzes Completed</span>
                <span className="font-bold text-[#4E7355] dark:text-[#76db89]">
                  {loadingStats ? "..." : String(completedQuizzesList.length)}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span>Exercises Completed</span>
                <span className="font-bold text-[#4E7355] dark:text-[#76db89]">
                  {loadingExercises ? "..." : String(completedExercisesList.length)}
                </span>
              </div>
            
              <div className="flex justify-between items-center">
                <span>Growth Rate</span>
                <span className="font-bold text-[#4E7355] dark:text-[#76db89]">
                  {loadingStats ? "..." : `+${growthRatePercentage}%`}
                </span>
              </div>

              <div className="flex justify-between items-center border-t border-gray-100 dark:border-zinc-800 pt-4">
                <span>Points Earned</span>
                <span className="font-bold text-amber-600 dark:text-amber-400">
                  {loadingStats ? "..." : totalEarnedPoints.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* MUI Calendar */}
          <div className="w-full bg-white dark:bg-[#122416] text-black border-gray-100 dark:text-gray-200 rounded-xl border dark:border-green-900/30 overflow-hidden">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateCalendar"]}>
                <DemoItem>
                  <DateCalendar
                    value={value}
                    onChange={(newValue) => setValue(newValue)}
                    sx={{
                      width: "100%",
                      "& .MuiPickersCalendarHeader-label": { color: "inherit" },
                      "& .MuiIconButton-root": { color: "inherit" },
                      "& .MuiDayCalendar-weekDayLabel": { color: "inherit", opacity: 0.6 },
                      "& .MuiPickersDay-root": { color: "inherit" },
                      "& .MuiPickersDay-root.Mui-selected": { backgroundColor: "#4E7355", color: "white !important" },
                    }}
                  />
                </DemoItem>
              </DemoContainer>
            </LocalizationProvider>
          </div>
        </div>

        {/* MAIN PANEL */}
        <div className="lg:col-span-9 bg-white dark:bg-[#122416] dark:border-green-900/30 rounded-xl p-8 shadow-sm border border-gray-100 min-h-[600px]">
          
          <div className="flex flex-wrap justify-center gap-4 mb-10 border-b border-gray-100 dark:border-zinc-800 pb-6">
            {["Weekly Progress", "Quizzes", "Exercises"].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setSelectedExercise(null);
                  setActiveQuizId(null);
                }}
                className={`px-6 py-2 cursor-pointer rounded-xl font-semibold transition-all ${
                  activeTab === tab
                    ? "bg-[#4E7355] text-white dark:bg-[#64bb74] shadow-lg translate-y-[-2px]"
                    : "bg-[#F3F5F4] text-gray-400 dark:bg-gray-800/60 dark:text-zinc-300 hover:bg-gray-200 dark:hover:bg-zinc-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="transition-all duration-300">
            
            {activeTab === "Weekly Progress" && (
              <div className="flex flex-col items-center justify-center py-16 animate-in fade-in slide-in-from-bottom-4">
                <ProgressStates completedCount={completedQuizzesList.length} totalQuizzes={TOTAL_QUIZZES_COUNT} />
                <h4 className="text-xl font-bold text-slate-700 dark:text-zinc-300 mt-4">
                  Great job! Keep up the good work.
                </h4>
              </div>
            )}

            {activeTab === "Exercises" && !selectedExercise && (
              loadingExercises ? (
                <div className="flex justify-center items-center h-[300px]">
                  <span className="inline-block w-8 h-8 border-4 border-[#4E7355] border-t-transparent rounded-full animate-spin"></span>
                </div>
              ) : exercisesList.length === 0 ? (
                <div className="text-center text-gray-500 py-12">No exercises available at the moment.</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in zoom-in-95">
                  {exercisesList.map((ex) => {
                    const isCompleted = completedExercisesList.some(
                      (c) => Number(c.exerciseId) === Number(ex.exerciseId) || Number(c.id) === Number(ex.exerciseId)
                    );

                    return (
                      <div key={ex.exerciseId} className="bg-white dark:bg-zinc-900/40 border-2 border-gray-50 dark:border-zinc-800 rounded-xl overflow-hidden flex flex-col hover:shadow-xl transition-shadow group">
                        <div className="relative h-48 overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                          <img 
                            src={ex.gifUrl || "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=400"} 
                            alt={ex.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                          />
                          {isCompleted && (
                            <span className="absolute top-3 right-3 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-10">
                              ✓ Completed
                            </span>
                          )}
                        </div>
                        <div className="p-6 flex-1 flex flex-col justify-between">
                          <div>
                            <h4 className="font-bold text-xl mb-1 text-slate-800 dark:text-zinc-100">{ex.title}</h4>
                            <p className="text-gray-400 dark:text-zinc-400 text-sm mb-4 line-clamp-2">
                              {ex.description}
                            </p>
                            <div className="flex gap-3 mb-6 mt-3">
                              <span className="bg-[#D1F7D6] dark:bg-emerald-950/50 text-[#4E7355] dark:text-[#64bb74] px-4 py-1 rounded-xl text-xs font-bold uppercase">
                                {ex.duration > 1 ? `${ex.duration} mins` : `${ex.duration} min`}
                              </span>
                            </div>
                          </div>
                          <button 
                            onClick={() => setSelectedExercise(ex)} 
                            className="w-full cursor-pointer bg-[#4E7355] text-white py-3 rounded-xl font-bold hover:bg-[#3d5a42] dark:hover:bg-[#53a462] shadow-md transition-all active:scale-[0.98]"
                          >
                            {isCompleted ? "Review Exercise" : "Start Exercise"}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )
            )}

            {selectedExercise && (
              <div className="animate-in slide-in-from-right-8 duration-300">
                <button onClick={() => setSelectedExercise(null)} className="flex items-center gap-2 cursor-pointer text-gray-400 dark:text-zinc-400 hover:text-[#4E7355] dark:hover:text-[#64bb74] font-bold mb-8 group">
                  <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Exercises
                </button>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                  
                  <div className="rounded-xl overflow-hidden shadow-xl bg-zinc-100 dark:bg-zinc-800 border dark:border-zinc-700">
                    <img 
                      src={selectedExercise.gifUrl} 
                      className="h-[400px] object-contain w-full mx-auto" 
                      alt={selectedExercise.title} 
                    />
                  </div>

                  <div className="space-y-8">
                    <div>
                      <h3 className="text-3xl font-black text-[#4E7355] dark:text-[#64bb74] mb-2">{selectedExercise.title}</h3>
                      <p className="text-gray-500 dark:text-zinc-400 leading-relaxed">
                        {selectedExercise.description}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-lg font-bold text-slate-700 dark:text-zinc-200">Exercise Steps:</h4>
                      {selectedExercise.steps && selectedExercise.steps.split(/\r?\n/).filter(step => step.trim() !== "").map((step, index) => {
                        const cleanStep = step.replace(/^\d+[-.]\s*/, "");
                        return (
                          <div key={index} className="bg-[#F8F9FA] dark:bg-zinc-900/60 p-4 rounded-xl border border-gray-100 dark:border-zinc-800 shadow-sm flex gap-4 items-start">
                            <div className="bg-white dark:bg-zinc-800 min-w-[32px] h-8 flex items-center justify-center rounded-full font-bold text-[#4E7355] dark:text-[#64bb74] shadow-sm border dark:border-zinc-700">
                              {index + 1}
                            </div>
                            <p className="text-gray-600 dark:text-zinc-300 leading-relaxed pt-0.5">
                              {cleanStep}
                            </p>
                          </div>
                        );
                      })}
                    </div>

                    <div className="pt-4">
                      <button 
                        disabled={submittingExercise}
                        onClick={() => handleCompleteExercise(selectedExercise.exerciseId)} 
                        className={`w-full cursor-pointer bg-[#4E7355] text-white py-4 rounded-xl font-bold shadow-lg transition-all ${
                          submittingExercise ? "opacity-50 cursor-not-allowed" : "hover:bg-[#3d5a42] shadow-emerald-100 dark:shadow-none"
                        }`}
                      >
                        {submittingExercise ? "Saving Progress..." : "Complete & Submit Exercise 🎉"}
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {activeTab === "Quizzes" && (
              activeQuizId ? (
                <QuizPlay quizId={activeQuizId} onExit={handleQuizStatsUpdate} />
              ) : (
                <QuizessStates onStartQuiz={(id) => setActiveQuizId(id)} completedQuizzes={completedQuizzesList} />
              )
            )}

          </div>
        </div>

      </div>
    </div>
  );
};

export default ActivityPage;