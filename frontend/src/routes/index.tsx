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
import Vendors from "../pages/dashboard/admin/vendors";
import Customers from "../pages/dashboard/admin/users";
import Categories from "../pages/dashboard/admin/categories";
import CheckUserStatus from "../utils/check-account-status";
import Profile from "../pages/profile/profile";
import ProtectedRoute from "../utils/protected-route";
import VendorsPage from "../pages/vendors/vendors";
import ErrorElement from "../errors/error-element";
import Checkout from "../pages/checkout/checkout";
import StripePayment from "../pages/payment/stripe-payment";
import CustomerOrders from "../pages/orders/customer-orders";
import ProductComparison from "../pages/comparison/product-comparison";
import AboutPage from "../pages/about/about";
import ForgotPassword from "../pages/auth/forgot-password/forgot-password";
import AntiLoginGard from "../utils/anti-login-gard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorElement />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/auth/login",
        element: (
          <AntiLoginGard>
            <Login />
          </AntiLoginGard>
        ),
      },
      {
        path: "/auth/register",
        element: (
          <AntiLoginGard>
            <Register />
          </AntiLoginGard>
        ),
      },
      {
        path: "/auth/forgot-password",
        element: (
          <AntiLoginGard>
            <ForgotPassword />
          </AntiLoginGard>
        ),
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/products/item/:id",
        element: <ItemDetails />,
      },
      {
        path: "/vendors",
        element: <VendorsPage />,
      },
      {
        path: "/compare",
        element: <ProductComparison />,
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/checkout",
        element: (
          <ProtectedRoute>
            <CheckUserStatus>
              <Checkout />
            </CheckUserStatus>
          </ProtectedRoute>
        ),
      },
      {
        path: "/orders",
        element: (
          <RoleGard role={UserRole.customer}>
            <CheckUserStatus>
              <CustomerOrders />
            </CheckUserStatus>
          </RoleGard>
        ),
      },
      {
        path: "/payout",
        element: (
          <ProtectedRoute>
            <CheckUserStatus>
              <StripePayment />
            </CheckUserStatus>
          </ProtectedRoute>
        ),
      },
    ],
  },

  // vendor
  {
    path: "dashboard/vendor",
    element: (
      <RoleGard role={UserRole.vendor}>
        <CheckUserStatus>
          <Vendor />
        </CheckUserStatus>
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
        <CheckUserStatus>
          <Admin />
        </CheckUserStatus>
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
      {
        path: "vendors",
        element: <Vendors />,
      },
      {
        path: "customers",
        element: <Customers />,
      },
      {
        path: "categories",
        element: <Categories />,
      },
    ],
  },
]);
