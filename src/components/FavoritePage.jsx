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
      setFavorites(response.data);
    }
  };

  const deleteFavHerb = async (herbId) => {
    const response = await DeleteFavHerb(herbId);
    if (response.success) {
      setFavorites(response.data);
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
        {favorites?.length != 0 ? (
          <div>
            <h2 className="text-green-700 dark:text-green-400 mb-2 text-3xl font-semibold flex items-center gap-2  mt-8">
              My Favorites
              <FaRegHeart />
            </h2>
            <p className="text-base text-start text-gray-500 dark:text-gray-400 mb-5 border-b border-green-800/50 pb-2">
              {" "}
              Find your favorite natural herbs & organic healing products
            </p>
            <div className="herbas grid grid-cols-1 my-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 ">
              {/* Your 5 cards go here */}
              {favorites.map((herb, idx) => (
                <div
                  key={herb.herbId}
                  className=" slider-images shadow-md cursor-pointer bg-green-200/10 rounded-lg overflow-hidden text-center relative"
                >
                  <img
                    className="w-full cat-img h-50 object-cover!"
                    src={herb.imageLink}
                    alt={herb.description}
                  />
                  <p className="text-green-800  py-3 px-2 m-0! font-semibold text-center">
                    {" "}
                    {herb.herbName}
                  </p>
                  <div className="w-full mb-7 mt-2  mx-auto">
                    <Link
                      // to={"/cart"}
                      onClick={() => {
                        addToCart(herb.herbId);
                      }}
                      className="rounded-lg text-white bg-green-800 dark:bg-green-600 p-4 py-2 cursor-pointer"
                    >
                      Add To Cart
                    </Link>
                  </div>
                  <FaHeart
                    onClick={() => deleteFavHerb(herb.herbId)}
                    className="text-red-800 hover:text-red-800 opacity-80 hover:opacity-100 text-xl absolute top-2 right-2 cursor-pointer hover:scale-110 duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <div>
              <div className=" py-7 px-7 w-fit bg-[#cef0d9] m-auto rounded-full">
                <FaHeart className="text-center inline text-2xl text-[#14532D]" />
              </div>
              <h2 className="text-[#14532D] text-2xl my-2 font-medium">
                No Favorites Yet!
              </h2>
              <p className="text-[#3a5543]">
                Start adding herbas to your favorites by tapping the heart icon
                on any herb card{" "}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
