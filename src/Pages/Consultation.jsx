import person1 from "../assets/person1.jpg";
import person4 from "../assets/person4.jpg";
import person2 from "../assets/person2.jpg";
import person3 from "../assets/person3.jpg";
import Search from "../components/Search";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";
import { Link } from "react-router-dom";

const doctorTypes = [
  { id: 1, name: 'All' },
  { id: 2, name: 'Herb & Plant Experts' },
  { id: 3, name: 'Nutrition Experts' },
  { id: 4, name: 'Sports & Gym Experts' },
]

export default function Consultation() {

  const [selectedDoctor, setSelectedDoctor] = useState('All')

  const herbDoctors = [
    {
      id: 1,
      img: person1,
      name: 'Dr. Sara Ahmed',
      title: 'Addiction Treatment',
      stars: 4,
      rateCount: 98,
      rateAvg: 4.9,
      avilableTime: ['15:30', '10:00', '12:40']
    },
    {
      id: 2,
      img: person1,
      name: 'Dr. Tamer Abassy',
      title: 'Addiction Treatment',
      stars: 5, rateCount: 100,
      rateAvg: 5,
      avilableTime: ['10:30', '18:00', '9:40']
    },
    {
      id: 3,
      img: person1,
      name: 'Dr. Tamer Abassy',
      title: 'Addiction Treatment',
      stars: 5, rateCount: 100,
      rateAvg: 5,
      avilableTime: ['10:30', '18:00', '9:40']
    },
    {
      id: 4,
      img: person1,
      name: 'Dr. Asmaa Abdelwahab',
      title: 'Addiction Treatment',
      stars: 4, rateCount: 100,
      rateAvg: 4.8,
      avilableTime: ['17:30', '12:00', '9:40']
    },
    {
      id: 5,
      img: person1,
      name: 'Dr. Asmaa Abdelwahab',
      title: 'Addiction Treatment',
      stars: 4, rateCount: 100,
      rateAvg: 4.8,
      avilableTime: ['17:30', '12:00', '9:40']
    },
    {
      id: 6,
      img: person1,
      name: 'Dr. Abdelrhman Ehab',
      title: 'Addiction Treatment',
      stars: 2, rateCount: 23.5,
      rateAvg: 0.5,
      avilableTime: ['15:30', '10:00', '12:40']
    },
  ]

  const nutritionExperts = [
    {
      id: 11,
      img: person1,
      name: 'Dr. Ahmed EHab',
      title: 'Addiction Treatment',
      stars: 5, rateCount: 98,
      rateAvg: 4.9,
      avilableTime: ['15:30', '10:00', '12:40']
    },
    {
      id: 12,
      img: person1,
      name: 'Dr. Abdelkhaleq Ehab',
      title: 'Addiction Treatment',
      stars: 5, rateCount: 100,
      rateAvg: 5,
      avilableTime: ['10:30', '18:00', '9:40']
    },
    {
      id: 13,
      img: person1,
      name: 'Dr. Soaad',
      title: 'Addiction Treatment',
      stars: 4, rateCount: 100,
      rateAvg: 4.8,
      avilableTime: ['17:30', '12:00', '9:40']
    },
    {
      id: 14,
      img: person1,
      name: 'Dr. Abdelkhaleq Ehab',
      title: 'Addiction Treatment',
      stars: 5, rateCount: 100,
      rateAvg: 5,
      avilableTime: ['10:30', '18:00', '9:40']
    },
    {
      id: 15,
      img: person1,
      name: 'Dr. Soaad',
      title: 'Addiction Treatment',
      stars: 4, rateCount: 100,
      rateAvg: 4.8,
      avilableTime: ['17:30', '12:00', '9:40']
    },
    {
      id: 16,
      img: person1,
      name: 'Dr. Hayam',
      title: 'Addiction Treatment',
      stars: 5, rateCount: 120,
      rateAvg: 5,
      avilableTime: ['15:30', '10:00', '12:40']
    },
  ]

  const sportExperts = [
    {
      id: 21,
      img: person1,
      name: 'Dr. Sara Ahmed',
      title: 'Addiction Treatment',
      stars: 4, rateCount: 98,
      rateAvg: 4.9,
      avilableTime: ['15:30', '10:00', '12:40']
    },
    {
      id: 22,
      img: person1,
      name: 'Dr. Tamer Abassy',
      title: 'Addiction Treatment',
      stars: 5, rateCount: 100,
      rateAvg: 5,
      avilableTime: ['10:30', '18:00', '9:40']
    },
    {
      id: 23,
      img: person1,
      name: 'Dr. Asmaa Abdelwahab',
      title: 'Addiction Treatment',
      stars: 4, rateCount: 100,
      rateAvg: 4.8,
      avilableTime: ['17:30', '12:00', '9:40']
    },
    {
      id: 24,
      img: person1,
      name: 'Dr. Tamer Abassy',
      title: 'Addiction Treatment',
      stars: 5, rateCount: 100,
      rateAvg: 5,
      avilableTime: ['10:30', '18:00', '9:40']
    },
    {
      id: 25,
      img: person1,
      name: 'Dr. Asmaa Abdelwahab',
      title: 'Addiction Treatment',
      stars: 4, rateCount: 100,
      rateAvg: 4.8,
      avilableTime: ['17:30', '12:00', '9:40']
    },
    {
      id: 26,
      img: person1,
      name: 'Dr. Abdelrhman Ehab',
      title: 'Addiction Treatment',
      stars: 2, rateCount: 23.5,
      rateAvg: 0.5,
      avilableTime: ['15:30', '10:00', '12:40']
    },
  ]

  const allDoctors = [...herbDoctors, ...nutritionExperts, ...sportExperts]

  const [shownDoctors, setShownDoctors] = useState(allDoctors)

  const filterData = () => {
    if (selectedDoctor === 'Herb & Plant Experts') {
      setShownDoctors(herbDoctors)
    }
    else if (selectedDoctor === 'Nutrition Experts') {
      setShownDoctors(nutritionExperts)
    }
    else if (selectedDoctor === 'Sports & Gym Experts') {
      setShownDoctors(sportExperts)
    }
    else {
      setShownDoctors(allDoctors)
    }
  }

  useEffect(() => {
    filterData()
  }, [selectedDoctor])


  return (
    <>
      <section className="my-9">
        <div className="container px-4 lg:px-7 mx-auto">
          <div className="consult-head my-3 mb-5">
            <h2 className="mb-1 text-center font-bold text-4xl dark:text-[#E9EDEF]">
              Mental Health Consultaion
            </h2>
            <p className="text-center text-base text-[#333333] dark:text-[#C5CFD6]">
              Book your session with the best certified consultants
            </p>
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

            {shownDoctors.map(doc =>
              <Link to={`/consultation-details/${doc.id}`}>
                <div key={doc.id} className="consult-content text-center shadow-lg bg-white dark:bg-[#1A242A] dark:border border-[#adabab] dark:border-[#294353a6]  rounded-lg py-5 p-5 hover:-translate-y-1.5 duration-500">
                  <img
                    src={doc.img}
                    alt="doctor"
                    className="w-24 h-24 object-cover rounded-full mx-auto"
                  />

                  <h4 className="text-lg mt-2 font-semibold">{doc.name}</h4>
                  <p className="text-[#4d7c5c] my-2">{doc.title}</p>

                  <div className="flex items-center justify-center gap-2 my-4">
                    {Array.from({ length: doc.stars }).map((_, s) => (
                      <FaStar key={s} className="text-yellow-400" />
                    ))}
                  </div>

                  <p className="text-[#333333c9] dark:text-[#8696A0] text-base my-2">
                    ({doc.rateCount} Rate) {doc.rateAvg}
                  </p>

                  <p className="text-[#4d7c5c]">Available Times:</p>

                  <div className="times mt-5 flex gap-2 justify-center ">
                    {doc.avilableTime.map((time, index) =>
                      <span key={index} className="span-time ">
                        {time}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
