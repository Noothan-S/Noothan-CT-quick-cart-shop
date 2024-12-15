import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Use this if React Router is available
import { ArrowRight } from "lucide-react";
import FlashSaleCard from "../products/flash_sale_card";
import { useGetAllProductsQuery } from "../../redux/features/products/products.api";
import { IProduct } from "../../interfaces/api.products.res.type";

export default function FlashSale() {
  const { data: products } = useGetAllProductsQuery({
    limit: 3,
    sortOrder: "asc",
  });

  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60); // 24 hours in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Flash Sale</h2>
          <div className="text-danger-500 font-bold text-xl">
            Ends in: <span className="font-mono">{formatTime(timeLeft)}</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-4">
          {products?.data?.map((item: IProduct) => (
            <FlashSaleCard {...item} />
          ))}
        </div>
        <div className="mt-8 text-center">
          {/* Replace Link with <a> if not using React Router */}
          <Link
            to="/products"
            className="inline-flex items-center text-danger-500 hover:underline"
          >
            View All Flash Sale Items <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
