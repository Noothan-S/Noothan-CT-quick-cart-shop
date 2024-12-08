import heroImg from "../../assets/home/hero-banner.webp";
import { Button } from "antd";

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
          <Button color="danger" size="large" variant="solid">
            Start Shopping
          </Button>
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
