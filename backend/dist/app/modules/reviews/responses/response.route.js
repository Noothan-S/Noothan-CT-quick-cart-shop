"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewResponseRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../../middlewares/auth"));
const client_1 = require("@prisma/client");
const response_controller_1 = require("./response.controller");
const zod_validation_1 = __importDefault(require("../../../middlewares/zod_validation"));
const response_validation_1 = require("./response.validation");
const router = (0, express_1.Router)();
router.use((0, auth_1.default)(client_1.UserRole.VENDOR, client_1.UserRole.ADMIN));
router.post('/:id', (0, zod_validation_1.default)(response_validation_1.ReviewResponseValidations.responseValidationSchema), response_controller_1.ReviewResponseControllers.responseNewReview);
router.patch('/:id', (0, zod_validation_1.default)(response_validation_1.ReviewResponseValidations.responseValidationSchema), response_controller_1.ReviewResponseControllers.updateReviewResponse);
router.delete('/:id', response_controller_1.ReviewResponseControllers.deleteReviewResponse);
exports.ReviewResponseRoutes = router;
