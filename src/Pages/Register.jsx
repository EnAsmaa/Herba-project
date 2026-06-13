import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { Select, SelectItem, Input, Button } from "@heroui/react";
import { schema } from "../Schema/RegisterSchema";
import { registerRequest } from "../Services/Authentication";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import toast from "react-hot-toast";

export default function Register() {
  const [loading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [shownPasswrd, setShownPassword] = useState(false);
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors, touchedFields },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      birthDate: "",
      gender: "male",
      userType: "",
      phone: "",
      address: "",
      specialty: "",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const submit = async (userData) => {
    setIsLoading(true);
    const formattedData = {
      ...userData,
      birthDate: new Date(userData.birthDate).toISOString(),
    };

    const response = await registerRequest(formattedData);
    if (response?.isSuccess) {
      navigate("/login");
      toast.success('Registeration Succeessfully')
    } else {
      setApiError(response?.message);
      toast.error(response?.message)
    }
    setIsLoading(false);
  };

 return (
    <>
      <div className="min-h-screen bg-gray-50 text-[#3E4E36] dark:bg-[#1A1F1C] dark:text-[#E2E8F0] py-12 px-4 font-sans transition-colors duration-200 flex items-center justify-center">
        <div className="w-full max-w-3xl bg-white dark:bg-[#232925] border border-gray-100 dark:border-[#2C3530] shadow-sm rounded-2xl p-6 md:p-10">
          
          {/* Header Title */}
          <h2 className="text-2xl md:text-3xl font-black text-center text-[#3E4E36] dark:text-[#E2E8F0] mb-8">
            Register Now
          </h2>

          <form
            onSubmit={handleSubmit(submit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {/* FirstName */}
            <div className="flex flex-col gap-1">
              <label className="text-xs md:text-sm font-bold text-[#3E4E36] dark:text-[#E2E8F0]">
                First Name*
              </label>
              <Input
                type="text"
                variant="bordered"
                placeholder="John"
                {...register("firstName")}
                isInvalid={Boolean(errors.firstName) && touchedFields.firstName}
                errorMessage={errors.firstName?.message}
                className="dark:text-white"
              />
            </div>

            {/* LastName */}
            <div className="flex flex-col gap-1">
              <label className="text-xs md:text-sm font-bold text-[#3E4E36] dark:text-[#E2E8F0]">
                Last Name*
              </label>
              <Input
                type="text"
                variant="bordered"
                placeholder="Doe"
                {...register("lastName")}
                isInvalid={Boolean(errors.lastName) && touchedFields.lastName}
                errorMessage={errors.lastName?.message}
                className="dark:text-white"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1">
              <label className="text-xs md:text-sm font-bold text-[#3E4E36] dark:text-[#E2E8F0]">
                Email*
              </label>
              <Input
                type="email"
                variant="bordered"
                placeholder="example@email.com"
                {...register("email")}
                isInvalid={Boolean(errors.email) && touchedFields.email}
                errorMessage={errors.email?.message}
                className="dark:text-white"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1 relative">
              <label className="text-xs md:text-sm font-bold text-[#3E4E36] dark:text-[#E2E8F0]">
                Password*
              </label>
              <div className="relative w-full">
                <Input
                  type={shownPasswrd === true ? "text" : "password"}
                  variant="bordered"
                  placeholder="••••••••"
                  {...register("password")}
                  isInvalid={Boolean(errors.password) && touchedFields.password}
                  errorMessage={errors.password?.message}
                  className="dark:text-white w-full"
                />
                <div className="absolute top-[14px] end-4 text-gray-400 dark:text-zinc-500 hover:text-[#446C4F] cursor-pointer z-40">
                  {shownPasswrd === true ? (
                    <IoEyeOffOutline
                      onClick={() => setShownPassword(!shownPasswrd)}
                      size={20}
                    />
                  ) : (
                    <IoEyeOutline
                      onClick={() => setShownPassword(!shownPasswrd)}
                      size={20}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Gender */}
            <div className="flex flex-col justify-end">
              <Select
                label="Gender*"
                variant="bordered"
                defaultSelectedKeys={["Male"]}
                {...register("gender")}
                isInvalid={Boolean(errors.gender)}
                errorMessage={errors.gender?.message}
                className="dark:text-white"
              >
                <SelectItem key="Male" textValue="Male">
                  Male
                </SelectItem>
                <SelectItem key="Female" textValue="Female">
                  Female
                </SelectItem>
              </Select>
            </div>

            {/* Account Type */}
            <div className="flex flex-col justify-end">
              <Select
                label="Account Type*"
                variant="bordered"
                defaultSelectedKeys={["0"]}
                {...register("userType")}
                isInvalid={Boolean(errors.userType)}
                errorMessage={errors.userType?.message}
                className="dark:text-white"
              >
                <SelectItem key="1" textValue="Doctor">
                  Doctor
                </SelectItem>
                <SelectItem key="0" textValue="User">
                  User
                </SelectItem>
              </Select>
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-1">
              <label className="text-xs md:text-sm font-bold text-[#3E4E36] dark:text-[#E2E8F0]">
                Phone*
              </label>
              <Input
                type="tel"
                variant="bordered"
                placeholder="+20 123 456 7890"
                {...register("phone")}
                isInvalid={Boolean(errors.phone) && touchedFields.phone}
                errorMessage={errors.phone?.message}
                className="dark:text-white"
              />
            </div>

            {/* BirthDate */}
            <div className="flex flex-col gap-1">
              <label className="text-xs md:text-sm font-bold text-[#3E4E36] dark:text-[#E2E8F0]">
                Birth Date*
              </label>
              <Input
                type="date"
                variant="bordered"
                {...register("birthDate")}
                isInvalid={Boolean(errors.birthDate) && touchedFields.birthDate}
                errorMessage={errors.birthDate?.message}
                className="dark:text-white"
              />
            </div>

            {/* Address */}
            <div className="flex flex-col gap-1 md:col-span-2">
              <label className="text-xs md:text-sm font-bold text-[#3E4E36] dark:text-[#E2E8F0]">
                Address*
              </label>
              <Input
                type="text"
                variant="bordered"
                placeholder="Cairo, Egypt"
                {...register("address")}
                isInvalid={Boolean(errors.address) && touchedFields.address}
                errorMessage={errors.address?.message}
                className="dark:text-white"
              />
            </div>

            {/* Specialty */}
            <div className="flex flex-col gap-1 md:col-span-2">
              <label className="text-xs md:text-sm font-bold text-[#3E4E36] dark:text-[#E2E8F0]">
                Specialty (For Doctors Only)
              </label>
              <Input
                type="text"
                variant="bordered"
                placeholder="e.g., Phytotherapy, Nutritionist"
                {...register("specialty")}
                isInvalid={Boolean(errors.specialty) && touchedFields.specialty}
                errorMessage={errors.specialty?.message}
                className="dark:text-white"
              />
            </div>

            {/* Actions Footer */}
            <div className="md:col-span-2 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 mt-2 border-t border-gray-100 dark:border-[#2C3530]/40 w-full">
              <Button
                type="submit"
                isLoading={loading}
                className="w-full sm:w-auto bg-[#446C4F] dark:bg-[#528B63] text-white px-8 py-2.5 rounded-xl font-bold text-sm shadow-sm hover:opacity-95 transition-all active:scale-95"
              >
                Create Account
              </Button>

              <span className="text-xs font-medium text-[#3E4E36]/80 dark:text-[#94A3B8]">
                Already have an account?{" "}
                <Link className="text-[#446C4F] dark:text-[#528B63] font-bold hover:underline ml-1" to="/login">
                  Login
                </Link>
              </span>
            </div>

            {/* Global API Error Display */}
            {apiError && (
              <div className="md:col-span-2 w-full p-3 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 text-red-500 text-xs font-bold rounded-xl text-center mt-2 animate-in fade-in duration-200">
                {apiError}
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
