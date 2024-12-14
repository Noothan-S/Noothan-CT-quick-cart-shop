import { Badge, Button } from "antd";
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

const AddToCart: FC<IProduct> = ({
  quantity,
  vendorId,
  id,
  imgs,
  price,
  title,
}) => {
  const ButtonGroup = Button.Group;
  const [count, setCount] = useState<number>(1);
  const dispatch = useAppDispatch();
  const [showWarning, setShowWarning] = useState(false);

  const payload: ICart = {
    vendorId,
    item: {
      id,
      img: imgs[0],
      payable: price * count,
      quantity: count,
      title: title,
    },
  };

  function handleAddToCart() {
    try {
      dispatch(addToCart(payload));
    } catch (error: any) {
      if (error?.message === "vendor_conflict") {
        setShowWarning(true);
      }
    }
  }

  const handleReplaceCart = () => {
    dispatch(replaceCart([payload]));
    setShowWarning(false);
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
    </div>
  );
};

export default AddToCart;
