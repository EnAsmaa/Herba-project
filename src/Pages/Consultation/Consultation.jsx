import person1 from "../../assets/person1.jpg";
import person4 from "../../assets/person4.jpg";
import person2 from "../../assets/person2.jpg";
import person3 from "../../assets/person3.jpg";
import Search from "../../components/Search";
import { useContext, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import { FaRegStar } from "react-icons/fa";

const doctorTypes = [
  { id: 1, name: 'All' },
  { id: 2, name: 'Herb & Plant Experts' },
  { id: 3, name: 'Nutrition Experts' },
  { id: 4, name: 'Sports & Gym Experts' },
]

export default function Consultation() {

  const [selectedDoctor, setSelectedDoctor] = useState('All')
  const [doctors, setDoctors] = useState()

  const getDoctors = async () => {
    try {
      const { data } = await axios.get('http://herbs.runasp.net/api/User/doctors')
      if (data.success) {
        setDoctors(data.data)
        console.log(data.data)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getDoctors()
  }, [])

  return (
    <>
      <section className="my-9">
        <div className="container px-4 lg:px-7 mx-auto">
          <div className="flex justify-between items-center">
            <div className="consult-head my-3 mb-5">
              <h2 className="mb-1 font-bold text-4xl dark:text-[#E9EDEF]">
                Mental Health Consultaion
              </h2>
              <p className="text-base text-[#333333] dark:text-[#C5CFD6]">
                Book your session with the best certified consultants
              </p>
            </div>
            <NavLink to={'/my-consultation'} className="px-4 py-2 bg-green-950/60 w-fit text-white rounded-lg cursor-pointer flex gap-3 items-center">My Questions
              <div className="size-2 rounded-full bg-green-900 animate-ping"></div>
            </NavLink>
          </div>
          {/* search */}
          <Search placehoder={'doctors'} />

          <div className="filteration mt-10">
            <ul className="text-white flex justify-center gap-5">
              {doctorTypes.map(doc =>
                <li key={doc.id} className={`cursor-pointer bg-green-800/10 dark:bg-[#0C1A1A] text-black dark:text-white px-4 py-1.5 rounded-full border border-green-200/10 whitespace-nowrap ${selectedDoctor === doc.name ? 'cat-active' : ''}`} onClick={() => {
                  setSelectedDoctor(doc.name)
                  // filterData()
                }} >
                  {doc.name}
                </li>
              )}
            </ul>
          </div>

        </div>
        <div className="container mx-auto px-4 lg:px-7 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

            {doctors?.map(doc =>
              <Link key={doc.id} to={`/ask-consultation/${doc.id}`}>
                <div className="consult-content space-y-1.5 text-center shadow-lg bg-white dark:bg-[#1A242A] dark:border border-[#adabab] dark:border-[#294353a6]  rounded-lg py-5 p-5 hover:-translate-y-1.5 duration-500">
                  {/* Avatar */}
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-xl uppercase mx-auto">
                    {doc?.firstName?.charAt(0)}
                    {doc?.lastName?.charAt(0)}
                  </div>

                  <h4 className="text-lg mt-2 font-semibold">{doc.firstName} {' '} {doc.lastName}</h4>

                  <p className="text-[#4d7c5c] mb-1.5!">{doc.specialty}</p>

                  <div className="flex justify-center items-center gap-1">
                    {Array.from({ length: 5 }).map((_, index) =>
                      index < doc.rating ? (
                        <FaStar key={index} className="text-yellow-400" />
                      ) : (
                        <FaRegStar key={index} className="text-yellow-400" />
                      )
                    )}
                  </div>

                  <p className="text-[#333333c9] dark:text-[#8696A0] text-base my-2">
                    {doc.rateCount} Rate {doc.rating}
                  </p>
                </div>
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
