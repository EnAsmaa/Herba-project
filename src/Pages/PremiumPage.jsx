import React from "react";

import { MdCheckCircle } from "react-icons/md";
import { FiMessageSquare } from "react-icons/fi";
import { LuClipboardList } from "react-icons/lu";
import { IoCameraOutline } from "react-icons/io5";
import { TbHeadset } from "react-icons/tb";
import { TbCrown } from "react-icons/tb";
import { GoZap } from "react-icons/go";
import { FaRegStar } from "react-icons/fa";
import { IoShieldCheckmarkOutline } from "react-icons/io5";

// Data derived from your mobile screenshots
const features = [
  {
    icon: <FiMessageSquare  className="w-6 h-6" />,
    title: "Free Expert Consultations",
    desc: "Talk to herbal specialists unlimited. Get professional guidance whenever you need it.",
  },
  {
    icon: <LuClipboardList  className="w-6 h-6" />,
    title: "Personalized Treatment Plans",
    desc: "Customized plans designed specifically for your unique health condition and goals.",
  },
  {
    icon: <IoCameraOutline  className="w-6 h-6" />,
    title: "Advanced Image Analysis",
    desc: "Identify herbs with high accuracy using our proprietary AI-driven scanning technology.",
  },
  {
    icon: <TbHeadset className="w-6 h-6" />,
    title: "24/7 Priority Support",
    desc: "Skip the waiting line. Our dedicated support team is available for you at any hour.",
  },
];
const plans = [
  {
    name: "Free Plan",
    price: "$0",
    period: "Free",
    features: ["Basic access to herb database", "5 consultations per month"],
    buttonText: "Current Plan",
    highlight: false,
    isCurrent: true,
  },
  {
    name: "Monthly",
    price: "$29",
    period: "month",
    features: [
      "Unlimited access to all herbs",
      "Expert herbal consultations",
      "Personalized health plans",
      "Priority customer support",
      "Advanced mood analysis",
    ],
    buttonText: "Choose Plan",
    highlight: false,
  },
  {
    name: "Yearly",
    price: "$199",
    period: "year",
    features: [
      "All monthly features included",
      "Extra free consultations",
      "Monthly health reports",
      "Exclusive product discounts",
      "Free training courses",
      "Access to VIP community",
    ],
    buttonText: "Choose Plan",
    highlight: true,
    tag: "Most Popular",
  },
];
export default function PremiumPage() {
 return (
    <div className="bg-[#F9FBF9] text-[#3E4E36] dark:bg-[#1A1F1C] dark:text-[#E2E8F0] min-h-screen pb-20 font-sans transition-colors duration-200">
      {/* 1. Header / Hero Section */}
      <section className="pt-16 pb-12 px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-950/40 text-[#446C4F] dark:text-green-400 px-4 py-1.5 rounded-full text-xs font-bold mb-6 border border-green-200 dark:border-green-900/20">
          <GoZap size={14} fill="currentColor" />
          LIMITED TIME UPGRADE
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-[#3E4E36] dark:text-[#E2E8F0] mb-4 tracking-tight">
          Unlock the Full Power of Herbs
        </h2>
        <p className="text-sm md:text-base text-[#3E4E36]/70 dark:text-[#94A3B8]  mx-auto mb-12 leading-relaxed">
          Get expert consultations and personalized treatment plans to transform
          your health naturally.
        </p>

        {/* Quick Stats Bar */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 max-w-4xl mx-auto py-8 border-y border-gray-200/60 dark:border-[#2C3530]/60">
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-black text-[#446C4F] dark:text-[#528B63]">500+</p>
            <p className="text-[10px] text-gray-400 dark:text-zinc-500 uppercase tracking-widest font-bold mt-1">
              Certified Experts
            </p>
          </div>
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-black text-[#446C4F] dark:text-[#528B63]">50k+</p>
            <p className="text-[10px] text-gray-400 dark:text-zinc-500 uppercase tracking-widest font-bold mt-1">
              Happy Users
            </p>
          </div>
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-black text-[#446C4F] dark:text-[#528B63]">4.9★</p>
            <p className="text-[10px] text-gray-400 dark:text-zinc-500 uppercase tracking-widest font-bold mt-1">
              User Rating
            </p>
          </div>
        </div>
      </section>

      {/* 2. Features Grid */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-xl md:text-2xl font-black text-[#3E4E36] dark:text-[#E2E8F0] mb-8 flex items-center gap-2">
          <span className="w-1.5 h-4 bg-[#446C4F] dark:bg-[#528B63] rounded-full block"></span>
          Exclusive Premium Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-[#232925] p-6 rounded-2xl border border-gray-100 dark:border-[#2C3530] shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="text-[#446C4F] dark:text-[#528B63] bg-gray-50 dark:bg-[#1A1F1C] w-12 h-12 rounded-xl flex items-center justify-center mb-5 border border-gray-100 dark:border-[#2C3530]/40">
                {item.icon}
              </div>
              <h3 className="font-bold text-[#3E4E36] dark:text-[#E2E8F0] mb-2">{item.title}</h3>
              <p className="text-xs md:text-sm text-[#3E4E36]/80 dark:text-[#94A3B8] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Pricing Section */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl md:text-3xl font-black text-center text-[#3E4E36] dark:text-[#E2E8F0] mb-12">
          Choose Your Perfect Plan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative flex flex-col p-8 rounded-3xl transition-all duration-300 ${
                plan.highlight
                  ? "bg-[#446C4F] text-white dark:bg-[#232925] border-2 border-[#446C4F] dark:border-[#528B63] shadow-xl md:scale-105 z-10"
                  : "bg-white text-[#3E4E36] dark:bg-[#232925] dark:text-[#E2E8F0] border border-gray-100 dark:border-[#2C3530] shadow-sm"
              }`}
            >
              {plan.tag && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#446C4F] dark:bg-[#528B63] text-white px-4 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider shadow-sm whitespace-nowrap">
                  {plan.tag}
                </span>
              )}

              <h3 className={`text-xl font-black mb-3 ${plan.highlight ? "text-white" : "text-[#3E4E36] dark:text-[#E2E8F0]"}`}>{plan.name}</h3>
              <div className="mb-6 flex items-baseline gap-1">
                <span className="text-4xl font-black tracking-tight">{plan.price}</span>
                <span
                  className={`text-xs font-semibold ${plan.highlight ? "text-green-200 dark:text-zinc-400" : "text-gray-400 dark:text-zinc-500"}`}
                >
                  /{plan.period}
                </span>
              </div>

              <ul className="space-y-3.5 mb-8 flex-grow">
                {plan.features.map((feat, fidx) => (
                  <li key={fidx} className="flex items-start gap-2.5">
                    <MdCheckCircle
                      className={`shrink-0 mt-0.5 ${
                        plan.highlight ? "text-white dark:text-[#528B63]" : "text-[#446C4F] dark:text-[#528B63]"
                      }`}
                      size={18}
                    />
                    <span className={`text-sm leading-tight ${plan.highlight ? "text-white/90 dark:text-[#94A3B8]" : "text-[#3E4E36]/90 dark:text-[#94A3B8]"}`}>{feat}</span>
                  </li>
                ))}
              </ul>

              <button
                disabled={plan.isCurrent}
                className={`w-full py-3 rounded-xl font-bold text-sm transition-all shadow-sm ${
                  plan.isCurrent
                    ? "bg-gray-100 dark:bg-[#1A1F1C] text-gray-400 dark:text-zinc-600 cursor-not-allowed shadow-none border border-transparent"
                    : plan.highlight
                      ? "bg-white text-[#446C4F] hover:bg-gray-50 dark:bg-[#528B63] dark:text-white dark:hover:opacity-95 cursor-pointer active:scale-95"
                      : "bg-[#446C4F] dark:bg-[#1A1F1C] dark:border dark:border-[#2C3530] text-white hover:opacity-95 cursor-pointer active:scale-95"
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Testimonials */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-xl md:text-2xl font-black text-[#3E4E36] dark:text-[#E2E8F0] mb-8 flex items-center gap-2">
          <span className="w-1.5 h-4 bg-[#446C4F] dark:bg-[#528B63] rounded-full block"></span>
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              name: "Dr. Ahmed Mohammed",
              text: "The free consultations helped me understand herbal treatment much better.",
              role: "Verified Expert",
            },
            {
              name: "Fatima Ali",
              text: "The personalized plan changed my life and helped solve chronic health issues.",
              role: "Premium Member",
            },
          ].map((user, i) => (
            <div
              key={i}
              className="bg-white dark:bg-[#232925] p-6 rounded-2xl border border-gray-100 dark:border-[#2C3530] shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-0.5 text-amber-500 mb-3">
                  {[...Array(5)].map((_, idx) => (
                    <FaRegStar key={idx} size={14} fill="currentColor" />
                  ))}
                </div>
                <p className="text-sm text-[#3E4E36]/90 dark:text-[#94A3B8] italic mb-4 font-medium leading-relaxed">
                  "{user.text}"
                </p>
              </div>
              <div className="pt-3 border-t border-gray-50 dark:border-[#2C3530]/40">
                <p className="font-bold text-sm text-[#3E4E36] dark:text-[#E2E8F0]">{user.name}</p>
                <p className="text-[10px] text-gray-400 dark:text-zinc-500 uppercase tracking-wider font-bold mt-0.5">
                  {user.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Money Back Guarantee */}
      <section className="max-w-5xl mx-auto px-6">
        <div className="bg-[#446C4F]/90 dark:bg-[#232925] rounded-3xl p-8 md:p-14 text-center text-white border border-[#446C4F] dark:border-[#2C3530] relative overflow-hidden shadow-md">
          <IoShieldCheckmarkOutline className="absolute -right-10 -top-10 text-white/5 dark:text-zinc-800/20 w-64 h-64 pointer-events-none select-none" />
          <div className="relative z-10 flex flex-col items-center">
            <div className="bg-white/10 dark:bg-[#1A1F1C] p-3.5 rounded-full mb-4 border border-white/10 dark:border-[#2C3530]">
              <IoShieldCheckmarkOutline size={40} className="text-white dark:text-[#528B63]" />
            </div>
            <h2 className="text-2xl font-black mb-3">Money Back Guarantee</h2>
            <p className="text-white/90 dark:text-[#94A3B8] text-sm max-w-lg mx-auto mb-6 leading-relaxed">
              Not satisfied? Get your money back within 30 days, no questions
              asked. We stand by the quality of our herbal experts.
            </p>
            <button className="bg-white dark:bg-[#528B63] text-[#446C4F] dark:text-white px-8 py-3 rounded-xl font-bold text-sm hover:opacity-95 shadow-sm transition-transform active:scale-95 cursor-pointer">
              Start Your Risk-Free Trial
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
