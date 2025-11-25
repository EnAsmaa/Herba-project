import { FaRegStar } from "react-icons/fa";
import person1 from "../assets/person1.jpg";
import person2 from "../assets/person2.jpg";
import person3 from "../assets/person3.jpg";
export default function Testmonials() {
  return (
    <section className="pb-10 mb-10 container lg:px-7 px-4 mx-auto ">
      <div className="">
        <h2 className="heading-Sections">
          What Our Community Says
        </h2>
        <div className="gridtemplet mt-8">
          <div className="testimonialBox">
            <div className="testmonial-person ">
              <img
                src={person1}
                className="aspect-square w-15 rounded-full object-cover"
                alt="testimonial"
              />
              <div>
                <span className="font-semibold text-[#4d7c5c]">Mariam S.</span>
                <div className="star-icons">
                  <FaRegStar className="text-yellow-400" />
                  <FaRegStar className="text-yellow-400" />
                  <FaRegStar className="text-yellow-400" />
                  <FaRegStar className="text-yellow-400" />
                </div>
              </div>
            </div>
            <p className="text-[#333333] dark:text-[#8696A0]">
              “HerbalCare completely changed my skincare routine! I love knowing
              that everything I use is 100% natural and gentle on my skin. My
              complexion has never looked this healthy.”
            </p>
          </div>
          <div className="testimonialBox">
            <div className="testmonial-person ">
              <img
                src={person3}
                className="aspect-square w-15 rounded-full object-cover"
                alt="testimonial"
              />
              <div>
                <span className="font-semibold text-[#4d7c5c]">Omar M.</span>
                <div className="star-icons ">
                  <FaRegStar className="text-yellow-400" />
                  <FaRegStar className="text-yellow-400" />
                  <FaRegStar className="text-yellow-400" />
                  <FaRegStar className="text-yellow-400" />
                </div>
              </div>
            </div>
            <p className="text-[#333333] dark:text-[#8696A0]">
              “I started using HerbalCare’s herbal teas a few months ago, and
              they’ve helped me feel more relaxed and energized. It’s amazing
              how nature can make such a difference!”
            </p>
          </div>
          <div className="testimonialBox">
            <div className="testmonial-person ">
              <img
                src={person2}
                className="aspect-square w-15 rounded-full object-cover"
                alt="testimonial"
              />
              <div>
                <span className="font-semibold text-[#4d7c5c]">Nour H.</span>
                <div className="star-icons">
                  <FaRegStar className="text-yellow-400" />
                  <FaRegStar className="text-yellow-400" />
                  <FaRegStar className="text-yellow-400" />
                  <FaRegStar className="text-yellow-400" />
                </div>
              </div>
            </div>
            <p className="text-[#333333] dark:text-[#8696A0]">
              “I started using HerbalCare’s herbal teas a few months ago, and
              they’ve helped me feel more relaxed and energized. It’s amazing
              how nature can make such a difference!”
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
