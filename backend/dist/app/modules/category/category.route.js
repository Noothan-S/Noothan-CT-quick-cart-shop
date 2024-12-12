"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoutes = void 0;
const express_1 = require("express");
const category_controller_1 = require("./category.controller");
const zod_validation_1 = __importDefault(require("../../middlewares/zod_validation"));
const category_validation_1 = require("./category.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
router.get("/", category_controller_1.CategoryController.getCategories);
router.post("/", (0, auth_1.default)(client_1.UserRole.ADMIN), (0, zod_validation_1.default)(category_validation_1.CategoryValidation.CategoryValidationSchema), category_controller_1.CategoryController.createCategory);
router.patch("/:id", (0, auth_1.default)(client_1.UserRole.ADMIN), (0, zod_validation_1.default)(category_validation_1.CategoryValidation.CategoryValidationSchema), category_controller_1.CategoryController.updateCategory);
router.delete("/:id", (0, auth_1.default)(client_1.UserRole.ADMIN), category_controller_1.CategoryController.deleteCategory);
exports.CategoryRoutes = router;
