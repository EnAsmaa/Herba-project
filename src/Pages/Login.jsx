import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <>
      <div className="w-3/4 mx-auto my-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 rounded-xl border border-white/50">



          {/* Left side */}
          <div className="py-10 px-6 flex flex-col justify-center">
            <form className="space-y-6">

              {/* Email */}
              <div className="flex flex-col">
                <label className="text-gray-700 font-medium mb-1">Email Address</label>
                <input
                  type="email"
                  className="border rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-green-500"
                  placeholder="name@example.com"
                />
              </div>

              {/* Password */}
              <div className="flex flex-col">
                <label className="text-gray-700 font-medium mb-1">Password</label>
                <input
                  type="password"
                  className="border rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-green-500"
                  placeholder="Password"
                />
              </div>

              {/* CTA */}
              <div className="flex items-center gap-2">
                <button className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-lg transition">
                  Login
                </button>

                <span className="dark:text-white text-gray-800">
                  Has no account?{" "}
                  <Link className="text-green-700 font-semibold" to="/register">
                    Register Now
                  </Link>
                </span>
              </div>
            </form>
          </div>

          {/* Right side */}
          <div className="bg-green-700/5 py-10 flex justify-center items-center rounded-l-xl">
            <p className="text-white font-bold text-3xl">Welcome Back</p>
          </div>

        </div>
      </div>
    </>

  );
}
