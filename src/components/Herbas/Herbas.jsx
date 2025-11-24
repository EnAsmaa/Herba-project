import React, { useEffect, useState } from 'react'
import OurVision1 from "../../assets/OurVision.jpg";
import OurVision2 from "../../assets/OurVision2.jpg";
import OurVision3 from "../../assets/pexels-mareefe-672046.jpg";
import { FaSearch } from "react-icons/fa";

export default function Herbas() {
  const [activeCat, setActiveCat] = useState('All');
  const herbas = [
    { img: OurVision1, category: "category", name: "Herb 1" },
    { img: OurVision2, category: "category", name: "Herb 2" },
    { img: OurVision3, category: "category", name: "Herb 3" },
    { img: OurVision3, category: "category", name: "Herb 4" },
    { img: OurVision1, category: "category", name: "Herb 5" },
    { img: OurVision3, category: "category", name: "Herb 6" },
  ];
  const categories = [
    "All", "Anti-inflammatory herbs", "Antimicrobial / Antiseptic herbs", "Digestive herbs", "Detoxifying herbs",
    "Calming / Sedative herbs", "Stimulant herbs", "Expectorant herbs", "Immunomodulating herbs"
  ];
  return (
    <>
      <div className='search-wrapper py-5 px-4'>
        <div className='search-box relative mx-auto w-2xs sm:w-sm md:w-md lg:w-lg'>
          <FaSearch className='absolute text-gray-500 -translate-y-1/2 top-1/2 left-3 cursor-pointer fs-4' />
          <input
            type="search"
            className='bg-gray-400 dark:bg-gray-100 text-gray-50 dark:text-black focus:outline-0 rounded-lg py-2 border-0 px-8 w-full '
            placeholder='Search for herbs...'
          />
        </div>
      </div>
      <div className="categories">
        <ul className='list-none flex gap-5 mb-0 overflow-x-auto flex-nowrap scrollbar-hide py-4'>
          {
            categories.map(cat => <li key={cat} className={`cursor-pointer whitespace-nowrap bg-green-200 text-gray-700 p-3 rounded-md ${activeCat === cat ? 'active' : ''}`}
              onClick={() => setActiveCat(cat)}>{cat}</li>)
          }
        </ul>
      </div>
      <div className="herbas grid grid-cols-[repeat(auto-fit,minmax(150px,.5fr))] gap-4">
        {herbas.map((herb, idx) => (
          <div key={idx} className="text-center rounded-md overflow-hidden shadow-sm pb-4 pointer bg-gray-100 text-black">
            <img className='w-full cat-img' src={herb.img} alt={herb.name} />
            <p className='aboutIcone mt-1'>{herb.category}</p>
            <p className='mt-1'>{herb.name}</p>
          </div>
        ))}
      </div>
    </>
  )
}
