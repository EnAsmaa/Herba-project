import { FaRegStar} from "react-icons/fa";
import person1 from "../../assets/person1.jpg";
import person2 from "../../assets/person2.jpg";
import person3 from "../../assets/person3.jpg";
export default function Testmonials() {
  return (
    <div data-aos="" className="">
      <h2 className="text-center font-bold text-3xl">What Our Community Says</h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-5 mt-5">
        <div className="testmonial-content border rounded-md p-3">
          <div className="testmonial-person mb-3 flex items-center gap-3">
            <img
              src={person1}
              className="aspect-square w-15 rounded-full object-cover"
              alt="testimonial"
            />
            <div>
              <span className="fw-bold">Mariam S.</span>
              <div className="star-icons flex gap-2 mt-2 items-center justify-center">
                <FaRegStar className="text-yellow-400" />
                <FaRegStar className="text-yellow-400" />
                <FaRegStar className="text-yellow-400" />
                <FaRegStar className="text-yellow-400" />
              </div>
            </div>
          </div>
          <p >
            “HerbalCare completely changed my skincare routine! I love
            knowing that everything I use is 100% natural and gentle on my
            skin. My complexion has never looked this healthy.”
          </p>
        </div>
        <div className="testmonial-content border rounded-md p-3">
          <div className="testmonial-person mb-3 flex items-center gap-3">
            <img
              src={person3}
              className="aspect-square w-15 rounded-full object-cover"
              alt="testimonial"
            />
            <div>
              <span className="fw-bold">Omar M.</span>
              <div className="star-icons flex gap-2 mt-2 items-center justify-center">
                <FaRegStar className="text-yellow-400" />
                <FaRegStar className="text-yellow-400" />
                <FaRegStar className="text-yellow-400" />
                <FaRegStar className="text-yellow-400" />
              </div>
            </div>
          </div>
          <p>
            “I started using HerbalCare’s herbal teas a few months ago, and
            they’ve helped me feel more relaxed and energized. It’s amazing
            how nature can make such a difference!”
          </p>
        </div>
        <div className="testmonial-content border rounded-md p-3">
          <div className="testmonial-person  mb-3 flex items-center gap-3">
            <img
              src={person2}
              className="aspect-square w-15 rounded-full object-cover"
              alt="testimonial"
            />
            <div>
              <span className="fw-bold">Nour H.</span>
              <div className="star-icons flex gap-2 mt-2 items-center justify-center">
                <FaRegStar className="text-yellow-400" />
                <FaRegStar className="text-yellow-400" />
                <FaRegStar className="text-yellow-400" />
                <FaRegStar className="text-yellow-400" />
              </div>
            </div>
          </div>
          <p>
            “I started using HerbalCare’s herbal teas a few months ago, and
            they’ve helped me feel more relaxed and energized. It’s amazing
            how nature can make such a difference!”
          </p>
        </div>
      </div>
    </div>
  );
}
