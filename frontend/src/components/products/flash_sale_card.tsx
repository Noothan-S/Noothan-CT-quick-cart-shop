import { FC, useState } from "react";
import { IProduct } from "../../interfaces/api.products.res.type";
import { Button, Modal } from "antd";
import { ShoppingCart } from "lucide-react";
import { calculateProductPriceForCard } from "../../utils/calculate_price_card";
import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/format-price";
import {
  addToCart,
  ICart,
  replaceCart,
} from "../../redux/features/cart/cart.slice";
import { useAppDispatch } from "../../redux/hooks";
import { toast } from "sonner";
const FlashSaleCard: FC<IProduct> = ({
  title,
  imgs,
  price,
  avgRating,
  quantity,
  discount,
  vendorId,
  id,
}) => {
  const calculatePrice = calculateProductPriceForCard(price, discount);
  const dispatch = useAppDispatch();
  const [showWarning, setShowWarning] = useState<boolean>(false);

  const payload: ICart = {
    vendorId,
    item: {
      id,
      title: title,
      img: imgs[0],
      quantity: 1,
      payable: calculatePrice.totalPrice,
      discount: calculatePrice.discountAmount,
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
    <section className="p-5 py-10 bg-red-50 rounded-md text-center transform duration-500 hover:-translate-y-2 cursor-pointer">
      <Link to={`/products/item/${id}`}>
        <img src={imgs[0]} alt={title} />
        <div className="space-x-1 flex justify-center mt-10">
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
        <h1 className="text-2xl my-5">{title}</h1>
        {/* <p className="mb-5">{description.slice(0, 240)}</p> */}
        <h2 className="font-semibold  text-3xl items-center mb-5">
          {formatPrice(calculatePrice.totalPrice)}
        </h2>
      </Link>
      <Button
        onClick={handleAddToCart}
        disabled={quantity < 1}
        variant="solid"
        size="large"
        color="danger"
      >
        <ShoppingCart className="h-4 w-4" /> Add to Cart
      </Button>
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
    </section>
  );
};

export default FlashSaleCard;
