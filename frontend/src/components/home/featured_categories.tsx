import React from "react";
import { Link } from "react-router-dom";
import { categories } from "../../constants/featured_categories";

const FeaturedCategories: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Featured Categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/products?category=${category.id}`}
              className="bg-white p-4 rounded-lg shadow-md text-center hover:shadow-lg transition duration-300"
            >
              <span className="text-4xl mb-2 block">{category.icon}</span>
              <span className="font-medium">{category.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
