import image1 from "../assets/OurVision.jpg";
import image2 from "../assets/OurVision2.jpg";
import image3 from "../assets/pexels-mareefe-672046.jpg";
import { FaRegStar } from "react-icons/fa";

const relatedHerbas = [
  { id: 1, image: image1, title: "Kozbara", category: "Herbas1" },
  { id: 2, image: image2, title: "Shabat", category: "Herbas2" },
  { id: 3, image: image3, title: "Baqdones", category: "Herbas3" },
  { id: 4, image: image1, title: "Kozbara", category: "Herbas1" },
  { id: 5, image: image2, title: "Shabat", category: "Herbas2" },
  { id: 6, image: image3, title: "Baqdones", category: "Herbas3" },
];
export default function HerbaDetails() {
  return (
    <>
      <section className="my-5 py-5 px-4  lg:px-7 container mx-auto">
        <div className="flex flex-col lg:flex-row gap-10 ">
          {/* images  */}
          <div className="herba-image w-full lg:w-2/5  flex gap-1">
            <div className="alt-images w-1/5 space-y-1">
              <img src={image1} alt="" className="rounded-md" />
              <img src={image1} alt="" className="rounded-md" />
              <img src={image1} alt="" className="rounded-md" />
              <img src={image1} alt="" className="rounded-md" />
            </div>
            <div className="w-4/5">
              <img
                src={image1}
                className="h-full object-cover rounded-md"
                alt=""
              />
            </div>
          </div>
          {/* text caption  */}
          <div className="herba-detail w-full lg:w-3/5 space-y-2">
            <h2 className="font-bold text-2xl">Kozbara</h2>
            <div className="flex items-center gap-1">
              <FaRegStar className="text-yellow-400" />
              <FaRegStar className="text-yellow-400" />
              <FaRegStar className="text-yellow-400" />
              <FaRegStar className="text-yellow-400" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Benefits</h3>
              <p className="text-md ms-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Molestias nihil ullam totam similique pariatur possimus.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Side Effects</h3>
              <p className="text-md ms-2">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Aperiam cumque corporis nostrum ea doloremque illo.
              </p>
            </div>
            <div className="w-fit">
              <button className="btn">Add To Cart</button>
            </div>
          </div>
        </div>

        {/* related-herbas */}
        <div className="related-herbas mt-10">
          <h2 className="font-bold text-3xl text-center my-4">
            Related Herbas
          </h2>
          <div className=" flex flex-wrap">
            {relatedHerbas.map((el) => (
              <div key={el.id} className=" w-full sm:w-1/2 md:w-1/4 lg:w-1/6 space-y-2">
                <div className="m-3 rounded-lg shadow-md pointer bg-green-200/10 text-center">
                  <img
                    src={el.image}
                    alt={el.title}
                    className="w-full rounded-lg rounded-b-none"
                  />
                  <div className="content p-2">
                    <h4>{el.title}</h4>
                    <p>{el.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
