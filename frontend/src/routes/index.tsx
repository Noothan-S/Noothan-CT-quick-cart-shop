import { createBrowserRouter } from "react-router-dom";
import Root from "../root";
import Home from "../pages/home";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: '/auth/login',
                element: <Login />
            },
            {
                path: '/auth/register',
                element: <Register />
            },
        ]
    },
]);