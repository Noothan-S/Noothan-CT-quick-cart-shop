import { createBrowserRouter } from "react-router-dom";
import Root from "../root";
import Home from "../pages/home";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import Vendor from "../pages/bashboard/vendor";
import AddProduct from "../pages/bashboard/vendor/add_product";

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
    ],
  },
]);
