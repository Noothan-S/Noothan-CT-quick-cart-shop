"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_route_1 = require("../modules/users/users.route");
const auth_route_1 = require("../modules/auth/auth.route");
const category_route_1 = require("../modules/category/category.route");
const products_route_1 = require("../modules/products/products.route");
const coupons_route_1 = require("../modules/coupon/coupons.route");
const reviews_route_1 = require("../modules/reviews/reviews.route");
const follows_route_1 = require("../modules/follow/follows.route");
const orders_route_1 = require("../modules/orders/orders.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/users',
        route: users_route_1.UserRoutes
    },
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes
    },
    {
        path: '/category',
        route: category_route_1.CategoryRoutes
    },
    {
        path: '/products',
        route: products_route_1.ProductRoutes
    },
    {
        path: '/coupons',
        route: coupons_route_1.CouponRoutes
    },
    {
        path: '/reviews',
        route: reviews_route_1.ReviewRoutes
    },
    {
        path: '/follows',
        route: follows_route_1.FollowRoutes
    },
    {
        path: '/orders',
        route: orders_route_1.OrderRoutes
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
