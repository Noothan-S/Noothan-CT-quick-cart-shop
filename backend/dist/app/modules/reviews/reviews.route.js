"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRoutes = void 0;
const express_1 = require("express");
const reviews_controller_1 = require("./reviews.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const zod_validation_1 = __importDefault(require("../../middlewares/zod_validation"));
const review_validation_1 = require("./review.validation");
const response_route_1 = require("./responses/response.route");
const router = (0, express_1.Router)();
router.get('/', (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.VENDOR), reviews_controller_1.ReviewControllers.getAllReviews);
router.post('/', (0, auth_1.default)(client_1.UserRole.CUSTOMER), (0, zod_validation_1.default)(review_validation_1.ReviewValidations.createReviewValidationSchema), reviews_controller_1.ReviewControllers.createNewReview);
router.patch('/:id', (0, auth_1.default)(client_1.UserRole.CUSTOMER, client_1.UserRole.ADMIN), (0, zod_validation_1.default)(review_validation_1.ReviewValidations.updateReviewValidationSchema), reviews_controller_1.ReviewControllers.updateReview);
router.delete('/:id', (0, auth_1.default)(client_1.UserRole.CUSTOMER, client_1.UserRole.ADMIN), reviews_controller_1.ReviewControllers.deleteReview);
// response
router.use('/response', response_route_1.ReviewResponseRoutes);
exports.ReviewRoutes = router;
