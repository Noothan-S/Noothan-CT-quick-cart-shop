import { FC } from "react";
import { IProduct } from "../../../../interfaces/api.products.res.type";
import { calculateProductPriceForCard } from "../../../../utils/calculate_price_card";

const ProductDetails: FC<IProduct> = ({
  title,
  price,
  discount,
  category,
  description,
}) => {
  const calculatedPrice = calculateProductPriceForCard(price, discount);

  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      <div className="flex gap-4 items-center">
        <p className="text-3xl font-semibold mb-2">
          ${calculatedPrice.totalPrice}
        </p>
        <p className="text-2xl text-gray-400 line-through font-semibold mb-2">
          ${price}
        </p>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        Category: {category.name}
      </p>
      <p className="text-gray-700">{description}</p>
    </div>
  );
};

export default ProductDetails;
