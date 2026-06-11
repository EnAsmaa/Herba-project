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
    console.log(response);
    if (response.isSuccess) {
      navigate("/login");
    } else {
      setApiError(response.message);
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="sm:w-3/4 md:w-1/2 p-8  mx-auto my-12  bg-white dark:bg-[#1A242A] border border-gray-300 dark:border-gray-700 shadow rounded-lg ">
        <h2 className="mx-auto text-center font-bold text-2xl text-[#14532D] dark:text-white ">
          Register Now
        </h2>
        <form
          onSubmit={handleSubmit(submit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6  mt-5"
        >
          {/* FirstName */}
          <div className="flex flex-col">
            <label className="text-gray-700 dark:text-gray-300 font-medium mb-1">
              FirstName*
            </label>
            <Input
              type="text"
              variant="bordered"
              className=" rounded-lg bg-transparent focus:outline-none "
              {...register("firstName")}
              isInvalid={Boolean(errors.firstName) && touchedFields.firstName}
              errorMessage={errors.firstName?.message}
            />
          </div>

          {/* Lastname */}
          <div className="flex flex-col">
            <label className="text-gray-700 dark:text-gray-300 font-medium mb-1">
              LastName*
            </label>
            <Input
              type="text"
              variant="bordered"
              className="rounded-lg bg-transparent focus:outline-none focus:ring focus:ring-green-500"
              {...register("lastName")}
              isInvalid={Boolean(errors.lastName) && touchedFields.lastName}
              errorMessage={errors.lastName?.message}
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-gray-700 dark:text-gray-300 font-medium mb-1">
              Email*
            </label>
            <Input
              type="email"
              variant="bordered"
              className=" rounded-lg bg-transparent focus:outline-none focus:ring focus:ring-green-500"
              {...register("email")}
              isInvalid={Boolean(errors.email) && touchedFields.email}
              errorMessage={errors.email?.message}
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="relative text-gray-700 dark:text-gray-300 font-medium mb-1">
              Password*
              {shownPasswrd === true ? (
                <IoEyeOffOutline
                  onClick={() => {
                    setShownPassword(!shownPasswrd);
                  }}
                  size={20}
                  className="absolute -bottom-9 end-4 cursor-pointer z-50"
                />
              ) : (
                <IoEyeOutline
                  onClick={() => {
                    setShownPassword(!shownPasswrd);
                  }}
                  size={20}
                  className="absolute -bottom-9 end-4 cursor-pointer z-50"
                />
              )}
            </label>
            <Input
              type={shownPasswrd === true ? "text" : "password"}
              variant="bordered"
              className=" rounded-lg bg-transparent focus:outline-none focus:ring focus:ring-green-500"
              {...register("password")}
              isInvalid={Boolean(errors.password) && touchedFields.password}
              errorMessage={errors.password?.message}
            />
          </div>

          {/* Gender */}
          <div className="flex flex-col">
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
          <div className="flex flex-col">
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

          {/* Phone */}
          <div className="flex flex-col">
            <label className="text-gray-700 dark:text-gray-300 font-medium mb-1">
              Phone*
            </label>
            <Input
              type="tel"
              variant="bordered"
              className=" rounded-lg bg-transparent focus:outline-none focus:ring focus:ring-green-500"
              {...register("phone")}
              isInvalid={Boolean(errors.phone) && touchedFields.phone}
              errorMessage={errors.phone?.message}
            />
          </div>

          {/* BirthDate */}
          <div className="flex flex-col">
            <label className="text-gray-700 dark:text-gray-300 font-medium mb-1">
              BirthDate*
            </label>
            <Input
              type="date"
              variant="bordered"
              className=" rounded-lg bg-transparent focus:outline-none focus:ring focus:ring-green-500"
              {...register("birthDate")}
              isInvalid={Boolean(errors.birthDate) && touchedFields.birthDate}
              errorMessage={errors.birthDate?.message}
            />
          </div>

          {/* Address */}
          <div className="flex flex-col">
            <label className="text-gray-700 dark:text-gray-300 font-medium mb-1">
              Address*
            </label>
            <Input
              type="text"
              variant="bordered"
              className=" rounded-lg bg-transparent focus:outline-none focus:ring focus:ring-green-500"
              {...register("address")}
              isInvalid={Boolean(errors.address) && touchedFields.address}
              errorMessage={errors.address?.message}
            />
          </div>

          {/* Specialty */}
          <div className="flex flex-col">
            <label className="text-gray-700 dark:text-gray-300 font-medium mb-1">
              Specialty
            </label>
            <Input
              type="text"
              variant="bordered"
              className=" rounded-lg bg-transparent focus:outline-none focus:ring focus:ring-green-500"
              {...register("specialty")}
              isInvalid={Boolean(errors.specialty) && touchedFields.specialty}
              errorMessage={errors.specialty?.message}
            />
          </div>

          {/* Button - FULL WIDTH */}
          <div className="md:col-span-2 flex flex-col md:flex-row items-start md:items-center gap-3 ">
            <Button
              type="submit"
              className="bg-[#3a5543] dark:bg-[#26804a] hover:bg-green-800 text-white px-6 py-2 rounded-lg"
              isLoading={loading}
            >
              Create Account
            </Button>

            <span>
              Already have an account?{" "}
              <Link className="text-green-700 dark:text-[#57d88a] " to="/login">
                Login
              </Link>
            </span>
          </div>
          {apiError && (
            <span className=" flex items-center justify-center text-red-500 text-sm">
              {apiError}
            </span>
          )}
        </form>
      </div>
    </>
  );
}
