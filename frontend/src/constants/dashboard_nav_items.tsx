import { ShoppingBasket, SquareChartGantt } from "lucide-react";
import { Link } from "react-router-dom";

const VENDOR = [
  {
    key: "1",
    icon: <SquareChartGantt />,
    label: <Link to="products">All Products</Link>,
  },
  {
    key: "2",
    icon: <ShoppingBasket />,
    label: <Link to="add-product">Add Product</Link>,
  },
];

const ADMIN = [
  {
    key: "1",
    icon: <SquareChartGantt />,
    label: <Link to="products">All Products</Link>,
  },
];

export const DashboardNavItems = {
  VENDOR,
  ADMIN,
};
