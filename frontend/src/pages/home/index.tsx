import React from "react";
// import Hero from "../../components/home/hero";
import FeaturedCategories from "../../components/home/featured_categories";
import Benefits from "../../components/home/benefits";
import PopularProducts from "../../components/home/popular_products";
import FlashSale from "../../components/home/flash_sale";
import BannerCarousel from "../../components/home/hero2";

const Home: React.FC = () => {
  return (
    <div className="">
      {/* <Hero /> */}
      <BannerCarousel />
      <FlashSale />
      <FeaturedCategories />
      <PopularProducts />
      <Benefits />
    </div>
  );
};

export default Home;
