import { FaRegStar } from "react-icons/fa";
import person1 from "../assets/person1.jpg";
import person2 from "../assets/person2.jpg";
import person3 from "../assets/person3.jpg";
import { useTranslation } from "react-i18next";
export default function Testmonials() {
  const { t } = useTranslation("home");
  return (
    <section className="pb-10 mb-10 mx-auto">
      <div className="container lg:px-7 px-4">
        <h2 className="heading-Sections text-[#446C4F] dark:text-[#94C973]">
          {t("whatOurCommunitySays")}
        </h2>

        <div className="gridtemplet mt-8 gap-6">
          {[
            {
              img: person1,
              name: "Mariam S.",
              text: "“HerbalCare completely changed my skincare routine! I love knowing that everything I use is 100% natural and gentle on my skin. My complexion has never looked this healthy.”",
            },
            {
              img: person3,
              name: "Omar M.",
              text: "“I started using HerbalCare’s herbal teas a few months ago, and they’ve helped me feel more relaxed and energized. It’s amazing how nature can make such a difference!”",
            },
            {
              img: person2,
              name: "Nour H.",
              text: "“I started using HerbalCare’s herbal teas a few months ago, and they’ve helped me feel more relaxed and energized. It’s amazing how nature can make such a difference!”",
            },
          ].map((testimonial, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-[#232925] border border-[#E8F3EE] dark:border-[#2C3530] shadow-sm rounded-3xl p-6 transition-all hover:shadow-md"
              data-aos="zoom-in"
              data-aos-duration="3000"
            >
              <div className="testmonial-person flex items-center gap-4 mb-4">
                <img
                  src={testimonial.img}
                  className="aspect-square w-16 rounded-full object-cover border-2 border-[#E8F3EE] dark:border-[#446C4F]"
                  alt={testimonial.name}
                />
                <div>
                  <span className="font-bold text-[#446C4F] dark:text-[#94C973] block">
                    {testimonial.name}
                  </span>
                  <div className="star-icons flex gap-1 mt-1">
                    {[...Array(4)].map((_, i) => (
                      <FaRegStar key={i} className="text-amber-400 text-sm" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-[#3E4E36] dark:text-[#94A3B8] leading-relaxed italic">
                {testimonial.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
