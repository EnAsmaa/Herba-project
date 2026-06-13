// ProfileSettings.jsx
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Input, SelectItem, Select, Button } from "@heroui/react";
import axios from "axios";
import { getProfileDataAPI, updateUserData } from "../Services/UserProfile";
import { profileSchema } from "../Schema/UserProfileSchema";
import { UserContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


export default function Profile() {
  const [isloading, setIsLoading] = useState(false);
  const { setUserProfileData } = useContext(UserContext);
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors, touchedFields },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      birthDate: "",
      gender: "male",
      userType: "",
      address: "",
      idealWeight: 0
    },
    resolver: zodResolver(profileSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const submit = async (userData) => {
    setIsLoading(true);
    const formattedData = {
      ...userData,
      birthDate: new Date(userData.birthDate).toISOString(),
    };
    try {
      const res = await updateUserData(formattedData);
      console.log(res)
      if (res.success) {
        const getuserData = await getProfileDataAPI();
        setUserProfileData(getuserData.data);
        toast.success(res.message)
        navigate('/');
      }
    } catch (err) {
      toast.error(err?.message)
    } finally {

      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 text-[#3E4E36] dark:bg-[#1A1F1C] dark:text-[#E2E8F0] py-12 px-4 font-sans transition-colors duration-200">
      <div className="w-full max-w-3xl mx-auto">

        {/* Page Title */}
        <h1 className="text-2xl md:text-3xl font-black text-center text-[#3E4E36] dark:text-[#E2E8F0] mb-8">
          Profile Settings
        </h1>

        {/* Form Container */}
        <div className="bg-white dark:bg-[#232925] border border-gray-100 dark:border-[#2C3530] rounded-2xl p-6 md:p-10 shadow-sm">
          <h3 className="text-lg font-bold mb-6 text-center text-[#446C4F] dark:text-[#528B63] flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#446C4F] dark:bg-[#528B63] rounded-full"></span>
            Personal Information
            <span className="w-1.5 h-1.5 bg-[#446C4F] dark:bg-[#528B63] rounded-full"></span>
          </h3>

          <form
            onSubmit={handleSubmit(submit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {/* First Name */}
            <div className="flex flex-col gap-1">
              <label className="text-xs md:text-sm font-bold text-[#3E4E36] dark:text-[#E2E8F0]">First Name*</label>
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

            {/* Last Name */}
            <div className="flex flex-col gap-1">
              <label className="text-xs md:text-sm font-bold text-[#3E4E36] dark:text-[#E2E8F0]">Last Name*</label>
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

            {/* Birth Date */}
            <div className="flex flex-col gap-1">
              <label className="text-xs md:text-sm font-bold text-[#3E4E36] dark:text-[#E2E8F0]">Birth Date*</label>
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
            <div className="flex flex-col gap-1">
              <label className="text-xs md:text-sm font-bold text-[#3E4E36] dark:text-[#E2E8F0]">Address*</label>
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

            {/* Ideal Weight */}
            <div className="flex flex-col gap-1 md:col-span-2">
              <label className="text-xs md:text-sm font-bold text-[#3E4E36] dark:text-[#E2E8F0]">
                Ideal Weight (kg)*
              </label>
              <Input
                type="number"
                variant="bordered"
                placeholder="70"
                {...register("idealWeight")}
                isInvalid={Boolean(errors.idealWeight) && touchedFields.idealWeight}
                errorMessage={errors.idealWeight?.message}
                className="dark:text-white"
              />
            </div>

            {/* Save Button */}
            <div className="md:col-span-2 flex justify-end pt-4 mt-2 border-t border-gray-100 dark:border-[#2C3530]/40">
              <Button
                type="submit"
                isLoading={isloading}
                className="w-full sm:w-auto bg-[#446C4F] dark:bg-[#528B63] text-white px-8 py-2.5 rounded-xl font-bold text-sm shadow-sm hover:opacity-95 transition-all active:scale-95"
              >
                Save Info
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
