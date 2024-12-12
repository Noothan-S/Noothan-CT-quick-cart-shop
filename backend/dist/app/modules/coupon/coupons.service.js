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
exports.CouponServices = void 0;
const client_1 = require("@prisma/client");
const prisma_constructor_1 = __importDefault(require("../../constants/prisma_constructor"));
const products_constant_1 = require("../products/products.constant");
function getAllCouponsFromDb(user) {
    return __awaiter(this, void 0, void 0, function* () {
        let whereCondition = undefined;
        if (user.role === "VENDOR") {
            const vendor = yield prisma_constructor_1.default.vendor.findUnique({
                where: {
                    email: user.email,
                },
                select: { id: true },
            });
            if (!vendor) {
                return {
                    status: 404,
                    success: false,
                    message: "Vendor not found",
                    data: null,
                };
            }
            whereCondition = { product: { vendorId: vendor.id } };
        }
        const result = yield prisma_constructor_1.default.coupon.findMany({
            where: Object.assign({ expiryDate: {
                    gt: new Date(),
                }, isDeleted: false }, whereCondition),
            include: products_constant_1.ProductsConstants.productCategoryIncludeObjForCoupon,
        });
        return {
            status: 200,
            success: true,
            message: `Coupons retrieved successfully for ${user.role === client_1.UserRole.ADMIN ? "Admin" : "Vendor"}`,
            data: result,
        };
    });
}
function getSingleCouponFromDb(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield prisma_constructor_1.default.coupon.findFirst({
            where: {
                code: payload.code,
                productId: payload.productId,
                isDeleted: false,
                expiryDate: {
                    gt: new Date(),
                },
            },
            include: products_constant_1.ProductsConstants.productCategoryIncludeObjForCoupon,
        });
        if (!result) {
            return {
                status: 404,
                success: false,
                message: "Invalid coupon code or expired",
                data: null,
            };
        }
        return {
            status: 200,
            success: false,
            message: "Coupon retrieve successfully",
            data: result,
        };
    });
}
function createNewCouponIntoDb(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        const product = yield prisma_constructor_1.default.product.findUnique({
            where: {
                id: payload.productId,
                isDeleted: false,
            },
        });
        if (!product) {
            return {
                status: 404,
                success: false,
                message: "Product not found or deleted",
                data: null,
            };
        }
        const isExist = yield prisma_constructor_1.default.coupon.findUnique({
            where: {
                code_productId: {
                    code: payload.code,
                    productId: payload.productId,
                },
                isDeleted: false,
                expiryDate: {
                    gt: new Date(),
                },
            },
            include: products_constant_1.ProductsConstants.productCategoryIncludeObjForCoupon,
        });
        if (isExist) {
            return {
                status: 400,
                success: false,
                message: `${payload.code} is already exist`,
                data: isExist,
            };
        }
        const result = yield prisma_constructor_1.default.coupon.create({
            data: payload,
            include: products_constant_1.ProductsConstants.productCategoryIncludeObjForCoupon,
        });
        return {
            status: 201,
            success: true,
            message: "New coupon created successfully",
            data: result,
        };
    });
}
function updateCouponIntoDb(user, payload) {
    return __awaiter(this, void 0, void 0, function* () {
        if (payload.isDeleted) {
            return {
                status: 400,
                success: false,
                message: "Operation Not Allowed",
                data: null,
            };
        }
        const isExist = yield prisma_constructor_1.default.coupon.findUnique({
            where: {
                code_productId: {
                    code: payload.code,
                    productId: payload.productId,
                },
                isDeleted: false,
            },
            include: products_constant_1.ProductsConstants.productCategoryIncludeObjForCoupon,
        });
        if (!isExist) {
            return {
                status: 404,
                success: false,
                message: "Coupon not found with that productId and code",
                data: null,
            };
        }
        if (user.role === client_1.UserRole.VENDOR) {
            const vendor = yield prisma_constructor_1.default.vendor.findUnique({
                where: {
                    email: user.email,
                    isBlackListed: false,
                },
            });
            if (!vendor) {
                return {
                    status: 400,
                    success: false,
                    message: "Coupon owner not exist or black listed",
                    data: null,
                };
            }
            if (isExist.product.vendor.id !== vendor.id) {
                return {
                    status: 401,
                    success: false,
                    message: "You cannot update another vendor's coupon",
                    data: null,
                };
            }
        }
        const result = yield prisma_constructor_1.default.coupon.update({
            where: {
                code_productId: {
                    code: payload.code,
                    productId: payload.productId,
                },
            },
            data: payload,
            include: products_constant_1.ProductsConstants.productCategoryIncludeObjForCoupon,
        });
        return {
            status: 200,
            success: true,
            message: "Coupon updated successfully",
            data: result,
        };
    });
}
function deleteCouponFromDb(user, payload) {
    return __awaiter(this, void 0, void 0, function* () {
        const isExist = yield prisma_constructor_1.default.coupon.findUnique({
            where: {
                code_productId: {
                    code: payload.code,
                    productId: payload.productId,
                },
                isDeleted: false,
            },
            include: products_constant_1.ProductsConstants.productCategoryIncludeObjForCoupon,
        });
        if (!isExist) {
            return {
                status: 404,
                success: false,
                message: "Coupon not found with that productId and code or already deleted",
                data: null,
            };
        }
        if (user.role === client_1.UserRole.VENDOR) {
            const vendor = yield prisma_constructor_1.default.vendor.findUnique({
                where: {
                    email: user.email,
                    isBlackListed: false,
                },
            });
            if (!vendor) {
                return {
                    status: 400,
                    success: false,
                    message: "Coupon owner not exist or black listed",
                    data: null,
                };
            }
            if (isExist.product.vendor.id !== vendor.id) {
                return {
                    status: 401,
                    success: false,
                    message: "You cannot update another vendor's coupon",
                    data: null,
                };
            }
        }
        const result = yield prisma_constructor_1.default.coupon.update({
            where: {
                code_productId: {
                    code: payload.code,
                    productId: payload.productId,
                },
            },
            data: {
                isDeleted: true,
            },
            include: products_constant_1.ProductsConstants.productCategoryIncludeObjForCoupon,
        });
        return {
            status: 200,
            success: true,
            message: "Coupon deleted successfully",
            data: result,
        };
    });
}
exports.CouponServices = {
    createNewCouponIntoDb,
    updateCouponIntoDb,
    deleteCouponFromDb,
    getAllCouponsFromDb,
    getSingleCouponFromDb,
};
