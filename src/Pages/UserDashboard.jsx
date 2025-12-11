import React, { useState } from 'react';
import { PiPlantFill } from "react-icons/pi";
import { FaUsers } from "react-icons/fa";
import { FaQuestionCircle } from "react-icons/fa";
import { FaTrophy } from "react-icons/fa";
import { TfiStatsUp } from "react-icons/tfi";
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import DashboardRouting from '../components/DashboardRouting';

export default function UserDashboard() {
    const [value, setValue] = useState(dayjs());

    return <>
        <section>
            <div className='container lg:px-7 px-4 mx-auto bg-[#e6f0ea] dark:bg-green-950/20 py-10 flex flex-wrap xl:flex-nowrap gap-8 '>
                {/* sidebar info */}
                <div className="sidebarNavigation w-full xl:w-1/5 bg-white dark:bg-gray-200 text-black rounded-lg p-4  lg:block">
                    <h2 className='text-xl font-bold mb-1 text-[#335D39]'>General Info</h2>
                    <p>User Statistics</p>
                    <ul className='space-y-6 mt-5 flex flex-wrap xl:block'>
                        <li className='flex items-center gap-3 text-md font-medium w-full sm:w-1/2 xl:w-full'>
                            <span className="text-2xl text-[#335D39]"><PiPlantFill /></span>
                            <span className=" text-[#335D39]">New Herbas:</span>
                            <span>12</span>
                        </li>
                        <li className='flex items-center gap-3 text-md font-medium w-full sm:w-1/2 xl:w-full'>
                            <span className="text-2xl text-[#335D39]"><FaUsers /></span>
                            <span className="text-[#335D39]">Active Users:</span>
                            <span>4005</span>
                        </li>
                        <li className='flex items-center gap-3 text-md font-medium w-full sm:w-1/2 xl:w-full'>
                            <span className="text-xl text-[#335D39]"><FaQuestionCircle /></span>
                            <span className="text-[#335D39]">Quizes Completed:</span>
                            <span>192</span>
                        </li>
                        <li className='flex items-center gap-3 text-md font-medium w-full sm:w-1/2 xl:w-full'>
                            <span className="text-xl text-[#335D39]"><FaTrophy /></span>
                            <span className="text-[#335D39]">Points Earned:</span>
                            <span>500001</span>
                        </li>
                        <li className='flex items-center gap-3 text-md font-medium w-full sm:w-1/2 xl:w-full'>
                            <span className="text-2xl text-[#335D39]"><TfiStatsUp /></span>
                            <span className="text-[#335D39]">Growth Rate:</span>
                            <span>+18%</span>
                        </li>
                    </ul>
                </div>
                <div className="dashboard w-full xl:w-4/5 text-black rounded-lg flex gap-5 flex-wrap">
                    {/* calender */}
                    <div className="w-full bg-white dark:bg-gray-200 text-black rounded-md">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DateCalendar', 'DateCalendar']}>
                                <DemoItem >
                                    <DateCalendar
                                        value={value}
                                        onChange={(newValue) => setValue(newValue)}
                                        sx={{
                                            width: "100%",
                                            "& .MuiPickersDay-root.Mui-selected": {
                                                backgroundColor: "#335D39cc",
                                                color: "black",
                                            },
                                            "& .MuiPickersDay-root.Mui-selected:hover": {
                                                backgroundColor: "#6BB683",
                                            },
                                            "& .MuiPickersDay-root.Mui-selected:focus": {
                                                backgroundColor: "#335D39cc",
                                            },
                                        }}
                                    />
                                </DemoItem>
                            </DemoContainer>
                        </LocalizationProvider>
                    </div>
                    <DashboardRouting />
                </div>
            </div>
        </section>
    </>
}
