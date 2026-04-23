import { useNavigate } from "react-router-dom";
import image1 from "../assets/OurVision.jpg";
import image2 from "../assets/OurVision2.jpg";
import image3 from "../assets/pexels-mareefe-672046.jpg";
import { FaCamera } from "react-icons/fa";
import { MdCalculate } from "react-icons/md";
// import { MdKeyboardVoice } from "react-icons/md";
export default function AiTools() {
  const navigate = useNavigate();
  return (
    <section className="my-5 py-5 px-4 lg:px-7 container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* Nutrition Calculator */}
        <div className="rounded-lg bg-green-200/10 shadow-lg overflow-hidden">
          <img
            src={image3}
            alt="ai feature"
            className="h-56 sm:h-64 w-full object-cover"
          />

          <div className="px-4 py-3 space-y-2">
            <h2 className="font-semibold text-lg">
              Nutrition Calculator
            </h2>

            <p className="text-gray-600 text-sm line-clamp-2">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Libero, et a? Ea.
            </p>

            <textarea
              rows={3}
              className="w-full border border-secondary-100 rounded p-2 resize-none text-sm"
              placeholder="e.g. 100g chicken breast, 100g white rice"
            />

            <button className="aiAsistBtn w-full">
              <MdCalculate />
              Calculate
            </button>
          </div>
        </div>

        {/* Herb Identifier */}
        <div className="rounded-lg bg-green-200/10 shadow-lg overflow-hidden">
          <img
            src={image1}
            alt="ai feature"
            className="h-56 sm:h-64 w-full object-cover"
          />

          <div className="px-4 py-3 space-y-2">
            <h2 className="font-semibold text-lg">
              Herb Identifier
            </h2>

            <p className="text-gray-600 text-sm line-clamp-2">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Libero, et a? Ea.
            </p>

            <button className="aiAsistBtn w-full mt-23" onClick={()=>navigate("/image-analysis")}>
              <FaCamera />
              Analyze
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

