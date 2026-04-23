import React, { useState } from 'react';

const ActivityPage = () => {
  const [activeTab, setActiveTab] = useState('Quizzes');
  const [quizView, setQuizView] = useState('list'); // 'list' or 'active'
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  // Quiz Data based on your uploaded screens
  const quizzes = [
    {
      id: 1,
      title: "Beginner's Herbal Guide",
      description: "Learn the basics of medicinal herbs",
      questionsCount: 10,
      level: "Easy",
      image: "https://images.unsplash.com/photo-1515446134809-993c501ca304?q=80&w=200",
      questions: [
        {
          q: "Which herb is known for improving sleep quality?",
          options: ["Ginger", "Lavender", "Basil", "Thyme"],
          correct: "Lavender"
        }
      ]
    }
  ];

  const handleStartQuiz = () => {
    setQuizView('active');
    setCurrentQuestion(0);
    setScore(0);
  };

  const handleAnswer = (option) => {
    if (option === quizzes[0].questions[currentQuestion].correct) {
      setScore(score + 1);
    }
    
    if (currentQuestion < quizzes[0].questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      alert(`Quiz Complete! You scored ${score + 1}/${quizzes[0].questions.length}`);
      setQuizView('list');
    }
  };

  return (
    <div className="p-8 ">

      {/* QUIZ LIST VIEW */}
      {activeTab === 'Quizzes' && quizView === 'list' && (
        <div className="space-y-8 animate-in fade-in">
          {/* Header Stats */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-[#F3F5F4] p-6 rounded-xl text-center border border-gray-100">
              <span className="block text-2xl font-black text-[#4E7355]">8</span>
              <span className="text-gray-400 text-xs font-bold uppercase">Completed</span>
            </div>
            <div className="bg-[#F3F5F4] p-6 rounded-xl text-center border border-gray-100">
              <span className="block text-2xl font-black text-[#4E7355]">85%</span>
              <span className="text-gray-400 text-xs font-bold uppercase">Avg Score</span>
            </div>
          </div>

          <h3 className="text-xl font-bold text-slate-700">Available Quizzes</h3>
          
          {/* Quiz Cards */}
          {quizzes.map(quiz => (
            <div key={quiz.id} className="bg-white border-2 border-gray-50 rounded-xl p-6 flex items-center justify-between shadow-md transition-shadow">
              <div className="flex items-center gap-6">
                <img src={quiz.image} className="w-20 h-20 rounded-2xl object-cover" alt="Quiz thumb" />
                <div>
                  <h4 className="font-bold text-lg">{quiz.title}</h4>
                  <p className="text-gray-400 text-sm mb-2">{quiz.description}</p>
                  <div className="flex gap-2">
                    <span className="text-[10px] font-bold text-gray-400 uppercase">{quiz.questionsCount} Questions</span>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 rounded-md uppercase">{quiz.level}</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={handleStartQuiz}
                className="bg-[#4E7355] text-white px-10 py-3 cursor-pointer rounded-xl font-bold hover:bg-[#3d5a42] transition-colors"
              >
                Start Quiz
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ACTIVE QUIZ VIEW */}
      {quizView === 'active' && (
        <div className="max-w-3xl mx-auto animate-in slide-in-from-bottom-10">
          <div className="flex justify-between items-center mb-12">
            <button onClick={() => setQuizView('list')} className="text-gray-400 font-bold cursor-pointer">← Exit</button>
            <div className="bg-emerald-50 text-[#4E7355] px-4 py-2 rounded-xl font-bold text-sm">
              Question {currentQuestion + 1}/{quizzes[0].questions.length}
            </div>
          </div>

          <div className="text-center space-y-12">
            <h2 className="text-3xl font-black text-slate-800 leading-tight">
              {quizzes[0].questions[currentQuestion].q}
            </h2>

            {/* Answer Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quizzes[0].questions[currentQuestion].options.map(option => (
                <button 
                  key={option}
                  onClick={() => handleAnswer(option)}
                  className="w-full py-3 px-8 border-2 cursor-pointer border-gray-100 rounded-xl font-bold text-lg text-gray-600 hover:border-[#4E7355] hover:bg-emerald-50 hover:text-[#4E7355] transition-all active:scale-95"
                >
                  {option}
                </button>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="pt-8">
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-[#84B38E] h-full transition-all duration-500" 
                  style={{ width: `${((currentQuestion + 1) / quizzes[0].questions.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityPage;