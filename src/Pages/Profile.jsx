// ProfileSettings.jsx
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input, SelectItem, Select,Button } from "@heroui/react";
import axios from "axios";
import { updateUserData } from "../Services/UserProfile";
import { profileSchema } from "../Schema/UserProfileSchema";
import { getProfileDataAPI } from "../Services/Authentication";

export default function Profile() {
  const [isloading, setIsLoading] = useState(false);
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
      idealWeight:0
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
    const res = await updateUserData(formattedData);
    const getuserData = await getProfileDataAPI();
    console.log(getuserData);
    
  };


  return (
    <div className="min-h-screen py-10 px-4">
      <div className="sm:w-3/4 md:w-1/2  mx-auto">
        <h1 className="text-3xl font-bold text-center text-green-800 mb-8">
          Profile Settings
        </h1>

        <div className="bg-main border border-black/20 dark:border-white/20 rounded-xl p-8 shadow-lg">
          <h3 className="text-xl font-semibold mb-6 text-center">
            Personal Information
          </h3>

          <form
            onSubmit={handleSubmit(submit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* First Name */}
            <div>
              <label className="block mb-2 font-medium">First Name*</label>
              <Input
                type="text"
                variant="bordered"
                {...register("firstName")}
                isInvalid={Boolean(errors.firstName) && touchedFields.firstName}
                errorMessage={errors.firstName?.message}
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block mb-2 font-medium">Last Name*</label>
              <Input
                type="text"
                variant="bordered"
                {...register("lastName")}
                isInvalid={Boolean(errors.lastName) && touchedFields.lastName}
                errorMessage={errors.lastName?.message}
              />
            </div>

            {/* Birth Date */}
            <div>
              <label className="block mb-2 font-medium">Birth Date*</label>
              <Input
                type="date"
                variant="bordered"
                {...register("birthDate")}
                isInvalid={Boolean(errors.birthDate) && touchedFields.birthDate}
                errorMessage={errors.birthDate?.message}
              />
            </div>

            {/* Address */}
            <div className="flex flex-col">
              <label className="block mb-2 font-medium">Address*</label>
              <Input
                type="text"
                variant="bordered"
                {...register("address")}
                isInvalid={Boolean(errors.address) && touchedFields.address}
                errorMessage={errors.address?.message}
              />
            </div>

            {/* Gender */}
            <div className="flex flex-col mt-3">
              <Select
                label="Gender*"
                variant="bordered"
                defaultSelectedKeys={["Male"]}
                {...register("gender")}
                isInvalid={Boolean(errors.gender)}
                errorMessage={errors.gender?.message}
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
            <div className="flex flex-col mt-3">
              <Select
                label="Account Type*"
                variant="bordered"
                defaultSelectedKeys={["0"]}
                {...register("userType")}
                isInvalid={Boolean(errors.userType)}
                errorMessage={errors.userType?.message}
              >
                <SelectItem key="1" textValue="Doctor">
                  Doctor
                </SelectItem>
                <SelectItem key="0" textValue="User">
                  User
                </SelectItem>
              </Select>
            </div>

            {/* IdealWeight */}
            <div className="flex flex-col col-span-2">
              <label className="text-gray-700 dark:text-gray-300 font-medium mb-1">
                IdealWeight*
              </label>
              <Input
                type="number"
                variant="bordered"
                className=" rounded-lg bg-transparent focus:outline-none focus:ring focus:ring-green-500"
                {...register("idealWeight")}
                isInvalid={Boolean(errors.idealWeight) && touchedFields.idealWeight}
                errorMessage={errors.idealWeight?.message}
              />
            </div>
            {/* Save Button */}
            <div className="md:col-span-2 flex flex-col md:flex-row items-start md:items-center gap-3 ">
            <Button
              type="submit"
              className="bg-[#3a5543] dark:bg-[#26804a] hover:bg-green-800 text-white px-6 py-2 rounded-lg"
              isLoading={isloading}
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
