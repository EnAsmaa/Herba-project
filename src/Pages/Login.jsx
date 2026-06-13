import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { Button, Input } from "@heroui/react";
import { schema } from "../Schema/LoginSchema";
import axios from "axios";
import { loginRequest } from "../Services/Authentication";
import { AuthContext } from "../Context/AuthContext";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { getProfileDataAPI } from "../Services/UserProfile";
import toast, { Toaster } from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setIsLoading] = useState(false);
  const [shownPasswrd, setShownPassword] = useState(false)
  const [apiError, setApiError] = useState(null);
  const { setIslogin } = useContext(AuthContext);
  const { setRole } = useContext(AuthContext);
  const {
    handleSubmit,
    register,
    formState: { errors, touchedFields },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
    // mode: "onBlur",
    // reValidateMode: "onBlur",
  });

  const login = async (userData) => {
    setIsLoading(true);
    const response = await loginRequest(userData);
    setIsLoading(false);
    if (response.isSuccess) {
      // token
      localStorage.setItem('loginToken', response.token);
      setIslogin(true);
      // user id
      localStorage.setItem('userId', response.userId);
      setIslogin(true);
      // role
      const role = response.userType === 0 ? 'user' : 'doctor'
      localStorage.setItem('role', role);
      setRole(role);
      
      toast.success("Login Successfully")
      navigate("/");
    }
    else {
      setApiError(response.message);
      toast.error(response.message)

    }
  };return (
    <>
      <div className="min-h-[80vh] flex items-center justify-center p-4 font-sans text-[#3E4E36] dark:text-[#E2E8F0] transition-colors duration-200">
        <div className="w-full max-w-md bg-white dark:bg-[#232925] rounded-2xl border border-gray-100 dark:border-[#2C3530] shadow-sm overflow-hidden">
          
          <h2 className="text-center font-black mt-8 text-2xl text-[#3E4E36] dark:text-[#E2E8F0]">
            Login Now
          </h2>
          
          <div className="pb-8 pt-4 px-6 flex flex-col justify-center">
            <form onSubmit={handleSubmit(login)} className="space-y-5">
              
              {/* Email */}
              <div className="flex flex-col gap-1">
                <label className="text-[#3E4E36] dark:text-[#E2E8F0] font-bold text-sm">
                  Email Address*
                </label>
                <Input
                  type="email"
                  placeholder="name@example.com"
                  variant="bordered"
                  {...register("email")}
                  isInvalid={Boolean(errors.email) && touchedFields.email}
                  errorMessage={errors.email?.message}
                  className="dark:text-white"
                />
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1 relative">
                <label className="text-[#3E4E36] dark:text-[#E2E8F0] font-bold text-sm">
                  Password*
                </label>
                
                <div className="relative w-full flex items-center">
                  <Input
                    type={shownPasswrd === true ? 'text' : 'password'}
                    placeholder="Password"
                    variant="bordered"
                    {...register("password")}
                    isInvalid={Boolean(errors.password) && touchedFields.password}
                    errorMessage={errors.password?.message}
                    className="w-full dark:text-white"
                  />
                  
                  {/* Password Toggle Eye Icon Adjusted cleanly */}
                  <div className="absolute right-3 top-[14px] z-20 text-gray-400 hover:text-[#446C4F] dark:hover:text-[#528B63] transition-colors">
                    {shownPasswrd === true ? (
                      <IoEyeOffOutline onClick={() => setShownPassword(!shownPasswrd)} size={20} className="cursor-pointer" />
                    ) : (
                      <IoEyeOutline onClick={() => setShownPassword(!shownPasswrd)} size={20} className="cursor-pointer" />
                    )}
                  </div>
                </div>
              </div>

              {/* CTA & Toggle link */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <Button
                  type="submit"
                  isLoading={loading}
                  className="w-full sm:w-auto bg-[#446C4F] dark:bg-[#528B63] text-white px-8 py-2.5 rounded-xl font-bold text-sm shadow-sm hover:opacity-95 transition-all active:scale-95"
                >
                  Login
                </Button>

                <span className="text-sm text-[#3E4E36]/80 dark:text-[#94A3B8] font-medium">
                  Have no account?{" "}
                  <Link
                    className="text-[#446C4F] dark:text-[#528B63] font-bold hover:underline ml-1"
                    to="/register"
                  >
                    Sign Up
                  </Link>
                </span>
              </div>

              {/* API Error Message */}
              {apiError && (
                <div className="flex items-center justify-center text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 py-2 px-4 rounded-xl text-xs font-semibold text-center animate-shake mt-2">
                  {apiError}
                </div>
              )}

            </form>
          </div>
        </div>
      </div>
    </>
  );
}
