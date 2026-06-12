import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import ProgressStates from "./ProgressStates";
import MostUsedHerbasStates from "./MostUsedHerbasStates";
import QuizessStates from "./QuizessStates";
import QuizPlay from "./AnswerQuize";
import { getMyQuizResults } from "../Services/QuizeServices";

const ActivityPage = () => {
  // State to handle which tab is active
  const [activeTab, setActiveTab] = useState("Weekly Progress");
  // State to handle drilling down into a specific exercise
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [value, setValue] = useState(dayjs());

  const [activeQuizId, setActiveQuizId] = useState(null);
  const [completedQuizzesList, setCompletedQuizzesList] = useState([]);
  const [loadingStats, setLoadingStats] = useState(true);

  const fetchQuizStats = async () => {
    try {
      const res = await getMyQuizResults();
      // تصحيح: قراءة البيانات من الكائن الداخلي لـ Swagger (res.data.data) ومفتاح النجاح
      if (res?.data?.success && Array.isArray(res?.data?.data)) {
        setCompletedQuizzesList(res.data.data);
      } else if (res?.data && Array.isArray(res.data)) {
        // حماية إضافية في حال تغيرت تركيبة السيرفر
        setCompletedQuizzesList(res.data);
      }
    } catch (err) {
      console.error("Failed to fetch quiz statistics:", err);
    } finally {
      setLoadingStats(false);
    }
  };

  useEffect(() => {
    fetchQuizStats();
  }, []);

  const handleQuizStatsUpdate = () => {
    setActiveQuizId(null);
    fetchQuizStats();
  };

  // Mock data based on your screens
  const exercises = [
    {
      id: 1,
      title: "Morning Yoga Flow",
      level: "Easy",
      time: "15 min",
      steps: 4,
      img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=400",
    },
    {
      id: 2,
      title: "Cardio Workout",
      level: "Medium",
      time: "20 min",
      steps: 6,
      img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=400",
    },
  ];

  return (
    <div className="min-h-screen p-6 lg:p-10 font-sans text-slate-800 dark:text-zinc-100 bg-transparent">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT SIDEBAR: General Stats & Calendar */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white dark:bg-green-900/10 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-green-900/30">
            <h2 className="text-[#4E7355] dark:text-[#64bb74] font-bold text-xl mb-6">
              General Info
            </h2>
            <div className="space-y-4 text-gray-500 dark:text-gray-300 text-sm">

              <div className="flex justify-between items-center">
                <span>Quizzes Completed</span>
                <span className="font-bold text-[#4E7355] dark:text-[#76db89]">
                  {loadingStats ? (
                    <span className="inline-block w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    completedQuizzesList.length
                  )}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span>Exercises Completed</span>
                <span className="font-bold text-[#4E7355] dark:text-[#76db89]">
                  192
                </span>
              </div>
            
              <div className="flex justify-between items-center">
                <span>Growth Rate:</span>
                <span className="font-bold text-[#4E7355] dark:text-[#76db89]">
                  +18%
                </span>
              </div>
              <div className="flex justify-between items-center border-t border-gray-100 dark:border-zinc-800 pt-4">
                <span>Points Earned</span>
                <span className="font-bold text-amber-600 dark:text-amber-400">500,001</span>
              </div>
            </div>
          </div>

          <div className="w-full bg-white dark:bg-green-900/10 text-black border-gray-100 dark:text-gray-200 rounded-xl border dark:border-green-900/30">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateCalendar", "DateCalendar"]}>
                <DemoItem>
                  <DateCalendar
                    value={value}
                    onChange={(newValue) => setValue(newValue)}
                    sx={{
                      width: "100%",
                      "& .MuiPickersCalendarHeader-label": {
                        color: "inherit",
                      },
                      "& .MuiIconButton-root": {
                        color: "inherit",
                      },
                      "& .MuiDayCalendar-weekDayLabel": {
                        color: "rgba(0, 0, 0, 0.6)",
                        ".dark &": {
                          color: "rgba(255, 255, 255, 0.6)",
                        },
                      },
                      "& .MuiPickersDay-root": {
                        color: "inherit",
                        "&:hover": {
                          backgroundColor: "rgba(78, 115, 85, 0.15)",
                        },
                      },
                      "& .MuiPickersDay-root.Mui-selected": {
                        backgroundColor: "#4E7355",
                        color: "white !important",
                      },
                      "& .MuiPickersDay-root.Mui-selected:hover": {
                        backgroundColor: "#6BB683",
                      },
                      "& .MuiPickersDay-root.Mui-selected:focus": {
                        backgroundColor: "#4E7355",
                      },
                      "& .MuiPickersDay-dayOutsideMonth": {
                        color: "rgba(0, 0, 0, 0.3)",
                        ".dark &": {
                          color: "rgba(255, 255, 255, 0.3)",
                        },
                      },
                    }}
                  />
                </DemoItem>
              </DemoContainer>
            </LocalizationProvider>
          </div>
        </div>

        {/* MAIN PANEL: Content Switcher */}
        <div className="lg:col-span-9 bg-white dark:bg-green-900/10 dark:border-green-900/30 rounded-xl p-8 shadow-sm border border-gray-100 min-h-[600px]">
          {/* Dashboard Navigation Tabs */}
          <div className="flex flex-wrap gap-4 mb-10 border-b border-gray-100 dark:border-zinc-800 pb-6">
            {[
              "Weekly Progress",
              "Most Used Herbas",
              "Quizzes",
              "Exercises",
            ].map((tab) => (
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

          {/* DYNAMIC CONTENT AREA */}
          <div className="transition-all duration-300">
            {activeTab === "Weekly Progress" && (
              <div className="flex flex-col items-center justify-center py-16 animate-in fade-in slide-in-from-bottom-4">
                {/* تم ربط الشارت لتمرير عدد الكويزات المكتملة حياً */}
                <ProgressStates 
                  completedCount={completedQuizzesList.length} 
                  totalQuizzes={10} 
                />
                <h4 className="text-xl font-bold text-slate-700 dark:text-zinc-300 mt-4">
                  Great job! Keep up the good work.
                </h4>
              </div>
            )}

            {activeTab === "Exercises" && !selectedExercise && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in zoom-in-95">
                {exercises.map((ex) => (
                  <div
                    key={ex.id}
                    className="bg-white dark:bg-zinc-900/40 border-2 border-gray-50 dark:border-zinc-800 rounded-xl overflow-hidden flex flex-col hover:shadow-xl transition-shadow group"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={ex.img}
                        alt={ex.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <h4 className="font-bold text-xl mb-1 text-slate-800 dark:text-zinc-100">{ex.title}</h4>
                      <p className="text-gray-400 dark:text-zinc-400 text-sm mb-4">
                        Start your day with energy and flexibility
                      </p>
                      <div className="flex gap-3 mb-6 mt-3">
                        <span className="bg-[#D1F7D6] dark:bg-emerald-950/50 text-[#4E7355] dark:text-[#64bb74] px-4 py-1 rounded-xl text-xs font-bold uppercase">
                          {ex.level}
                        </span>
                        <span className="bg-[#F3F5F4] dark:bg-zinc-800 text-gray-500 dark:text-zinc-400 px-4 py-1 rounded-xl text-xs font-bold">
                          ⏱ {ex.time}
                        </span>
                      </div>
                      <button
                        onClick={() => setSelectedExercise(ex)}
                        className="w-full cursor-pointer bg-[#4E7355] text-white py-3 rounded-xl font-bold hover:bg-[#3d5a42] dark:hover:bg-[#53a462] shadow-md transition-all active:scale-[0.98]"
                      >
                        Start Exercise
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {selectedExercise && (
              <div className="animate-in slide-in-from-right-8 duration-300">
                <button
                  onClick={() => setSelectedExercise(null)}
                  className="flex items-center gap-2 cursor-pointer text-gray-400 dark:text-zinc-400 hover:text-[#4E7355] dark:hover:text-[#64bb74] font-bold mb-8 group"
                >
                  <span className="group-hover:-translate-x-1 transition-transform">
                    ←
                  </span>{" "}
                  Back to Exercises
                </button>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                  <img
                    src={selectedExercise.img}
                    className="rounded-xl shadow-xl h-[400px] object-cover w-full"
                    alt="Workout"
                  />
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-3xl font-black text-[#4E7355] dark:text-[#64bb74] mb-2">
                        {selectedExercise.title}
                      </h3>
                      <div className="flex items-center gap-4">
                        <div className="flex-1 h-2 bg-gray-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                          <div className="h-full bg-[#84B38E] w-1/4"></div>
                        </div>
                        <span className="text-sm font-bold text-gray-400 dark:text-zinc-500">
                          0/{selectedExercise.steps} steps
                        </span>
                      </div>
                    </div>

                    <div className="bg-[#F8F9FA] dark:bg-zinc-900/60 p-8 rounded-xl border border-gray-100 dark:border-zinc-800 shadow-sm">
                      <div className="bg-white dark:bg-zinc-800 w-10 h-10 flex items-center justify-center rounded-full font-bold text-[#4E7355] dark:text-[#64bb74] mb-4 shadow-sm border dark:border-zinc-700">
                        1
                      </div>
                      <h5 className="text-xl font-bold mb-3 text-slate-800 dark:text-zinc-100">
                        Start in Mountain Pose (Tadasana)
                      </h5>
                      <p className="text-gray-500 dark:text-zinc-400 leading-relaxed mb-8">
                        Hold for 1 minute while focusing on deep, rhythmic
                        breathing.
                      </p>
                      <button className="w-full cursor-pointer bg-[#4E7355] text-white py-3 mt-3 rounded-xl font-bold shadow-lg hover:bg-[#3d5a42] transition-all">
                        Complete Step
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "Quizzes" &&
              (activeQuizId ? (
                <QuizPlay
                  quizId={activeQuizId}
                  onExit={handleQuizStatsUpdate}
                />
              ) : (
                <QuizessStates
                  onStartQuiz={(id) => setActiveQuizId(id)}
                  completedQuizzes={completedQuizzesList}
                />
              ))}

            {activeTab === "Most Used Herbas" && <MostUsedHerbasStates />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityPage;