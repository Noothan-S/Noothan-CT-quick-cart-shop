import { Router } from "express"
import { UserRoutes } from "../modules/users/users.route";

const router: Router = Router()

const moduleRoutes = [
    {
        path: '/users',
        route: UserRoutes
    }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router;