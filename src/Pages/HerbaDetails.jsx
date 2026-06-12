import { Link, useNavigate, useParams } from "react-router-dom";
import image1 from "../assets/OurVision.jpg";
import image2 from "../assets/OurVision2.jpg";
import image3 from "../assets/pexels-mareefe-672046.jpg";
import { FaRegStar } from "react-icons/fa";
import { getAllHerbas, getHerbId } from "../Services/Herb";
import { useContext, useEffect, useState } from "react";
import { ImCheckboxChecked } from "react-icons/im";
import { IoIosWarning } from "react-icons/io";
import herbImage from "../assets/Dashboard_835_Herbs_9_23.jpeg";
import { sendAddToCart } from "../Services/CartServices";
import { HerbasContext } from "../Context/HerbasContext";

export default function HerbaDetails() {
  const { id } = useParams();
  const [herb, setHerb] = useState(null);
  const { herbas } = useContext(HerbasContext);
  const navigate = useNavigate();

  // get herb
  const getHerbDetails = async () => {
    const response = await getHerbId(id);
    if (response.success) {
      setHerb(response.data);
    }
  };

  const filteredHerbs = herbas?.filter(
    (item) => item.categoryName === herb?.categoryName,
  );

  // add to cart
  const addToCart = async () => {
    const response = await sendAddToCart(id);
    if (response && response.success) {
      navigate("/cart");
    }
  };

  useEffect(() => {
    getHerbDetails();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [id]);

  return (
    <>
      {!herb ? (
        <div className="flex justify-center items-center py-20 my-20">
          <span className="loader text-9xl" />
        </div>
      ) : (
        <section className="my-5 py-5 px-4 lg:px-7 container mx-auto bg-[#F5F7F3] dark:bg-[#1A1F1C] text-[#3E4E36] dark:text-[#E2E8F0]">
          <div className="w-4/5 mx-auto sm:w-full flex flex-col lg:flex-row gap-10">
            <div className="herba-image w-full max-w-[500px]">
              <div className="aspect-square overflow-hidden rounded-lg shadow-md border border-gray-200 dark:border-[#2C3530]">
                <img
                  src={herb?.imageLink}
                  alt={herb?.description}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* text caption */}
            <div className="herba-detail space-y-4 flex-1">
              <h2 className="font-bold text-3xl text-[#446C4F] dark:text-[#528B63]">
                {herb?.name}
              </h2>
              
              <h3 className="text-[#3E4E36] dark:text-[#94A3B8]">
                <span className="font-semibold text-lg text-[#3E4E36] dark:text-[#E2E8F0]">
                  Scientific Name:{" "}
                </span>{" "}
                <span className="italic">{herb?.scientificName}</span>
              </h3>
              
              <div className="flex items-center gap-2 py-1">
                <span className="font-bold text-[#3E4E36] dark:text-[#E2E8F0]">
                  Therapeutic Use:
                </span>
                <span className="bg-[#E8F3EE] dark:bg-[#2C3530] text-[#446C4F] dark:text-[#528B63] text-sm font-medium px-3 py-0.5 rounded-full border border-[#94C973]/30">
                  {herb?.categoryName}
                </span>
              </div>
              
              <p className="my-2 py-2 text-md leading-relaxed text-[#3E4E36] dark:text-[#94A3B8]">
                {herb?.description}
              </p>
              
              <div className="py-2 space-y-1">
                <h3 className="font-semibold text-lg flex justify-start items-center gap-2 text-[#3E4E36] dark:text-[#E2E8F0]">
                  <ImCheckboxChecked className="text-[#446C4F] dark:text-[#528B63]" />
                  Benefits
                </h3>
                <p className="text-md ms-2 ps-5 text-[#3E4E36] dark:text-[#94A3B8]">{herb?.benefits}</p>
              </div>
              
              <div className="py-2 space-y-1">
                <h3 className="font-semibold text-lg flex justify-start items-center gap-2 text-[#3E4E36] dark:text-[#E2E8F0]">
                  <IoIosWarning className="text-amber-500 dark:text-amber-400 text-2xl" />
                  Side Effects
                </h3>
                <p className="text-md ms-2 ps-5 text-red-700 dark:text-red-400/90">{herb?.sideEffects}</p>
              </div>
              
              <div className="flex items-center gap-4 my-4">
                <h3 className="text-[#446C4F] dark:text-[#528B63] font-bold text-xl">
                  <span className="font-semibold text-xl text-[#3E4E36] dark:text-[#94A3B8]">
                    Price:{" "}
                  </span>
                  {herb?.price}
                </h3>

                <div className="flex items-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <FaRegStar key={i} className="text-amber-400" />
                  ))}
                </div>
              </div>
              
              <div className="w-fit my-4">
                <button
                  onClick={addToCart}
                  className="rounded-lg text-white bg-[#446C4F] dark:bg-[#528B63] hover:bg-[#4E8369] hover:dark:bg-[#4E8369] px-6 py-2.5 font-semibold cursor-pointer shadow duration-200 transition-colors"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>

          {/* related-herbas */}
          <div className="related-herbas mt-16 border-t border-gray-200 dark:border-[#2C3530] pt-10">
            <h2 className="font-bold text-3xl text-center my-6 text-[#3E4E36] dark:text-[#E2E8F0]">
              Related Herbas
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {filteredHerbs?.map((el) => (
                <div
                  key={el.herbId}
                  className="slider-images shadow-sm cursor-pointer bg-white dark:bg-[#232925] border border-gray-100 dark:border-[#2C3530]/40 rounded-lg overflow-hidden text-center relative flex flex-col h-full hover:shadow-lg hover:scale-[1.01] transition-all duration-300"
                  onClick={() => {
                    navigate(`/herbas-details/${el.herbId}`);
                  }}
                >
                  <div className="w-full h-48 overflow-hidden bg-gray-50 dark:bg-[#141816]">
                    <img
                      className="w-full h-full object-cover"
                      src={el.imageLink}
                      alt={el.description}
                      onError={(e) => {
                        e.target.src = herbImage;
                      }}
                    />
                  </div>

                  <div className="p-4 flex-grow flex flex-col justify-between">
                    <p className="font-semibold text-md text-[#3E4E36] dark:text-[#E2E8F0] line-clamp-1">
                      {el.name}
                    </p>
                    <p className="mt-2 text-[#446C4F] dark:text-[#528B63] font-bold">
                      Price: {el.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}