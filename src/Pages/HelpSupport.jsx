// HelpSupport.jsx
import React, { useState } from "react";

export default function HelpSupport() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
          Help & Support
        </h1>

        {/* Container */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md space-y-8">

          {/* Contact Info */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
              Contact Us
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Having trouble with something? Send us a message and we’ll get back to you as soon as possible.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Your full name"
                className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 
                focus:ring-green-600 focus:border-green-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@mail.com"
                className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100
                focus:ring-green-600 focus:border-green-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="How can we help you?"
                className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100
                focus:ring-green-600 focus:border-green-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Message
              </label>
              <textarea
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Describe your issue or message..."
                className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100
                focus:ring-green-600 focus:border-green-600"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2 bg-green-700 hover:bg-green-800 text-white 
              dark:text-black rounded-lg font-semibold transition-colors duration-300"
            >
              Send Message
            </button>
          </form>

          {/* Footer Info */}
          <div className="pt-6 border-t border-gray-300 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <p>Email support: support@yourapp.com</p>
            <p>We usually reply within 24 hours.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
