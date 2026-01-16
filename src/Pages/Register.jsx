import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { Select, SelectItem } from "@heroui/react";

const schema = zod
  .object({
    // name validation
    name: zod
      .string()
      .nonempty("name is required")
      .max(10, "name must be at max 10 chars")
      .min(3, "name must be at least 3 chars"),
    // username validation
    username: zod
      .string()
      .nonempty("username is required")
      .regex(/^[a-zA-Z0-9_]{3,16}$/, "username is in valid"),
    // email validation
    email: zod
      .string()
      .nonempty("email is required")
      .regex(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "email is in valid"
      ),
    // password validation
    password: zod
      .string()
      .nonempty("password is required")
      .regex(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        "password is in valid"
      ),
    // rePassword validation
    rePassword: zod.string().nonempty("confirm password is required"),
  })
  .refine((userData) => userData.password === userData.rePassword, {
    path: ["rePassword"],
    message: "password and confirm password don't match",
  });

export default function Register() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      rePassword: "",
    },
    resolver: zodResolver(schema),
  });

  const submit = (userData) => {
    console.log(userData);
  };

  return (
    <>
      <div className="w-3/4 mx-auto my-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 rounded-xl border border-gray-400  shadow-lg">
          {/* Left side */}
          <div className="bg-[#3a5543] py-10 flex justify-center items-center md:rounded-tr-none md:dark:rounded-br-none rounded-b-none rounded-xl md:rounded-l-xl">
            <p className="text-white font-bold text-3xl">Register Now</p>
          </div>

          {/* Right side */}
          <div className="py-10 px-6 flex flex-col justify-center">
            <form onSubmit={handleSubmit(submit)} className="space-y-6">
              {/* Name */}
              <div className="flex flex-col">
                <label className="text-gray-700 dark:text-gray-300 font-medium mb-1">
                  Name*
                </label>
                <input
                  type="text"
                  className="border border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-green-500"
                  placeholder="Abdelrhman"
                  {...register("name")}
                />
                <p className="text-red-600 text-sm mt-1">
                  {errors.name?.message}
                </p>
              </div>

              {/* username */}
              <div className="flex flex-col">
                <label className="text-gray-700 dark:text-gray-300 font-medium mb-1">
                  Username*
                </label>
                <input
                  type="text"
                  className="border border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-green-500"
                  placeholder="Abdelrhman"
                  {...register("username")}
                />
                <p className="text-red-600 text-sm mt-1">
                  {errors.username?.message}
                </p>
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <label className="text-gray-700 dark:text-gray-300 font-medium mb-1">
                  Email Address*
                </label>
                <input
                  type="email"
                  className="border border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-green-500"
                  placeholder="name@example.com"
                  {...register("email")}
                />
                <p className="text-red-600 text-sm mt-1">
                  {errors.email?.message}
                </p>
              </div>

              {/* Password */}
              <div className="flex flex-col">
                <label className="text-gray-700 dark:text-gray-300 font-medium mb-1">
                  Password*
                </label>
                <input
                  type="password"
                  className="border border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-green-500"
                  placeholder="Password"
                  {...register("password")}
                />
                <p className="text-red-600 text-sm mt-1">
                  {errors.password?.message}
                </p>
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col">
                <label className="text-gray-700 dark:text-gray-300 font-medium mb-1">
                  Confirm Password*
                </label>
                <input
                  type="password"
                  className="border border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-green-500"
                  placeholder="Confirm Password"
                  {...register("rePassword")}
                />
                <p className="text-red-600 text-sm mt-1">
                  {errors.rePassword?.message}
                </p>
              </div>
              {/* select  */}
              <div className="flex flex-col">
                <label className="text-gray-700 dark:text-gray-300 font-medium mb-1">
                  Account Type*
                </label>
                <Select
                  defaultSelectedKeys={["Doctor"]}
                  className="max-w-full"
                  classNames={{
                    trigger: "bg-transparent border border-gray-400 data-[focus=true]:border-green-500   hover:bg-transparent data-[hover=true]:bg-transparent data-[focus=true]:bg-transparent",
                    value: "text-gray-900",
                    label: "text-gray-500",
                  }}
                >
                  <SelectItem key="Doctor" >Doctor</SelectItem>
                  <SelectItem key="User">User</SelectItem>
                </Select>

                <p className="text-red-600 text-sm mt-1"></p>
              </div>
              {/* cv input */}
                            <div className="flex flex-col">
                <label className="text-gray-700 dark:text-gray-300 font-medium mb-1">
                  Upload CV*
                </label>
                <input
                  type="file"
                  className="border border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-green-500"
                />
                <p className="text-red-600 text-sm mt-1">
                </p>
              </div>
              {/* CTA */}
              <div className="flex items-center gap-2 mt-4">
                <button
                  type="submit"
                  className="bg-[#3a5543] hover:bg-green-800 text-white px-6 py-2 rounded-lg transition"
                >
                  Create Account
                </button>
                <span className="text-gray-800 dark:text-white">
                  Already have an account?{" "}
                  <Link
                    className="text-[#2b7945] dark:text-[#538865] font-semibold"
                    to="/login"
                  >
                    Login Now
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
