import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { FaHandHoldingHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { DeleteFavHerb, getFavHerbas } from "../Services/Herb";
import { sendAddToCart } from "../Services/CartServices";

export default function FavoritePage() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);

  const getAllFavorites = async () => {
    const response = await getFavHerbas();
    if (response?.success) {
      setFavorites(response?.data);
    }
  };

  const deleteFavHerb = async (herbId) => {
    const response = await DeleteFavHerb(herbId);
    if (response.success) {
      setFavorites(response?.data);
    }
  };

  // add to cart
  const addToCart = async (id) => {
    const response = await sendAddToCart(id);
    if (response && response.success) {
      navigate("/cart");
    }
  };

  useEffect(() => {
    getAllFavorites();
  }, []);

  return (
    <>
      <div className="min-h-screen flex justify-center text-center container lg:px-7 px-4 mx-auto">
        {favorites?.length !== 0 ? (
          <div>
            <h2 className="text-[#446C4F] dark:text-[#528B63] mb-2 text-3xl font-black flex items-center justify-center gap-2 mt-8 tracking-tight">
              My Favorites
              <FaRegHeart />
            </h2>
            <p className="text-base text-[#3E4E36] dark:text-[#94A3B8] mb-8 border-b border-[#446C4F]/20 pb-4">
              Find your favorite natural herbs & organic healing products
            </p>

            <div className="herbas grid grid-cols-1 my-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favorites.map((herb) => (
                <div
                  key={herb.herbId}
                  className="shadow-sm border border-[#E8F3EE] dark:border-[#2C3530] cursor-pointer bg-white dark:bg-[#232925] rounded-2xl overflow-hidden text-center relative transition-all hover:shadow-md"
                >
                  <img
                    className="w-full h-52 object-cover"
                    src={herb.imageLink}
                    alt={herb.description}
                  />
                  <p className="text-[#3E4E36] dark:text-[#E2E8F0] py-4 px-2 m-0 font-bold text-center">
                    {herb.herbName}
                  </p>
                  <div className="w-full mb-6 mt-1 px-4">
                    <button
                      onClick={() => addToCart(herb.herbId)}
                      className="w-full block rounded-xl text-white bg-[#446C4F] dark:bg-[#528B63] hover:opacity-90 py-3 cursor-pointer font-bold text-sm transition-all active:scale-95"
                    >
                      Add To Cart
                    </button>
                  </div>
                  <FaHeart
                    onClick={() => deleteFavHerb(herb.herbId)}
                    className="text-[#D34040] opacity-80 hover:opacity-100 text-xl absolute top-3 right-3 cursor-pointer hover:scale-110 duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center min-h-[400px]">
            <div>
              <div className="py-7 px-7 w-fit bg-[#E8F3EE] dark:bg-[#446C4F]/20 m-auto rounded-full">
                <FaHeart className="text-center inline text-2xl text-[#446C4F] dark:text-[#528B63]" />
              </div>
              <h2 className="text-[#446C4F] dark:text-[#E2E8F0] text-2xl my-2 font-black">
                No Favorites Yet!
              </h2>
              <p className="text-[#3E4E36] dark:text-[#94A3B8]">
                Start adding herbs to your favorites by tapping the heart icon
                on any herb card.
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
