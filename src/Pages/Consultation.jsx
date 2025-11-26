import { FaRegStar } from "react-icons/fa";
import person1 from "../assets/person1.jpg";
import person4 from "../assets/person4.jpg";
import person2 from "../assets/person2.jpg";
import person3 from "../assets/person3.jpg";
import Search from "../components/Search";
export default function Consultation() {
  return (
    <section className="my-9">
      <div className="container px-4  mx-auto">
        <div className="consult-head my-3 mb-5">
          <h2 className="mb-1 text-center font-bold text-4xl dark:text-[#E9EDEF]">
            Mental Health Consultaion
          </h2>
          <p className="text-center text-base text-[#333333] dark:text-[#C5CFD6] md:w-3/4 mx-auto">
            Book your session with the best certified consultants
          </p>
        </div>
        {/* search */}
        <Search placehoder={'doctors'}/>

      </div>
      <div className="container mx-auto px-4 py-10 my-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div className="consult-content text-center shadow-lg bg-white dark:bg-[#1A242A] dark:border border-[#adabab] dark:border-[#294353a6]  rounded-lg py-5 p-5">
            <img
              src={person1}
              alt="doctor"
              className="w-24 h-24 object-cover rounded-full mx-auto"
            />

            <h4 className="text-lg mt-2 font-semibold">Dr. Sara Ahmed</h4>
            <p className="text-[#4d7c5c] my-2">Addiction Treatment</p>

            <div className="flex items-center justify-center gap-2 my-4">
              <FaRegStar className="text-yellow-400" />
              <FaRegStar className="text-yellow-400" />
              <FaRegStar className="text-yellow-400" />
              <FaRegStar className="text-yellow-400" />
            </div>

            <p className="text-[#333333c9] dark:text-[#8696A0] text-base my-2">
              (98 Rate) 4.9
            </p>

            <p className="text-[#4d7c5c]">Available Times:</p>

            <div className="times mt-5 flex gap-2 justify-center ">
              <span className="span-time ">
                15:30
              </span>
              <span className="close-time">
                10:00
              </span>
              <span className="span-time">
                12:40
              </span>
            </div>
          </div>
          <div className="consult-content text-center shadow-lg bg-white dark:bg-[#1A242A] dark:border border-[#adabab] dark:border-[#294353a6]  rounded-lg py-5 p-5">
            <img
              src={person2}
              alt="doctor"
              className="w-24 h-24 object-cover rounded-full mx-auto"
            />

            <h4 className="text-lg mt-2 font-semibold">Dr. Noura Ali</h4>
            <p className="text-[#4d7c5c] my-2">Addiction Treatment</p>

            <div className="flex items-center justify-center gap-2 my-4">
              <FaRegStar className="text-yellow-400" />
              <FaRegStar className="text-yellow-400" />
              <FaRegStar className="text-yellow-400" />
              <FaRegStar className="text-yellow-400" />
            </div>

            <p className="text-[#333333c9] dark:text-[#8696A0] text-base my-2">
              (98 Rate) 4.9
            </p>

            <p className="text-[#4d7c5c]">Available Times:</p>

            <div className="times mt-5 flex gap-2 justify-center ">
              <span className="span-time">
                15:30
              </span>
              <span className="close-time">
                10:00
              </span>
              <span className="span-time">
                12:40
              </span>
            </div>
          </div>
          <div className="consult-content text-center shadow-lg bg-white dark:bg-[#1A242A] dark:border border-[#adabab] dark:border-[#294353a6]  rounded-lg py-5 p-5">
            <img
              src={person3}
              alt="doctor"
              className="w-24 h-24 object-cover rounded-full mx-auto"
            />

            <h4 className="text-lg mt-2 font-semibold">Dr. Nabil Hassan</h4>
            <p className="text-[#4d7c5c] my-2">Addiction Treatment</p>

            <div className="flex items-center justify-center gap-2 my-4">
              <FaRegStar className="text-yellow-400" />
              <FaRegStar className="text-yellow-400" />
              <FaRegStar className="text-yellow-400" />
              <FaRegStar className="text-yellow-400" />
            </div>

            <p className="text-[#333333c9] dark:text-[#8696A0] text-base my-2">
              (98 Rate) 4.9
            </p>

            <p className="text-[#4d7c5c]">Available Times:</p>

            <div className="times mt-5 flex gap-2 justify-center ">
              <span className="span-time">
                15:30
              </span>
              <span className="close-time">
                10:00
              </span>
              <span className="span-time">
                12:40
              </span>
            </div>
          </div>
          <div className="consult-content text-center shadow-lg dark:border bg-white dark:bg-[#1A242A] border-[#adabab] dark:border-[#294353a6]  rounded-lg py-5 p-5">
            <img
              src={person4}
              alt="doctor"
              className="w-24 h-24 object-cover rounded-full mx-auto"
            />

            <h4 className="text-lg mt-2 font-semibold">Dr.Ahmed Mostafa</h4>
            <p className="text-[#4d7c5c] my-2">Addiction Treatment</p>

            <div className="flex items-center justify-center gap-2 my-4">
              <FaRegStar className="text-yellow-400" />
              <FaRegStar className="text-yellow-400" />
              <FaRegStar className="text-yellow-400" />
              <FaRegStar className="text-yellow-400" />
            </div>

            <p className="text-[#333333c9] dark:text-[#8696A0] text-base my-2">
              (98 Rate) 4.9
            </p>

            <p className="text-[#4d7c5c]">Available Times:</p>

            <div className="times mt-5 flex gap-2 justify-center ">
              <span className="span-time">
                15:30
              </span>
              <span className="close-time">
                10:00
              </span>
              <span className="span-time">
                12:40
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
