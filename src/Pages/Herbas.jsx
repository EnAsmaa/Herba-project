import React, { useEffect, useState } from 'react'
import OurVision1 from "../assets/OurVision.jpg";
import OurVision2 from "../assets/OurVision2.jpg";
import OurVision3 from "../assets/pexels-mareefe-672046.jpg";
import Search from './../components/Search';
import { FaHeart } from "react-icons/fa";


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
      <section className='container lg:px-7 px-4 mx-auto py-4'>
        {/* search */}
        <Search />

        <div className="categories">
          <ul className='list-none mt-2 flex gap-5 mb-0 overflow-x-auto flex-nowrap scrollbar-hide py-4'>
            {
              categories.map(cat => <li key={cat} className={`cursor-pointer bg-green-200/10 text-black dark:text-white px-4 py-1.5 rounded-md whitespace-nowrap ${activeCat === cat ? 'cat-active' : ''}`}
                onClick={() => setActiveCat(cat)}>{cat}</li>)
            }
          </ul>
        </div>

        <div className="herbas grid grid-cols-[repeat(auto-fit,minmax(150px,.5fr))] gap-4">
          {herbas.map((herb, idx) => (
            <div key={idx} className="pb-2 slider-images shadow-md pointer bg-green-200/10 rounded-lg overflow-hidden text-center my-5 relative">
              <img className='w-full cat-img' src={herb.img} alt={herb.name} />
              <p className='aboutIcone mt-1'>{herb.category}</p>
              <p className='mt-1'>{herb.name}</p>
              <FaHeart className='text-red-800 hover:text-red-800 opacity-80 hover:opacity-100 text-xl absolute top-2 right-2 cursor-pointer hover:scale-110 duration-300'/>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
