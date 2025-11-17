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
      <div className='search-wrapper  py-5 px-4'>
        <div className='search-box  position-relative mx-auto'>
          <FaSearch className='searchIcon fs-4' />
          <input
            type="search"
            className='searchInput rounded-5 py-2 border-0 px-5 w-100'
            placeholder='Search for herbs...'
          />
        </div>
      </div>
      <div className="container-fluid px-lg-5 px-md-4 px-3 ">
        <div className="categories py-4">
          <ul className='list-unstyled d-flex gap-3 mb-0 overflow-x-auto flex-nowrap'>
            {
              categories.map(cat=><li key={cat} className={`pointer cat ${activeCat===cat?'active':''}`}
              onClick={()=>setActiveCat(cat)}>{cat}</li>)
            }
          </ul>
        </div>
      </div>
      <div className="container-fluid px-lg-5 px-md-4 px-3 my-4">
        <div className="herbas row g-4">
          {herbas.map((herb, idx) => (
            <div key={idx} className="col-6 col-sm-4 col-md-3 col-xxl-2">
              <div className="col-content text-center shadow pb-4 pointer">
                <img className='w-100 cat-img' src={herb.img} alt={herb.name} />
                <p className='aboutIcone mt-1'>{herb.category}</p>
                <p className='mt-1'>{herb.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
