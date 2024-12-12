"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductServices = void 0;
const client_1 = require("@prisma/client");
const prisma_constructor_1 = __importDefault(require("../../constants/prisma_constructor"));
const build_prisma_query_1 = __importDefault(require("../../../utils/build_prisma_query"));
const products_constant_1 = require("./products.constant");
const calculate_avg_rating_sale_1 = __importDefault(require("../../../utils/calculate_avg_rating_sale"));
function getAllProductsFromDb(options, filters) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield (0, build_prisma_query_1.default)({
            model: "product",
            filters: Object.assign(Object.assign({}, filters), { isDeleted: false }),
            pagination: options,
            include: products_constant_1.ProductsConstants.productIncludeObj,
        });
        return {
            status: 200,
            success: true,
            message: "Products retrieved successfully",
            data: result,
        };
    });
}
function getSingleProductFromDb(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield prisma_constructor_1.default.product.findUnique({
            where: {
                id,
                isDeleted: false,
            },
            include: products_constant_1.ProductsConstants.productIncludeObj,
        });
        if (!result) {
            return {
                status: 404,
                success: false,
                message: "Product not found with that id.",
                data: null,
            };
        }
        return {
            status: 200,
            success: true,
            message: "Product retrieved successfully",
            data: (0, calculate_avg_rating_sale_1.default)(result),
        };
    });
}
function createProductIntoDb(user, payload) {
    return __awaiter(this, void 0, void 0, function* () {
        const vendor = yield prisma_constructor_1.default.vendor.findUnique({
            where: {
                email: user.email,
            },
        });
        if (!vendor) {
            return {
                status: 404,
                success: false,
                message: "Vendor not found",
                data: null,
            };
        }
        if (vendor.isBlackListed) {
            return {
                status: 400,
                success: false,
                message: "Your Vendor is black listed. contact support support for more info",
                data: null,
            };
        }
        const category = yield prisma_constructor_1.default.category.findUnique({
            where: {
                id: payload.categoryId,
                isDeleted: false,
            },
        });
        if (!category) {
            return {
                status: 404,
                success: false,
                message: "Category not found for deleted by admin",
                data: null,
            };
        }
        const result = yield prisma_constructor_1.default.product.create({
            data: Object.assign({ vendorId: vendor.id }, payload),
            include: {
                category: {
                    select: {
                        name: true,
                    },
                },
                vendor: true,
            },
        });
        return {
            status: 201,
            success: true,
            message: "Product created successfully",
            data: result,
        };
    });
}
function updateProductIntoDb(user, id, payload) {
    return __awaiter(this, void 0, void 0, function* () {
        const product = yield prisma_constructor_1.default.product.findUnique({
            where: {
                id,
                isDeleted: false,
            },
            include: {
                vendor: {
                    include: {
                        user: true,
                    },
                },
            },
        });
        if (!product) {
            return {
                status: 404,
                success: false,
                message: "Product not found with that id",
                data: null,
            };
        }
        if ((product === null || product === void 0 ? void 0 : product.vendor.user.id) !== user.id && user.role !== client_1.UserRole.ADMIN) {
            return {
                status: 401,
                success: false,
                message: "You cannot modify another vendor's product.",
                data: null,
            };
        }
        const result = yield prisma_constructor_1.default.product.update({
            where: {
                id,
            },
            data: payload,
            include: {
                category: {
                    select: {
                        name: true,
                    },
                },
            },
        });
        return {
            status: 200,
            success: true,
            message: `${product.title} is successfully updated`,
            data: result,
        };
    });
}
function deleteProductFromDb(user, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const product = yield prisma_constructor_1.default.product.findUnique({
            where: {
                id,
                isDeleted: false,
            },
            include: {
                vendor: {
                    include: {
                        user: true,
                    },
                },
            },
        });
        if (!product) {
            return {
                status: 404,
                success: false,
                message: "Product not found with that id",
                data: null,
            };
        }
        if ((product === null || product === void 0 ? void 0 : product.vendor.user.id) !== user.id && user.role !== client_1.UserRole.ADMIN) {
            return {
                status: 401,
                success: false,
                message: "You cannot delete another vendor's product.",
                data: null,
            };
        }
        const result = yield prisma_constructor_1.default.product.update({
            where: {
                id,
            },
            data: {
                isDeleted: true,
            },
            include: {
                category: {
                    select: {
                        name: true,
                    },
                },
            },
        });
        return {
            status: 200,
            success: true,
            message: `${product.title} is successfully deleted`,
            data: result,
        };
    });
}
exports.ProductServices = {
    createProductIntoDb,
    updateProductIntoDb,
    deleteProductFromDb,
    getAllProductsFromDb,
    getSingleProductFromDb,
};
