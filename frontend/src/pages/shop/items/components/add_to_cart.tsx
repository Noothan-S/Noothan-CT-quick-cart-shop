import { Badge, Button, Modal } from "antd";
import { ShoppingCart } from "lucide-react";
import { FC, useState } from "react";
import { IProduct } from "../../../../interfaces/api.products.res.type";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useAppDispatch } from "../../../../redux/hooks";
import {
  addToCart,
  ICart,
  replaceCart,
} from "../../../../redux/features/cart/cart.slice";
import { calculateProductPriceForCard } from "../../../../utils/calculate_price_card";
import { toast } from "sonner";

const AddToCart: FC<IProduct> = ({
  quantity,
  vendorId,
  id,
  imgs,
  price,
  title,
  discount,
}) => {
  const ButtonGroup = Button.Group;
  const [count, setCount] = useState<number>(1);
  const dispatch = useAppDispatch();
  const [showWarning, setShowWarning] = useState<boolean>(false);

  const payload: ICart = {
    vendorId,
    item: {
      id,
      title: title,
      img: imgs[0],
      quantity: count,
      payable: calculateProductPriceForCard(price, discount).totalPrice * count,
      discount:
        calculateProductPriceForCard(price, discount).discountAmount * count,
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
    <div className="flex items-center space-x-4 mb-6">
      <ButtonGroup size="large">
        <Button
          onClick={() => setCount((prev) => prev - 1)}
          disabled={count <= 1}
          icon={<MinusOutlined />}
        />
        <Button
          onClick={() => setCount((prev) => prev + 1)}
          disabled={count >= quantity}
          icon={<PlusOutlined />}
        />
      </ButtonGroup>
      <Badge onClick={handleAddToCart} count={count}>
        <Button
          disabled={quantity < 1}
          variant="solid"
          size="large"
          color="danger"
        >
          <ShoppingCart className="h-4 w-4" /> Add to Cart
        </Button>
      </Badge>
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

export default AddToCart;
