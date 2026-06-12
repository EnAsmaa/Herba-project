import React, { useState } from "react";
import { FaAngleRight } from "react-icons/fa6";
import { CiChat1 } from "react-icons/ci";
import { CiMail } from "react-icons/ci";
import { MdOutlinePhone } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { MdOutlineMenuBook } from "react-icons/md";
import { FaRegQuestionCircle } from "react-icons/fa";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

const contactOptions = [
  {
    title: "Live Chat",
    icon: <CiChat1 />,
    description: "Chat with us now",
  },
  {
    title: "Email",
    icon: <CiMail />,
    description: "support@herbacare.com",
  },
  {
    title: "Phone",
    icon: <MdOutlinePhone />,
    description: "+966 50 123 4567",
  },
];

const faqs = [
  {
    question: "How do I create an account?",
    answer: "You can create an account by signing up using your email.",
  },
  {
    question: "How do I search for herbs?",
    answer: "Use the search bar to find herbs easily through our library.",
  },
  {
    question: "What are Premium features?",
    answer: "Premium features give you advanced AI nutritional tools and expert insights.",
  },
  {
    question: "How does herb image analysis work?",
    answer: "Upload a clear image of any herb and our AI instantly analyzes and identifies it.",
  },
  {
    question: "How do I book a consultation with an expert?",
    answer: "Go to the consultations section, choose a certified specialist, and book directly.",
  },
];

const resources = [
  {
    title: "User Guide",
    icon: <MdOutlineMenuBook />,
    description: "Learn how to use the app",
  },
  {
    title: "FAQs",
    icon: <FaRegQuestionCircle />,
    description: "Answers to common questions",
  },
  {
    title: "Help Center",
    icon: <FaArrowUpRightFromSquare />,
    description: "Detailed articles and tutorials",
  },
];

export default function HelpSupport() {
  // تم تعديلها لتخزين index السؤال المفتوح لمنع فتح جميع الأسئلة معاً
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-[#3E4E36] dark:bg-[#1A1F1C] dark:text-[#E2E8F0] py-12 px-4 font-sans transition-colors duration-200">
      <div className="max-w-3xl mx-auto">
        
        {/* Main Page Title */}
        <h2 className="text-3xl font-black text-[#3E4E36] dark:text-[#E2E8F0] mb-8 tracking-tight">
          Help & Support
        </h2>

        {/* Contact Section */}
        <h2 className="text-lg font-bold mb-4 text-[#446C4F] dark:text-[#528B63] flex items-center gap-2">
          <span className="w-1.5 h-4 bg-[#446C4F] dark:bg-[#528B63] rounded-full block"></span>
          Contact Us
        </h2>
        
        <div className="space-y-4 mb-8">
          {contactOptions.map((item, i) => (
            <div
              key={i}
              className="bg-white dark:bg-[#232925] rounded-2xl p-5 border border-gray-100 dark:border-[#2C3530] shadow-sm flex items-center gap-4 hover:shadow-md transition duration-200 cursor-pointer group"
            >
              <div className="p-3 bg-green-50 dark:bg-green-950/30 text-[#446C4F] dark:text-[#528B63] rounded-xl text-xl shrink-0 border border-green-100 dark:border-green-900/10">
                {item.icon}
              </div>
              <div className="flex items-center justify-between w-full">
                <div>
                  <h3 className="font-bold text-sm md:text-base text-[#3E4E36] dark:text-[#E2E8F0]">
                    {item.title}
                  </h3>
                  <p className="text-xs md:text-sm text-[#3E4E36]/70 dark:text-[#94A3B8] mt-0.5">
                    {item.description}
                  </p>
                </div>
                <span className="text-gray-400 dark:text-zinc-500 group-hover:translate-x-1 transition-transform">
                  <FaAngleRight size={16} />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <h2 className="text-lg font-bold mb-4 text-[#446C4F] dark:text-[#528B63] flex items-center gap-2">
          <span className="w-1.5 h-4 bg-[#446C4F] dark:bg-[#528B63] rounded-full block"></span>
          Frequently Asked Questions
        </h2>
        
        <div className="bg-white dark:bg-[#232925] border border-gray-100 dark:border-[#2C3530] rounded-2xl p-4 md:p-6 shadow-sm mb-8 divide-y divide-gray-100 dark:divide-[#2C3530]/40">
          {faqs.map((item, i) => (
            <div key={i} className={`${i === 0 ? "pb-4" : "py-4"} ${i === faqs.length - 1 ? "pb-0" : ""}`}>
              <div
                className="flex justify-between items-center cursor-pointer group py-1"
                onClick={() => toggleFaq(i)}
              >
                <h4 className="font-bold text-sm md:text-base text-[#3E4E36] dark:text-[#E2E8F0] group-hover:text-[#446C4F] dark:group-hover:text-[#528B63] transition-colors">
                  {item.question}
                </h4>
                <span className="text-gray-400 dark:text-zinc-500">
                  {openIndex === i ? <IoIosArrowUp size={18} /> : <IoIosArrowDown size={18} />}
                </span>
              </div>

              {openIndex === i && (
                <p className="text-xs md:text-sm text-[#3E4E36]/80 dark:text-[#94A3B8] mt-3 leading-relaxed bg-gray-50/50 dark:bg-[#1A1F1C]/40 p-3 rounded-xl animate-in fade-in duration-200">
                  {item.answer}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Resources Section */}
        <h2 className="text-lg font-bold mb-4 text-[#446C4F] dark:text-[#528B63] flex items-center gap-2">
          <span className="w-1.5 h-4 bg-[#446C4F] dark:bg-[#528B63] rounded-full block"></span>
          Additional Resources
        </h2>
        
        <div className="space-y-4">
          {resources.map((item, i) => (
            <div
              key={i}
              className="bg-white dark:bg-[#232925] rounded-2xl p-5 border border-gray-100 dark:border-[#2C3530] shadow-sm flex gap-4 items-center hover:shadow-md transition duration-200 cursor-pointer group"
            >
              <div className="p-3 bg-green-50 dark:bg-green-950/30 text-[#446C4F] dark:text-[#528B63] rounded-xl text-xl shrink-0 border border-green-100 dark:border-green-900/10">
                {item.icon}
              </div>
              <div className="flex w-full justify-between items-center">
                <div>
                  <h3 className="font-bold text-sm md:text-base text-[#3E4E36] dark:text-[#E2E8F0]">
                    {item.title}
                  </h3>
                  <p className="text-xs md:text-sm text-[#3E4E36]/70 dark:text-[#94A3B8] mt-0.5">
                    {item.description}
                  </p>
                </div>
                <span className="text-gray-400 dark:text-zinc-500 group-hover:translate-x-1 transition-transform">
                  <FaAngleRight size={16} />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Support Hours Box */}
        <div className="bg-green-50/60 dark:bg-[#232925] rounded-2xl p-6 md:p-8 mt-8 border border-green-100 dark:border-[#2C3530] relative overflow-hidden">
          <h3 className="text-base font-bold text-[#3E4E36] dark:text-[#E2E8F0] mb-2">
            Support Hours
          </h3>
          <p className="text-xs md:text-sm text-[#3E4E36]/80 dark:text-[#94A3B8] leading-relaxed">
            Our expert support team is available to assist you from Saturday to Thursday,
            <br />
            <span className="font-bold text-[#446C4F] dark:text-[#528B63] mt-1 inline-block">
              9 AM - 6 PM (Saudi Arabia Time)
            </span>
          </p>
        </div>

      </div>
    </div>
  );
}