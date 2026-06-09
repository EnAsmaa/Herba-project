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

export default function HerbaDetails() {
  const { id } = useParams();
  const [herb, setHerb] = useState(null);
  const [filteredHerbs, setFilteredHerbs] = useState();
  const navigate = useNavigate();


  const getHerbDetails = async () => {
    const response = await getHerbId(id);
    if (response.success) {
      setHerb(response.data);
    }
  };

  const getHerbs = async () => {
    const herbs = await getAllHerbas();
    if (herbs && herbs.length > 0) {
      setFilteredHerbs(herbs?.filter(
        (item) => item.categoryName === herb?.categoryName)
      );
      console.log(filteredHerbs)
    }
  };

  useEffect(() => { getHerbs() }, [])

  useEffect(() => {
    getHerbDetails();
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, [id]);

  // add to cart
  const addToCart = async () => {
    const response = await sendAddToCart(id, 1);
    if (response.success) {
      console.log(response.data)
    }
  };


  return (
    <>
      {!herb ? (
        <div className=" flex justify-center items-center py-20 my-20">
          <span className="loader text-9xl border border-black" />
        </div>
      ) : (
        <section className="my-5 py-5 px-4 lg:px-7 container mx-auto">
          <div className="w-4/5 mx-auto sm:w-full flex flex-col lg:flex-row gap-10 ">
            {/* images  */}
            <div className="herba-image w-full flex gap-1">
              <div className="rounded-lg shadow shadow-gray-500">
                <img
                  src={herb?.imageLink}
                  className="h-full w-full object-cover rounded-lg"
                  alt="herb.description"
                />
              </div>
            </div>
            {/* text caption  */}
            <div className="herba-detail space-y-2">
              <h2 className="font-bold text-2xl dark:text-white text-green-800 ">
                {herb?.name}
              </h2>
              <h3 className=" text-gray-800 dark:text-gray-300">
                <span className="font-semibold text-lg dark:text-white">
                  Scientific Name:{" "}
                </span>{" "}
                {herb?.scientificName}
              </h3>
              <p className="flex items-center gap-2 py-1">
                <span className="font-bold text-gray-800">
                  Therapeutic Use:
                </span>
                <span className="bg-green-50 text-green-700 text-sm font-medium px-3 py-0.5 rounded-full border border-green-200">
                  {herb?.categoryName}
                </span>
              </p>
              <p className="my-2 py-3">{herb?.description}</p>
              <div className="py-2">
                <h3 className="font-semibold text-lg flex justify-start items-center gap-2 dark:text-white ">
                  <ImCheckboxChecked className="text-green-700 dark:text-green-500" />
                  Benefits
                </h3>
                <p className="text-md ms-2 ps-5">{herb?.benefits}</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg flex justify-start items-center gap-2 dark:text-white">
                  <IoIosWarning className="text-yellow-500 text-2xl" />
                  Side Effects
                </h3>
                <p className="text-md ms-2 ps-5">{herb?.sideEffects}</p>
              </div>
              <div className="flex items-center gap-4 my-3">
                <h3 className="text-green-800 dark:text-green-400 font-bold">
                  <span className="font-semibold text-xl text-black dark:text-gray-300 ">
                    Price:{" "}
                  </span>
                  {herb?.price}
                </h3>

                <div className="flex items-center gap-2 ">
                  <FaRegStar className="text-yellow-400" />
                  <FaRegStar className="text-yellow-400" />
                  <FaRegStar className="text-yellow-400" />
                  <FaRegStar className="text-yellow-400" />
                </div>
              </div>
              <div className="w-fit my-4">
                <Link to={'/cart'} onClick={() => { addToCart() }} className="rounded-lg text-white bg-green-800 dark:bg-green-600 p-4 py-2 cursor-pointer">
                  Add To Cart
                </Link>
              </div>
            </div>
          </div>

          {/* related-herbas */}
          <div className="related-herbas mt-10">
            <h2 className="font-bold text-3xl text-center my-4">
              Related Herbas
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {filteredHerbs?.map((el) => (
                <div
                  key={el.herbId}
                  className="slider-images shadow-md cursor-pointer bg-green-200/10 dark:bg-[#1A242A] rounded-lg overflow-hidden text-center my-5 relative flex flex-col h-full hover:shadow-lg transition-shadow duration-300"
                  onClick={() => {
                    navigate(`/herbas-details/${el.herbId}`);
                  }}
                >
                  <div className="w-full h-48 overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      src={el.imageLink}
                      alt={el.description}
                      onError={(e) => {
                        e.target.src = herbImage;
                      }}
                    />
                  </div>

                  <div className="p-2 flex-grow flex flex-col justify-center">
                    <p className="mt-1 font-medium text-gray-800 dark:text-gray-200">
                      {el.name}
                    </p>
                    <p className="mt-1 text-green-700 font-bold">
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
