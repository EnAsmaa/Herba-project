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
      localStorage.setItem('loginToken', response.token);
      setIslogin(true);
      const role = response.userType === 0 ? 'user' : 'doctor'
      localStorage.setItem('role', role);
      setRole(role)
      navigate("/");
    }
    else {
      setApiError(response.message);
    }
  };
  return (
    <>
      <div className="max-w-md mx-auto my-12 py-12 ">
        <div className="grid grid-cols-1  rounded-xl border bg-white dark:bg-[#1A242A]  dark:border-gray-700 border-gray-300 shadow">
          <h2 className="mx-auto text-center font-bold mt-4 text-2xl text-[#14532D] dark:text-white ">
            Login Now
          </h2>
          <div className="pb-10 pt-5 px-6 flex flex-col justify-center">
            <form onSubmit={handleSubmit(login)} className="space-y-6">
              {/* Email */}
              <div className="flex flex-col">
                <label className="text-gray-700 dark:text-gray-300 font-medium mb-1">
                  Email Address
                </label>
                <Input
                  type="email"
                  placeholder="name@example.com"
                  variant="bordered"
                  {...register("email")}
                  isInvalid={Boolean(errors.email) && touchedFields.email}
                  errorMessage={errors.email?.message}
                />
              </div>

              {/* Password */}
              <div className="flex flex-col">
                <label className="relative text-gray-700 dark:text-gray-300 font-medium mb-1">
                  Password
                  {
                    shownPasswrd === true ? <IoEyeOffOutline onClick={() => { setShownPassword(!shownPasswrd) }} size={20} className="absolute -bottom-9 end-4 cursor-pointer z-50" /> : <IoEyeOutline onClick={() => { setShownPassword(!shownPasswrd) }} size={20} className="absolute -bottom-9 end-4 cursor-pointer z-50" />
                  }

                </label>
                <Input
                  type={shownPasswrd === true ? 'text' : 'password'}
                  placeholder="Password"
                  variant="bordered"
                  {...register("password")}
                  isInvalid={Boolean(errors.password) && touchedFields.password}
                  errorMessage={errors.password?.message}
                />
              </div>

              {/* CTA */}
              <div className="flex items-center gap-2">
                <Button
                  type="submit"
                  isLoading={loading}
                  className="bg-[#3a5543] dark:bg-[#26804a] hover:bg-green-800 text-white px-6 py-2 rounded-lg transition"
                >
                  Login
                </Button>

                <span className="dark:text-white text-gray-800">
                  Has no account?{" "}
                  <Link
                    className="text-[#2b7945] dark:text-[#57d88a] "
                    to="/register"
                  >
                    Sign Up
                  </Link>
                </span>
              </div>
              {apiError && <span className=" flex items-center justify-center text-red-500 text-sm">{apiError}</span>}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
