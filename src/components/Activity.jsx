import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import ProgressStates from "./ProgressStates";
import MostUsedHerbasStates from "./MostUsedHerbasStates";
import QuizessStates from "./QuizessStates"; // الـ Dashboard بالعمودين
import QuizPlay from "./AnswerQuize"; // مكون حل الأسئلة
import { getMyQuizResults } from "../Services/QuizeServices";

const ActivityPage = () => {
  // State to handle which tab is active
  const [activeTab, setActiveTab] = useState("Weekly Progress");
  // State to handle drilling down into a specific exercise
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [value, setValue] = useState(dayjs());

  // المتغير الخاص بتتبع الكويز النشط بداخل الـ Tab
  const [activeQuizId, setActiveQuizId] = useState(null);

  // --- التعديل الذهبي: تخزين مصفوفة النتائج الكاملة بدلاً من مجرد رقم ---
  const [completedQuizzesList, setCompletedQuizzesList] = useState([]); 
  const [loadingStats, setLoadingStats] = useState(true);

  // دالة جلب بيانات الكويزات المكتملة من الـ API
  const fetchQuizStats = async () => {
    try {
      const res = await getMyQuizResults();
      // التحقق من أن الاستجابة تحتوي على المصفوفة مباشرة في res.data
      if (res?.data && Array.isArray(res.data)) {
        // حفظ المصفوفة الكاملة لاستخدامها في الـ Sidebar والتعطيل معاً
        setCompletedQuizzesList(res.data);
                console.log(res);

      }
    } catch (err) {
      console.error("Failed to fetch quiz statistics from API:", err);
    } finally {
      setLoadingStats(false);
    }
  };

  // جلب البيانات تلقائياً بمجرد فتح الصفحة
  useEffect(() => {
    fetchQuizStats();
  }, []);

  // دالة تُنفذ عند إنهاء الكويز أو الضغط على خروج لتحديث العداد فوراً في الـ Sidebar
  const handleQuizStatsUpdate = () => {
    setActiveQuizId(null);
    fetchQuizStats(); // إعادة استدعاء الـ API لتحديث الرقم تلقائياً
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
    <div className="min-h-screen p-6 lg:p-10 font-sans text-slate-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT SIDEBAR: General Stats & Calendar */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white dark:bg-green-900/10 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-green-900/30">
            <h2 className="text-[#4E7355] dark:text-[#64bb74] font-bold text-xl mb-6">
              General Info
            </h2>
            <div className="space-y-4 text-gray-500 dark:text-gray-200 text-sm">
              <div className="flex justify-between items-center">
                <span>New Herbas</span>
                <span className="font-bold text-[#4E7355] dark:text-[#76db89]">12</span>
              </div>
              
              {/* تحديث خانة الـ Sidebar لتقرأ طول مصفوفة الكويزات المكتملة حياً */}
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
                <span className="font-bold text-[#4E7355] dark:text-[#76db89]">192</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Assigned Tasks Completed</span>
                <span className="font-bold text-[#4E7355] dark:text-[#76db89]">192</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Growth Rate:</span>
                <span className="font-bold text-[#4E7355] dark:text-[#76db89]">+18%</span>
              </div>
              <div className="flex justify-between items-center border-t pt-4">
                <span>Points Earned</span>
                <span className="font-bold text-amber-600">500,001</span>
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
                      "& .MuiPickersDay-root.Mui-selected": {
                        backgroundColor: "#335D39cc",
                        color: "black",
                      },
                      "& .MuiPickersDay-root.Mui-selected:hover": {
                        backgroundColor: "#6BB683",
                      },
                      "& .MuiPickersDay-root.Mui-selected:focus": {
                        backgroundColor: "#335D39cc",
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
          <div className="flex flex-wrap gap-4 mb-10 border-b pb-6">
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
                    : "bg-[#F3F5F4] text-gray-400 dark:bg-gray-700/50 dark:text-white hover:bg-gray-200"
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
                <ProgressStates />
                <h4 className="text-xl font-bold text-slate-700 mt-4">
                  Great job! Keep up the good work.
                </h4>
              </div>
            )}

            {activeTab === "Exercises" && !selectedExercise && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in zoom-in-95">
                {exercises.map((ex) => (
                  <div
                    key={ex.id}
                    className="bg-white border-2 border-gray-50 rounded-xl overflow-hidden flex flex-col hover:shadow-xl transition-shadow group"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={ex.img}
                        alt={ex.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <h4 className="font-bold text-xl mb-1">{ex.title}</h4>
                      <p className="text-gray-400 text-sm mb-4">
                        Start your day with energy and flexibility
                      </p>
                      <div className="flex gap-3 mb-6 mt-3">
                        <span className="bg-[#D1F7D6] text-[#4E7355] px-4 py-1 rounded-xl text-xs font-bold uppercase">
                          {ex.level}
                        </span>
                        <span className="bg-[#F3F5F4] text-gray-500 px-4 py-1 rounded-xl text-xs font-bold">
                          ⏱ {ex.time}
                        </span>
                      </div>
                      <button
                        onClick={() => setSelectedExercise(ex)}
                        className="w-full cursor-pointer bg-[#4E7355] text-white py-3 rounded-xl font-bold hover:bg-[#3d5a42] shadow-md transition-all active:scale-[0.98]"
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
                  className="flex items-center gap-2 cursor-pointer text-gray-400 hover:text-[#4E7355] font-bold mb-8 group"
                >
                  <span className="group-hover:-translate-x-1 transition-transform">
                    ←
                  </span>{" "}
                  Back to Exercises
                </button>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                  <img
                    src={selectedExercise.img}
                    className="rounded-xl shadow-xl h-[400px] object-cover"
                    alt="Workout"
                  />
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-3xl font-black text-[#4E7355] mb-2">
                        {selectedExercise.title}
                      </h3>
                      <div className="flex items-center gap-4">
                        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-[#84B38E] w-1/4"></div>
                        </div>
                        <span className="text-sm font-bold text-gray-400">
                          0/{selectedExercise.steps} steps
                        </span>
                      </div>
                    </div>

                    <div className="bg-[#F8F9FA] p-8 rounded-xl border border-gray-100 shadow-sm">
                      <div className="bg-white w-10 h-10 flex items-center justify-center rounded-full font-bold text-[#4E7355] mb-4 shadow-sm">
                        1
                      </div>
                      <h5 className="text-xl font-bold mb-3">
                        Start in Mountain Pose (Tadasana)
                      </h5>
                      <p className="text-gray-500 leading-relaxed mb-8">
                        Hold for 1 minute while focusing on deep, rhythmic breathing.
                      </p>
                      <button className="w-full cursor-pointer bg-[#4E7355] text-white py-3 mt-3 rounded-xl font-bold shadow-lg hover:shadow-emerald-200 transition-all">
                        Complete Step
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "Quizzes" && (
              activeQuizId ? (
                <QuizPlay 
                  quizId={activeQuizId} 
                  onExit={handleQuizStatsUpdate} 
                />
              ) : (
                /* تمرير المصفوفة الحية لتعطيل الكويزات المكتملة داخل المكون */
                <QuizessStates 
                  onStartQuiz={(id) => setActiveQuizId(id)} 
                  completedQuizzes={completedQuizzesList} 
                />
              )
            )}

            {activeTab === "Most Used Herbas" && <MostUsedHerbasStates />}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ActivityPage;