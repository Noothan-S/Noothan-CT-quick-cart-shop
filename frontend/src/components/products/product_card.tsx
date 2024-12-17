import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "antd";
import { toast } from "sonner";
import { useAppDispatch } from "../../redux/hooks";
import {
  addToCart,
  ICart,
  replaceCart,
} from "../../redux/features/cart/cart.slice";
import { IProduct } from "../../interfaces/api.products.res.type";
import { calculateProductPriceForCard } from "../../utils/calculate_price_card";
import { formatPrice } from "../../utils/format-price";

const ProductCard: React.FC<IProduct> = ({
  imgs,
  title,
  avgRating,
  description,
  price,
  discount,
  id,
  vendorId,
}) => {
  const calculatedPrice = calculateProductPriceForCard(price, discount);
  const dispatch = useAppDispatch();
  const [showWarning, setShowWarning] = useState<boolean>(false);

  const payload: ICart = {
    vendorId,
    item: {
      id,
      title: title,
      img: imgs[0],
      quantity: 1,
      payable: calculatedPrice.totalPrice,
      discount: calculatedPrice.discountAmount,
    },
  };

  function handleAddToCart() {
    try {
      dispatch(addToCart(payload));
      toast.success("Item added into cart!");
    } catch (error: any) {
      if (error?.message === "vendor_conflict") {
        setShowWarning(true);
      }
    }
  }

  const handleReplaceCart = () => {
    dispatch(replaceCart([payload]));
    setShowWarning(false);
    toast.success("Item added into cart!");
  };

  return (
    <div className="max-w-sm w-full bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full transform duration-500 hover:-translate-y-2">
      {/* Fixed Image Section */}
      <Link to={`/products/item/${id}`} className="flex-shrink-0">
        <div className="h-64 w-full bg-gray-100">
          <img className="object-cover h-64 w-full" src={imgs[0]} alt={title} />
        </div>
      </Link>

      {/* Product Info Section */}
      <div className="flex flex-col flex-grow p-4">
        <Link to={`/products/item/${id}`} className="flex-grow">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">{title}</h2>
          <p className="text-sm text-gray-600 mb-2">
            {description.slice(0, 40)}...
          </p>
          <div className="flex gap-4 mb-2">
            <span className="font-semibold text-gray-800">
              {formatPrice(calculatedPrice.totalPrice)}
            </span>
            {calculatedPrice.discountAmount > 0 && (
              <span className="line-through text-gray-500">
                {formatPrice(price)}
              </span>
            )}
          </div>
        </Link>

        {/* Ratings Section */}
        <div className="flex mb-4">
          {[...Array(5)].map((_, index) => (
            <svg
              key={index}
              className={`w-4 h-4 mx-px fill-current ${
                index < parseFloat(String(avgRating))
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
        <div className="mt-auto">
          <button
            onClick={handleAddToCart}
            className="w-full flex justify-between items-center font-bold cursor-pointer hover:bg-red-100 text-gray-800 bg-red-50 p-3 rounded transition-colors duration-300"
          >
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

      <Modal
        title="Products can only be added from one vendor at a time."
        centered
        open={showWarning}
        okType="danger"
        onOk={handleReplaceCart}
        okText="Replace with the new product"
        onCancel={() => setShowWarning(false)}
      >
        <p>
          To ensure a smooth shopping experience, you can only add products from
          one vendor to your cart at a time. Please complete or clear your
          current selection before adding items from another vendor.
        </p>
      </Modal>
    </div>
  );
};

export default ProductCard;
