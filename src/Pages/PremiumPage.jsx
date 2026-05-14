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
    <div className="bg-[#F9FBF9] min-h-screen pb-20">
      {/*  Header / Hero Section */}
      <section className="pt-16 pb-12 px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-1.5 rounded-full text-sm font-bold mb-6">
          <GoZap size={16} fill="currentColor" />
          LIMITED TIME UPGRADE
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-emerald-950 mb-4">
          Unlock the Full Power of Herbs
        </h2>
        <p className="text-gray-600  text-lg mb-12 text-center ">
          Get expert consultations and personalized treatment plans to transform
          your health naturally.
        </p>

        {/* Quick Stats Bar */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 max-w-4xl mx-auto py-8 border-y border-emerald-100">
          <div className="text-center">
            <p className="text-2xl font-bold text-emerald-900">500+</p>
            <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold">
              Certified Experts
            </p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-emerald-900">50k+</p>
            <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold">
              Happy Users
            </p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-emerald-900">4.9★</p>
            <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold">
              User Rating
            </p>
          </div>
        </div>
      </section>

      {/* 2. Features Grid */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold text-emerald-950 mb-10">
          Exclusive Premium Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-emerald-700 bg-emerald-50 w-12 h-12 rounded-xl flex items-center justify-center mb-5">
                {item.icon}
              </div>
              <h3 className="font-bold text-emerald-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Pricing Section */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center mb-12">
          Choose Your Perfect Plan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative flex flex-col p-8 rounded-[2rem] transition-all ${
                plan.highlight
                  ? "bg-emerald-800/90 text-white shadow-2xl scale-105 z-10"
                  : "bg-white text-emerald-950 border border-gray-200 shadow-sm"
              }`}
            >
              {plan.tag && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase">
                  {plan.tag}
                </span>
              )}

              <h3 className="text-xl font-bold mb-4">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-black">{plan.price}</span>
                <span
                  className={`text-sm ml-1 ${plan.highlight ? "text-emerald-300" : "text-gray-400"}`}
                >
                  /{plan.period}
                </span>
              </div>

              <ul className="space-y-4 mb-10 flex-grow">
                {plan.features.map((feat, fidx) => (
                  <li key={fidx} className="flex items-start gap-3">
                    <MdCheckCircle
                      className={
                        plan.highlight ? "text-emerald-400" : "text-emerald-600"
                      }
                      size={18}
                    />
                    <span className="text-sm leading-tight">{feat}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3.5 rounded-xl font-bold transition-all cursor-pointer ${
                  plan.isCurrent
                    ? "bg-gray-300 text-gray-500 cursor-default"
                    : plan.highlight
                      ? "bg-emerald-400/50 hover:bg-emerald-400 text-white"
                      : "bg-emerald-800/95 hover:bg-emerald-700/90 text-white"
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Testimonials */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <h2 className="text-2xl font-bold mb-10">What Our Users Say</h2>
        <div className="space-y-6">
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
              className="bg-white p-8 rounded-2xl border border-gray-50 shadow-sm"
            >
              <div className="flex gap-1 text-emerald-500 mb-4">
                <FaRegStar size={16} fill="currentColor" />
                <FaRegStar size={16} fill="currentColor" />
                <FaRegStar size={16} fill="currentColor" />
                <FaRegStar size={16} fill="currentColor" />
                <FaRegStar size={16} fill="currentColor" />
              </div>
              <p className="text-lg text-emerald-950 italic mb-4 font-medium leading-relaxed">
                "{user.text}"
              </p>
              <div>
                <p className="font-bold text-emerald-900">{user.name}</p>
                <p className="text-xs text-gray-400 uppercase tracking-widest">
                  {user.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Money Back Guarantee */}
      <section className="max-w-5xl mx-auto px-6">
        <div className="bg-emerald-800/60 rounded-[2.5rem] p-10 md:p-16 text-center text-white relative overflow-hidden">
          <IoShieldCheckmarkOutline className="absolute -right-10 -top-10 text-emerald-700 w-64 h-64 opacity-20" />
          <div className="relative z-10 flex flex-col items-center">
            <div className="bg-white/10 p-4 rounded-full mb-6">
              <IoShieldCheckmarkOutline size={48} className="text-emerald-300" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Money Back Guarantee</h2>
            <p className="text-emerald-100 text-lg max-w-xl mx-auto mb-8">
              Not satisfied? Get your money back within 30 days, no questions
              asked. We stand by the quality of our herbal experts.
            </p>
            <button className="bg-white text-emerald-900 px-8 py-3 mt-3 rounded-full font-bold hover:bg-emerald-50 transition-colors">
              Start Your Risk-Free Trial
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
