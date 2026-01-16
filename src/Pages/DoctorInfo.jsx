import React from 'react'
import { LuImagePlus } from "react-icons/lu";
import { Select, SelectItem } from "@heroui/react";
import { NumberInput } from "@heroui/react";
import { Textarea } from "@heroui/react";
import { Input } from "@heroui/react";
import {Button} from "@heroui/react";
import { IoIosArrowForward } from "react-icons/io";


export default function DoctorInfo() {
    return <>
        <section className='my-5 py-5 px-4 lg:px-7 container mx-auto space-y-5'>
            <div className=' p-5 w-full sm:w-sm md:w-md lg:w-2xl mx-auto rounded-lg bg-green-800/10 '>
                <div className="header text-center space-y-3">
                    <div className='w-20 aspect-square rounded-full flex justify-center items-center bg-gray-100 mx-auto'><LuImagePlus className='text-green-800 text-3xl' /></div>
                    <h2 className='text-3xl font-bold'>Docotor Information</h2>
                    <p>Complete Your Medical Profile To Get Started</p>
                </div>
                <div className="body">
                    <form action="" className='space-y-6'>
                        <div className='flex flex-col gap-1'>
                            <label className="text-gray-700 dark:text-gray-300 font-medium mb-1">Specialty</label>
                            <Select className="w-full" label="Select Your Specialty">
                                <SelectItem>Lorem, ipsum dolor.</SelectItem>
                                <SelectItem>Lorem, ipsum.</SelectItem>
                                <SelectItem>ipsum dolor.</SelectItem>
                                <SelectItem>Lorem.</SelectItem>
                            </Select>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label className="text-gray-700 dark:text-gray-300 font-medium mb-1">Years of Experiance</label>
                            <NumberInput className="w-full" label="Enter Years of Experiance" />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label className="text-gray-700 dark:text-gray-300 font-medium mb-1">About You</label>
                            <Textarea className="w-full" label="write a brief about your experince and qualifications..." />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label className="text-gray-700 dark:text-gray-300 font-medium mb-1">Consultation Fee (USD)</label>
                            <Input
                                className="w-full"
                                label="enter consultation fee"
                                type="text"
                            />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label className="text-gray-700 dark:text-gray-300 font-medium mb-1">Available Hours</label>
                            <Input
                                className="w-full"
                                placeholder="EX: 9AM - 5PM"
                                type="text"
                            />
                        </div>
                        <Button className="bg-[#2b7945] dark:bg-[#538865] text-white font-semibold w-full flex items-center py-6">Continue <IoIosArrowForward /></Button>
                    </form>
                </div>
            </div>
        </section>
    </>
}
