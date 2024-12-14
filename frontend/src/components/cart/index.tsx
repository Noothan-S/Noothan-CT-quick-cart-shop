import { Badge } from "antd";
import { ShoppingCart } from "lucide-react";
import { FC, useState } from "react";
import ShoppingCartDrawer from "./cart-drawer";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { selectCart } from "../../redux/features/cart/cart.slice";

const Cart: FC = () => {
  const cart = useAppSelector((state: RootState) => selectCart(state));
  const [isShoppingCartDrawerOpen, setIsShoppingCartDrawerOpen] =
    useState<boolean>(false);

  return (
    <>
      <Badge
        className="cursor-pointer"
        onClick={() => setIsShoppingCartDrawerOpen(true)}
        count={cart.length}
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
