import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import herbImage from "../assets/Dashboard_835_Herbs_9_23.jpeg";
import Search from "./../components/Search";
import { FaHeart, FaSpider } from "react-icons/fa";
import {
  getAllCategory,
  getAllHerbas,
  getHerbId,
  PostFavHerbas,
} from "../Services/Herb";
import { HerbasContex } from "../Context/HerbasContext";

export default function Herbas() {
  const [activeCat, setActiveCat] = useState(0);
  const savedFavs = JSON.parse(localStorage.getItem("favHerbs")) || [];
  const [favoriteHerb, setFavoritHerb] = useState(savedFavs);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const { herbas } = useContext(HerbasContex);

  const getCategories = async () => {
    const response = await getAllCategory();
    setCategories(response);
    console.log(response);
  };

  const filteredHerbas =
    activeCat === 0
      ? herbas
      : herbas.filter((herb) => herb.categoryId === activeCat);

  const toggleFav = (e, herbId) => {
    e.stopPropagation();
    setFavoritHerb((prev) =>
      prev.includes(herbId)
        ? prev.filter((id) => id !== herbId)
        : [...prev, herbId],
    );
  };

  const sendFavHerbas = async (herbId) => {
    const response = await PostFavHerbas(herbId);
    console.log(response);
  };

  useEffect(() => {
    getCategories();
  }, []);
  useEffect(() => {
    localStorage.setItem("favHerbs", JSON.stringify(favoriteHerb));
  }, [favoriteHerb]);
  return (
    <>
      <section className="container lg:px-7 px-4 mx-auto py-4 mt-5">
        {/* search */}
        <Search placehoder={"herbas"} />

        <div className="categories">
          <ul className="list-none mt-2 flex justify-center gap-5 mb-0 overflow-x-auto flex-nowrap scrollbar-hide py-4">
            <li
              className={`cursor-pointer bg-green-800/10 dark:bg-[#0C1A1A] text-black dark:text-white px-4 py-1.5 rounded-full border border-green-200/10 whitespace-nowrap ${activeCat === 0 ? "cat-active" : ""} `}
              onClick={() => {
                setActiveCat(0);
              }}
            >
              All
            </li>
            {categories?.map((cat) => (
              <li
                key={cat.categoryId}
                className={`cursor-pointer bg-green-800/10 dark:bg-[#0C1A1A] text-black dark:text-white px-4 py-1.5 rounded-full border border-green-200/10 whitespace-nowrap ${activeCat === cat.categoryId ? "cat-active" : ""}`}
                onClick={() => {
                  setActiveCat(cat.categoryId);
                }}
              >
                {cat.name}
              </li>
            ))}
          </ul>
        </div>

        {filteredHerbas?.length > 0 ? (
          <div className="herbas grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {filteredHerbas?.map((herb) => (
              <div
                key={herb.herbId}
                className="slider-images shadow-md cursor-pointer bg-green-200/10 dark:bg-[#1A242A] rounded-lg overflow-hidden text-center my-5 relative flex flex-col h-full hover:shadow-lg transition-shadow duration-300"
                onClick={() => {
                  navigate(`/herbas-details/${herb.herbId}`);
                }}
              >
                <div className="w-full h-48 group overflow-hidden relative">
                  <div
                    className={`absolute inset-0 flex justify-end items-start  ${favoriteHerb.includes(herb.herbId) ? "opacity-100" : "opacity-0 bg-gray-300/30 group-hover:opacity-100 transition-opacity duration-500 ease"} `}
                  >
                    <FaHeart
                      onClick={(e) => {
                        toggleFav(e, herb.herbId);
                        sendFavHerbas(herb.herbId);
                      }}
                      className={`text-2xl m-3 cursor-pointer ${favoriteHerb.includes(herb.herbId) ? "text-red-700" : "text-white"}   transition-colors`}
                    />
                  </div>
                  <img
                    className="w-full h-full object-cover"
                    src={herb.imageLink}
                    alt={herb.description}
                    onError={(e) => {
                      e.target.src = herbImage;
                    }}
                  />
                </div>

                <div className="p-2 flex-grow flex flex-col justify-center">
                  <p className="mt-1 font-medium text-gray-800 dark:text-gray-200">
                    {herb.name}
                  </p>
                  <p className="mt-1 text-green-700 font-bold">
                    Price: {herb.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className=" flex justify-center items-center py-20 my-20">
            <span className="loader text-9xl border border-black" />
          </div>
        )}
      </section>
    </>
  );
}
