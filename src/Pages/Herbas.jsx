import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import herbImage from "../assets/Dashboard_835_Herbs_9_23.jpeg";
import Search from "./../components/Search";
import { FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { DeleteFavHerb, getAllCategory, getAllHerbas, getFavHerbas, PostFavHerbas } from "../Services/Herb";
import axios from "axios";
import { HerbasContext } from "../Context/HerbasContext";


export default function Herbas() {
  const [token] = useState(localStorage.getItem("loginToken") || null);
  const [activeCat, setActiveCat] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 25;
  const [favoriteHerb, setFavoritHerb] = useState([]);

  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const {herbas}= useContext(HerbasContext);


  // get cats
  const getCategories = async () => {
    const response = await getAllCategory();
    setCategories(response);
  };

  // get favourite
  const getFav = async () => {
    const response = await getFavHerbas()
    if (response.success) {
      setFavoritHerb(response.data)
    }
  }

  useEffect(() => {
    getFav()
    getCategories();
  }, [])

  // add to favourite
  const addToFav = async (herbId) => {
    const response = await PostFavHerbas(herbId)
    if (response.success) {
      setFavoritHerb(response.data)
    }
  }

  // remove from favourite
  const removeFromFav = async (herbId) => {
    const response = await DeleteFavHerb(herbId)
    if (response.success) {
      setFavoritHerb(response.data)
    }
  }

  // FILTER
  const filteredHerbas =
    activeCat === 0
      ? herbas
      : herbas.filter((herb) => herb.categoryId === activeCat);

  // PAGINATION
  const totalPages = Math.ceil(filteredHerbas?.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentItems = filteredHerbas?.slice(startIndex, endIndex);

  // reset page on category change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCat]);

  const toggleFav = (e, herbId) => {
    e.stopPropagation();
    setFavoritHerb((prev) =>
      prev.includes(herbId)
        ? prev.filter((id) => id !== herbId)
        : [...prev, herbId]
    );
  };

  const sendFavHerbas = async (herbId) => {
    await PostFavHerbas(herbId);
  };

  useEffect(() => {
    localStorage.setItem("favHerbs", JSON.stringify(favoriteHerb));
  }, [favoriteHerb]);

  return (
    <section className="container mx-auto px-4 lg:px-10 py-10">

      {/* HEADER */}
      <div className=" py-5">
        <h1 className="text-2xl md:text-3xl font-bold text-green-700 dark:text-green-400 mb-2">
          Discover Natural Herbs 🌿
        </h1>

        <p className="text-base text-gray-500 dark:text-gray-400 mb-5">
          Explore natural herbs & organic healing products
        </p>

      </div>
      <Search placehoder={"herbas"} />

      {/* CATEGORIES */}
      <div className="my-8">
        <ul className="flex gap-3 overflow-x-auto scrollbar-hide py-2 justify-center">
          <li
            onClick={() => setActiveCat(0)}
            className={`px-5 py-2 rounded-full cursor-pointer transition
              ${activeCat === 0
                ? "bg-green-800 text-white shadow-md"
                : "dark:bg-[#0C1A1A] bg-green-800/10"
              }`}
          >
            All
          </li>

          {categories?.map((cat) => (
            <li
              key={cat.categoryId}
              onClick={() => setActiveCat(cat.categoryId)}
              className={`px-5 py-2 rounded-full cursor-pointer transition whitespace-nowrap
                ${activeCat === cat.categoryId
                  ? "bg-green-800 text-white shadow-md"
                  : "dark:bg-[#0C1A1A] bg-green-800/10"
                }`}
            >
              {cat.name}
            </li>
          ))}
        </ul>
      </div>

      {/* GRID */}
      {currentItems?.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[180px]">

          {currentItems.map((herb, index) => {
            const isFavorite = favoriteHerb.some(
              item => item.herbId === herb.herbId
            );

            return (
              <div
                key={herb.herbId}
                onClick={() => navigate(`/herbas-details/${herb.herbId}`)}
                className={`group cursor-pointer rounded-2xl overflow-hidden
              bg-[#1A242A]/70 border border-white/10
              shadow-md hover:shadow-2xl
              transition-all duration-500 hover:-translate-y-2
              ${index === 0 ? "col-span-2 row-span-2" : ""}`}
              >

                {/* IMAGE */}
                <div className="relative w-full h-full">

                  <img
                    src={herb.imageLink}
                    onError={(e) => (e.target.src = herbImage)}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                  />

                  {/* overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  {/* heart */}
                  <div className="absolute top-3 right-3">
                    {isFavorite ?
                      <FaHeart
                        onClick={(e) => {
                          removeFromFav(herb.herbId);
                          e.stopPropagation()
                        }}
                        className={`text-2xl transition text-red-500`} /> :
                      <FaHeart
                        onClick={(e) => {
                          addToFav(herb.herbId);
                          e.stopPropagation()
                        }}
                        className={`text-2xl transition text-white`} />

                    }
                  </div>

                  {/* text */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-white font-semibold text-sm md:text-base">
                      {herb.name}
                    </h3>

                    <p className="text-green-300 font-bold text-sm">
                      ${herb.price}
                    </p>
                  </div>

                </div>
              </div>
            )
          })}

        </div>
      ) : (
        <div className="flex justify-center items-center py-20">
          <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10">
          <div className="flex items-center gap-2 bg-white/5 dark:bg-[#0C1A1A] px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">

            {/* Prev */}
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className="px-3 py-1 text-sm rounded-full hover:bg-green-700/20 cursor-pointer"
            >
              Prev
            </button>

            {/* SMART PAGES */}
            {(() => {
              const pages = [];

              const addPage = (p) => {
                pages.push(
                  <button
                    key={p}
                    onClick={() => setCurrentPage(p)}
                    className={`w-8 h-8 rounded-full text-sm transition cursor-pointer
                      ${currentPage === p
                        ? "bg-green-700 text-white shadow-md scale-110"
                        : "hover:bg-green-700/20"
                      }`}
                  >
                    {p}
                  </button>
                );
              };

              const addDots = (key) => {
                pages.push(
                  <span key={key} className="px-2 text-gray-400 cursor-pointer">
                    ...
                  </span>
                );
              };

              addPage(1);

              if (currentPage > 3) addDots("start");

              for (
                let i = Math.max(2, currentPage - 1);
                i <= Math.min(totalPages - 1, currentPage + 1);
                i++
              ) {
                addPage(i);
              }

              if (currentPage < totalPages - 2) addDots("end");

              if (totalPages > 1) addPage(totalPages);

              return pages;
            })()}

            {/* Next */}
            <button
              onClick={() =>
                setCurrentPage((p) => Math.min(p + 1, totalPages))
              }
              className="px-3 py-1 text-sm rounded-full cursor-pointer hover:bg-green-700/20"
            >
              Next
            </button>

          </div>
        </div>
      )}

    </section>
  );
}