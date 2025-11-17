import { FaRegStar } from "react-icons/fa";
import person1 from "../../assets/person1.jpg";
import person2 from "../../assets/person2.jpg";
import person3 from "../../assets/person3.jpg";
export default function Testmonials() {
  return (
    <div className="container-fluid  p-lg-5 p-md-4 p-3">
      <h2 className="text-center fw-bold">What Our Community Says</h2>
      <div className="container-fluid">
        <div className="row g-4 pt-4">
          <div className=" col-md-6 col-lg-4">
            <div className="testmonial-content  border rounded p-3">
              <div className="testmonial-person  mb-3 d-flex align-items-center gap-3">
                <img
                  src={person1}
                  className="testimon-image "
                  alt="testimonial"
                />
                <div>
                  <span className="fw-bold">Mariam S.</span>
                  <div className="star-icons d-flex gap-2 mt-2 align-items-center justify-content-center">
                    <FaRegStar />
                    <FaRegStar />
                    <FaRegStar />
                    <FaRegStar />
                  </div>
                </div>
              </div>
              <p >
                “HerbalCare completely changed my skincare routine! I love
                knowing that everything I use is 100% natural and gentle on my
                skin. My complexion has never looked this healthy.”
              </p>
            </div>
          </div>
          <div className="col-md-6 col-lg-4">
            <div className="testmonial-content border rounded p-3">
              <div className="testmonial-person  mb-3 d-flex align-items-center gap-3">
                <img
                  src={person3}
                  className="testimon-image "
                  alt="testimonial"
                />
                <div>
                  <span className="fw-bold">Omar M.</span>
                  <div className="star-icons d-flex gap-2 mt-2 align-items-center justify-content-center">
                    <FaRegStar />
                    <FaRegStar />
                    <FaRegStar />
                    <FaRegStar />
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
          <div className="col-md-6 col-lg-4">
            <div className="testmonial-content border rounded p-3">
                            <div className="testmonial-person  mb-3 d-flex align-items-center gap-3">
                <img
                  src={person2}
                  className="testimon-image "
                  alt="testimonial"
                />
                <div>
                  <span className="fw-bold">Nour H.</span>
                  <div className="star-icons d-flex gap-2 mt-2 align-items-center justify-content-center">
                    <FaRegStar />
                    <FaRegStar />
                    <FaRegStar />
                    <FaRegStar />
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
      </div>
    </div>
  );
}
