import image1 from "../assets/OurVision.jpg";
import image2 from "../assets/OurVision2.jpg";
import image3 from "../assets/pexels-mareefe-672046.jpg";
import { FaCamera } from "react-icons/fa";
import { MdCalculate } from "react-icons/md";
import { MdKeyboardVoice } from "react-icons/md";

export default function AiTools() {
  return (
    <>
      <section className="my-5 py-5 px-4  lg:px-7 container mx-auto">
        <div className="parent flex flex-wrap">
          <div className="ai-feature w-full sm:w-3/6 md:w-2/6">
            <div className="rounded-lg bg-green-200/10 m-4 space-y-2 pb-1 shadow-lg">
              <img
                src={image1}
                alt="ai feature"
                className="rounded-lg rounded-b-none"
              />
              <div className="ai-content px-2 ">
                <h2 className="font-semibold">Herb Identifier</h2>
                <p className="text-gray-600 text-medium">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Libero, et a? Ea.
                </p>

                <button className="aiAsistBtn my-2">
                  <FaCamera />
                  Analyze
                </button>
              </div>
            </div>
          </div>
          <div className="ai-feature  w-full sm:w-3/6 md:w-2/6">
            <div className="rounded-lg bg-green-200/10 m-4 space-y-2 pb-1 shadow-lg">
              <img
                src={image2}
                alt="ai feature"
                className="rounded-lg rounded-b-none"
              />
              <div className="ai-content px-2 ">
                <h2 className="font-semibold">Nutrition Calculator</h2>
                <p className="text-gray-600 text-medium">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Libero, et a? Ea.
                </p>
                <textarea
                  type="text"
                  className="w-full border border-secondary-100 rounded p-2 mt-3"
                  placeholder="e.g. 100g chicken breast, 100 white rice"
                />
                <button className="aiAsistBtn my-2">
                  <MdCalculate />
                  Calculate
                </button>
              </div>
            </div>
          </div>
          <div className="ai-feature w-full sm:w-3/6 md:w-2/6">
            <div className="rounded-lg bg-green-200/10 m-4 space-y-2 pb-1 shadow-lg">
              <img
                src={image3}
                alt="ai feature"
                className="rounded-lg rounded-b-none"
              />
              <div className="ai-content px-2 ">
                <h2 className="font-semibold">Mood Suggestion</h2>
                <p className="text-gray-600 text-medium">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Libero, et a? Ea.
                </p>

                <button className="aiAsistBtn my-2">
                  <MdKeyboardVoice />
                  Record
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
