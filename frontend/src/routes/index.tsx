import { createBrowserRouter } from "react-router-dom";
import Root from "../root";
import Home from "../pages/home";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import Vendor from "../pages/bashboard/vendor";
import AddProduct from "../pages/bashboard/vendor/add_product";
import AllProduct from "../pages/bashboard/vendor/all_products";
import Shop from "../pages/shop";
import ItemDetails from "../pages/shop/items/item_details";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/register",
        element: <Register />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/shop/item/:id",
        element: <ItemDetails />,
      },
    ],
  },
  {
    path: "dashboard/vendor",
    element: <Vendor />,
    children: [
      {
        path: "add-product",
        element: <AddProduct />,
      },
      {
        path: "products",
        element: <AllProduct />,
      },
    ],
  },
]);
