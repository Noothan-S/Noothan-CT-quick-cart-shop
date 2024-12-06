import { Router } from "express"
import { UserRoutes } from "../modules/users/users.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { CategoryRoutes } from "../modules/category/category.route";
import { ProductRoutes } from "../modules/products/products.route";
import { CouponRoutes } from "../modules/coupon/coupons.route";
import { ReviewRoutes } from "../modules/reviews/reviews.route";
import { FollowRoutes } from "../modules/follow/follows.route";
import { OrderRoutes } from "../modules/orders/orders.route";


const router: Router = Router()

const moduleRoutes = [
    {
        path: '/users',
        route: UserRoutes
    },
    {
        path: '/auth',
        route: AuthRoutes
    },
    {
        path: '/category',
        route: CategoryRoutes
    },
    {
        path: '/products',
        route: ProductRoutes
    },
    {
        path: '/coupons',
        route: CouponRoutes
    },
    {
        path: '/reviews',
        route: ReviewRoutes
    },
    {
        path: '/follows',
        route: FollowRoutes
    },
    {
        path: '/orders',
        route: OrderRoutes
    },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router;