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
    answer: "Use the search bar to find herbs بسهولة.",
  },
  {
    question: "What are Premium features?",
    answer: "Premium features give you advanced tools and insights.",
  },
  {
    question: "How does herb image analysis work?",
    answer: "Upload an image and our AI analyzes it.",
  },
  {
    question: "How do I book a consultation with an expert?",
    answer: "Go to consultations section and book directly.",
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
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-main py-5 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <h2 className="text-3xl font-bold text-emerald-950 mb-6">
          Help & Support
        </h2>

        {/* Contact */}
        <h2 className="text-xl font-semibold mb-4 text-emerald-950">Contact Us</h2>
        <div className="space-y-4 mb-8">
          {contactOptions.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-5 shadow-sm flex  items-center gap-3 hover:shadow-md transition cursor-pointer"
            >
              <div className="p-3 text-xl font-bold bg-[#5ab67f42] rounded-full text-[#14532D]">
                {item.icon}
              </div>
              <div className="flex   items-center justify-between w-full">
                <div>
                  <h3 className="font-semibold text-gray-800">{item.title}</h3>
                  <p className="text-gray-500 text-sm">{item.description}</p>
                </div>
                <span className="text-gray-500">
                  <FaAngleRight />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <h2 className="text-xl font-semibold mb-4 text-emerald-950">
          Frequently Asked Questions
        </h2>
        <div className="bg-white rounded-xl p-5 shadow-sm mb-8">
          {faqs.map((item, i) => (
            <div key={i} className="border-b border-gray-300 py-4">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setOpen(!open)}
              >
                <h4 className="font-medium text-gray-800">{item.question}</h4>
                <span className="text-gray-500">
                  {open ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </span>
              </div>

              {open && (
                <p className="text-gray-500 mt-2 text-sm leading-relaxed">
                  {item.answer}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Resources */}
        <h2 className="text-xl font-semibold mb-4 text-emerald-950">Additional Resources</h2>
        <div className="space-y-4">
          {resources.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-5 shadow-sm flex gap-3 items-center hover:shadow-md transition cursor-pointer"
            >
              <div className="p-3 text-lg font-bold bg-[#5ab67f42] rounded-full text-[#14532D]">
                {item.icon}
              </div>
              <div className="flex w-full justify-between">
                <div>
                  <h3 className="font-semibold text-gray-800">{item.title}</h3>
                  <p className="text-gray-500 text-sm">{item.description}</p>
                </div>
                <span className="text-gray-500">{<FaAngleRight />}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Support Hours */}
        <div className="bg-green-100 rounded-2xl p-6 mt-8">
          <h3 className="font-semibold text-gray-800 mb-2 ">Support Hours</h3>
          <p className="text-gray-600 leading-relaxed">
            We are available to help you from Saturday to Thursday,
            <br />9 AM - 6 PM (Saudi Arabia Time)
          </p>
        </div>
      </div>
    </div>
  );
}
