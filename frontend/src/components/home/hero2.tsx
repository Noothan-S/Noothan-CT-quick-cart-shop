import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import img1 from "../../assets/hero/img1.webp";
import img2 from "../../assets/hero/img2.webp";
import img3 from "../../assets/hero/img3.webp";
import { Link } from "react-router-dom";

const banners = [
  {
    id: 1,
    title: "Summer Sale",
    description: "Up to 50% off on all summer essentials",
    image: img1,
    cta: "Shop Now",
  },
  {
    id: 2,
    title: "New Arrivals",
    description: "Check out our latest collection",
    image: img2,
    cta: "Explore",
  },
  {
    id: 3,
    title: "Free Shipping",
    description: "On orders over $100",
    image: img3,
    cta: "Learn More",
  },
];

export default function BannerCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[350px] md:h-[450px] lg:h-[500px] mx-auto overflow-hidden rounded-b-lg shadow-lg">
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {banners.map((banner) => (
          <div key={banner.id} className="w-full flex-shrink-0">
            <div className="relative h-[350px] md:h-[450px] lg:h-[500px] ">
              <img
                src={banner.image}
                alt={banner.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center p-6">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
                  {banner.title}
                </h2>
                <p className="text-lg sm:text-xl md:text-2xl text-white mb-4">
                  {banner.description}
                </p>
                <Link to={"/products"}>
                  <button className="bg-white text-black font-semibold py-2 px-6 rounded-full hover:bg-opacity-90 transition duration-300">
                    {banner.cta}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition duration-300"
      >
        <ChevronLeft className="w-6 h-6 text-black" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition duration-300"
      >
        <ChevronRight className="w-6 h-6 text-black" />
      </button>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${
              currentSlide === index ? "bg-white" : "bg-white bg-opacity-50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
