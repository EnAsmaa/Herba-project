import { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import OurVision1 from "../assets/OurVision.jpg";
import OurVision2 from "../assets/OurVision2.jpg";
import OurVision3 from "../assets/pexels-mareefe-672046.jpg";
import { FaCartShopping } from "react-icons/fa6";
import Search from './../components/Search';

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All",
    "For Skin",
    "For Hair",
    "Slimming",
    "For Sleep",
    "Energy",
    "For Digestion",
    "For Relaxation",
    "For Immunity",
  ];

  const herbas = [
    { img: OurVision1, category: "category", name: "Herb 1" },
    { img: OurVision2, category: "category", name: "Herb 2" },
    { img: OurVision3, category: "category", name: "Herb 3" },
    { img: OurVision3, category: "category", name: "Herb 4" },
    { img: OurVision1, category: "category", name: "Herb 5" },
    { img: OurVision3, category: "category", name: "Herb 6" },
  ];

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 4000,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <section className="container lg:px-7 px-4 mx-auto py-4">
        {/* search */}
        <Search />

        {/* Categories */}
        <div className="categories py-3 mt-2">
          <ul className="list-none flex gap-5 mb-0 justify-center overflow-x-auto flex-nowrap">
            {categories.map((cat) => (
              <li
                key={cat}
                className={`cursor-pointer bg-green-200/10 text-black dark:text-white px-4 py-1.5 rounded-md ${activeCategory === cat ? "cat-active" : ""
                  }`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </li>
            ))}
          </ul>
        </div>

        <div className="slider-wrapper mb-4">
          <Slider {...settings}>
            {herbas.map((herb, id) => (
              <div className="p-3" key={id}>
                <div className="pb-3 my-5 slider-images shadow-md pointer bg-green-200/10 rounded-lg overflow-hidden">
                  <img
                    className="w-full img-slider"
                    src={herb.img}
                    alt={herb.name}
                  />
                  <p className="font-medium mt-2 text-center">{herb.category}</p>
                  <p className="font-medium mt-2 text-center">{herb.name}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
        {/* Herbas Grid */}
        <div className="my-4">
          <h2 className="text-white active text-center font-bold text-3xl my-4">Herbas Types</h2>
          <div className="herbas grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {herbas.map((herb, idx) => (
              <div className="text-center shadow-md pb-4 cursor-pointer rounded-lg overflow-hidden bg-green-200/10">
                <img className="w-full" src={herb.img} alt={herb.name} />
                <p className="aboutIcone mt-1 ">{herb.category}</p>
                <p className="mb-2 mt-1">{herb.name}</p>
                <button className="btn">
                  <FaCartShopping className="fs-5" />
                  Add To Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );

}
