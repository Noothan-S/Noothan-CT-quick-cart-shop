import { ShoppingCart } from "lucide-react";
import heroImg from "../../assets/home/hero-banner.webp";
import { Button } from "antd";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-red-300 to-red-400  py-20">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Discover Unique Products from Global Vendors
          </h1>
          <p className="text-xl mb-6">
            Shop from thousands of independent sellers all in one place
          </p>
          <Link to="/products">
            <Button color="danger" size="large" variant="solid">
              <ShoppingCart className="h-4 w-4" /> Start Shopping New
            </Button>
          </Link>
        </div>
        <div className="md:w-1/2">
          <img
            src={heroImg}
            alt="Multivendor marketplace"
            className="rounded-lg shadow-xl"
          />
        </div>
      </div>
    </section>
  );
}
