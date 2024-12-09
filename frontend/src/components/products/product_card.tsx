import React from "react";
import { IProduct } from "../../interfaces/api.products.res.type";
import { calculateProductPriceForCard } from "../../utils/calculate_price_card";
import { Link } from "react-router-dom";

const ProductCard: React.FC<IProduct> = ({
  imgs,
  title,
  avgRating,
  description,
  price,
  discount,
  id,
}) => {
  const calculatedPrice = calculateProductPriceForCard(price, discount);

  return (
    <div className="max-w-sm w-full transform duration-500 hover:-translate-y-2 bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Fixed Image Section */}
      <Link to={`/products/item/${id}`}>
        <div className="h-64 w-full bg-gray-100">
          <img className="object-cover h-64 w-full" src={imgs[0]} alt={title} />
        </div>

        {/* Product Info Section */}
        <div className="flex flex-col gap-1 mt-4 px-4">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          <span className="font-normal text-gray-600">
            {description.slice(0, 40)} ...
          </span>
          <div className="flex gap-4">
            <span className="font-semibold text-gray-800">
              ${calculatedPrice.totalPrice}
            </span>

            {calculatedPrice.discountAmount > 0 && (
              <span className="line-through text-gray-500">${price}</span>
            )}
          </div>
        </div>
      </Link>

      {/* Ratings Section */}
      <div className="flex px-4 mt-2">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            className={`w-4 h-4 mx-px fill-current ${
              index < parseInt(String(avgRating))
                ? "text-orange-600"
                : "text-gray-300"
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 14 14"
          >
            <path d="M6.43 12l-2.36 1.64a1 1 0 0 1-1.53-1.11l.83-2.75a1 1 0 0 0-.35-1.09L.73 6.96a1 1 0 0 1 .59-1.8l2.87-.06a1 1 0 0 0 .92-.67l.95-2.71a1 1 0 0 1 1.88 0l.95 2.71c.13.4.5.66.92.67l2.87.06a1 1 0 0 1 .59 1.8l-2.3 1.73a1 1 0 0 0-.34 1.09l.83 2.75a1 1 0 0 1-1.53 1.1L7.57 12a1 1 0 0 0-1.14 0z" />
          </svg>
        ))}
      </div>

      {/* Add to Cart Section */}
      <div className="mt-4 p-4 bg-red-50 border-t border-gray-200">
        <button className="w-full flex justify-between items-center font-bold cursor-pointer hover:underline text-gray-800">
          <span className="text-base">Add to Cart</span>
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
