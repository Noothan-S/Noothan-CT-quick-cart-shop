import { createBrowserRouter } from "react-router-dom";
import Root from "../root";
import Home from "../pages/home";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import Vendor from "../pages/dashboard/vendor";
import AddProduct from "../pages/dashboard/vendor/add_product";
import AllProduct from "../pages/dashboard/vendor/all_products";
import ItemDetails from "../pages/shop/items/item_details";
import Products from "../pages/shop";
import RoleGard from "../utils/role_gard";
import UserRole from "../constants/user_role";
import VendorOrders from "../pages/dashboard/vendor/orders";
import Admin from "../pages/dashboard/admin";
import AllProductAdmin from "../pages/dashboard/admin/all-products";
import AdminOrders from "../pages/dashboard/admin/orders";
import VendorCoupons from "../pages/dashboard/vendor/coupons";
import AdminCoupons from "../pages/dashboard/admin/coupon";
import VendorReviews from "../pages/dashboard/vendor/reviews";

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
        path: "/products",
        element: <Products />,
      },
      {
        path: "/products/item/:id",
        element: <ItemDetails />,
      },
    ],
  },

  // vendor
  {
    path: "dashboard/vendor",
    element: (
      <RoleGard role={UserRole.vendor}>
        <Vendor />
      </RoleGard>
    ),
    children: [
      {
        index: true,
        element: <AllProduct />,
      },
      {
        path: "products",
        element: <AllProduct />,
      },
      {
        path: "add-product",
        element: <AddProduct />,
      },
      {
        path: "orders",
        element: <VendorOrders />,
      },
      {
        path: "coupons",
        element: <VendorCoupons />,
      },
      {
        path: "reviews",
        element: <VendorReviews />,
      },
    ],
  },

  // admin
  {
    path: "/dashboard/admin",
    element: (
      <RoleGard role={UserRole.admin}>
        <Admin />
      </RoleGard>
    ),
    children: [
      {
        index: true,
        element: <AllProductAdmin />,
      },
      {
        path: "products",
        element: <AllProductAdmin />,
      },
      {
        path: "orders",
        element: <AdminOrders />,
      },
      {
        path: "coupons",
        element: <AdminCoupons />,
      },
      {
        path: "reviews",
        element: <VendorReviews />,
      },
    ],
  },
]);
