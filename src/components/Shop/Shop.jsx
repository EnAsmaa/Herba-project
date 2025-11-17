
import { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import OurVision1 from "../../assets/OurVision.jpg";
import OurVision2 from "../../assets/OurVision2.jpg";
import OurVision3 from "../../assets/pexels-mareefe-672046.jpg";
import { FaSearch } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";

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
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 1500,
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
      {/* Search Section */}
      <div className="search-wrapper py-5 px-4">
        <div className="search-box position-relative mx-auto">
          <FaSearch className="searchIcon fs-4" />
          <input
            type="search"
            className="searchInput rounded-5 py-2 border-0 px-5 w-100"
            placeholder="Search for herbs..."
          />
        </div>
      </div>

      {/* Categories */}
      <div className="container-fluid px-lg-5 px-md-4 px-3">
        <div className="categories py-3">
          <ul className="list-unstyled d-flex gap-4 mb-0 justify-content-center overflow-x-auto flex-nowrap">
            {categories.map((cat) => (
              <li
                key={cat}
                className={`pointer cat ${
                  activeCategory === cat ? "active" : ""
                }`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="slider-wrapper px-lg-5 px-md-4 px-3 mb-4">
        <Slider {...settings}>
          {herbas.map((herb, id) => (
            <div className="px-2 py-3" key={id}>
              <div className=" pb-2 slider-images shadow-sm pointer">
                <img
                  className="w-100 img-slider"
                  src={herb.img}
                  alt={herb.name}
                />
                <p className="fw-semibold mt-2 text-center">{herb.category}</p>
                <p className="fw-semibold mt-2 text-center">{herb.name}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      {/* Herbas Grid */}
      <div className="container-fluid px-lg-5 px-md-4 px-3 my-4">
        <h2 className="active text-center fw-bold my-4">Herbas Types</h2>
        <div className="herbas row g-4">
          {herbas.map((herb, idx) => (
            <div key={idx} className="col-6 col-sm-4 col-md-3 col-xxl-2">
              <div className="col-content text-center shadow pb-4 pointer">
                <img className="w-100 cat-img" src={herb.img} alt={herb.name} />
                <p className="aboutIcone mt-1 ">{herb.category}</p>
                <p className="mb-2 mt-1">{herb.name}</p>
                <button className="btn cartBtn mx-auto rounded-5 w-75 d-flex align-items-center justify-content-center gap-2">
                  <FaCartShopping className="fs-5"/>
                  Add To Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );

}
