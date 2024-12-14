import { Badge } from "antd";
import { ShoppingCart } from "lucide-react";
import { FC, useState } from "react";
import ShoppingCartDrawer from "./cart-drawer";

const Cart: FC = () => {
  const [cartItem, setCartItem] = useState(6);
  const [isShoppingCartDrawerOpen, setIsShoppingCartDrawerOpen] =
    useState<boolean>(false);

  return (
    <>
      <Badge
        className="cursor-pointer"
        onClick={() => setIsShoppingCartDrawerOpen(true)}
        count={cartItem}
      >
        <ShoppingCart />
      </Badge>
      <ShoppingCartDrawer
        isOpen={isShoppingCartDrawerOpen}
        setIsOpen={setIsShoppingCartDrawerOpen}
      />
    </>
  );
};

export default Cart;
