import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { FaHandHoldingHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { DeleteFavHerb, getFavHerbas } from "../Services/Herb";


export default function FavoritePage() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);

  const getAllFavorites = async () => {
    const response = await getFavHerbas();
    if (response?.success) {
      setFavorites(response.data);
    }

  }

  const deleteFavHerb = async (herbId) => {
    const response = await DeleteFavHerb(herbId);
    if (response.success) {
      setFavorites(response.data)
    }
  }

  useEffect(() => {
    getAllFavorites();
  }, [])



  return (
    <>
      <div className="min-h-screen flex justify-center text-center container lg:px-7 px-4 mx-auto">
        {favorites?.length != 0 ? (
          <div>
            <h2 className="text-emerald-950 text-3xl font-semibold flex items-center gap-2 my-4 mt-8">
              <FaRegHeart />
              My Favorites
            </h2>
            <div className="herbas grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {/* Your 5 cards go here */}
              {favorites.map((herb, idx) => (
                <div
                  key={idx}
                  className=" slider-images shadow-md cursor-pointer bg-green-200/10 rounded-lg overflow-hidden text-center relative"

                >
                  <img
                    className="w-full cat-img h-50 object-cover!"
                    src={herb.imageLink}
                    alt={herb.description}
                  />
                  <p className="text-green-800 text-start py-3 px-2 m-0! font-semibold">Herb Name: {herb.herbName}</p>
                  <FaHeart onClick={() => deleteFavHerb(herb.herbId)} className="text-red-800 hover:text-red-800 opacity-80 hover:opacity-100 text-xl absolute top-2 right-2 cursor-pointer hover:scale-110 duration-300" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className=" py-7 px-7 w-fit bg-[#cef0d9] m-auto rounded-full">
              <FaHeart className="text-center inline text-2xl text-[#14532D]" />
            </div>
            <h2 className="text-[#14532D] text-2xl my-2 font-medium">
              No Favorites Yet!
            </h2>
            <p className="text-[#3a5543]">
              Start adding herbas to your favorites by tapping the heart icon on
              any herb card{" "}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
