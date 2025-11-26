import React from 'react'
import { FaSearch } from "react-icons/fa";

export default function Search({placehoder}) {
    return <>
        {/* Search Section */}
        <div className='search-wrapper bg-green-800/10 py-8 rounded-lg'>
            <div className='search-box relative mx-auto w-2xs sm:w-sm md:w-md lg:w-lg'>
                <FaSearch className='absolute text-gray-500 -translate-y-1/2 top-1/2 left-3 cursor-pointer fs-4' />
                <input
                    type="search"
                    className='placeholder:text-gray-500 dark:placeholder:text-[#8696A0] placeholder:italic bg-gray-50 text-gray-900 border border-gray-300 dark:border-[#2E3B42] dark:bg-[#1F2C32] dark:text-white focus:outline-0 rounded-lg py-2 px-8 w-full '
                    placeholder={`Search for ${placehoder}...`}
                />
            </div>
        </div>
    </>
}
