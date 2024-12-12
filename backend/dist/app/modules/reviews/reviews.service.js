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
exports.ReviewServices = void 0;
const client_1 = require("@prisma/client");
const prisma_constructor_1 = __importDefault(require("../../constants/prisma_constructor"));
function getAllReviewsFromDb(user) {
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
        const result = yield prisma_constructor_1.default.review.findMany({
            where: Object.assign({ isDeleted: false }, whereCondition),
            include: {
                product: true,
                vendorResponse: {
                    orderBy: {
                        createdAt: "desc",
                    },
                },
                user: {
                    select: {
                        profile: true,
                    },
                },
            },
            orderBy: {
                updatedAt: "desc",
            },
        });
        return {
            status: 200,
            success: true,
            message: "Reviews retrieve successfully",
            data: result,
        };
    });
}
function createNewReviewIntoDb(user, payload) {
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
                message: "Product not found",
                data: null,
            };
        }
        const result = yield prisma_constructor_1.default.review.create({
            data: Object.assign({ userId: user.id }, payload),
            include: {
                product: true,
                vendorResponse: true,
                user: {
                    select: {
                        profile: true,
                    },
                },
            },
        });
        return {
            status: 201,
            success: true,
            message: "Review created successfully",
            data: result,
        };
    });
}
function updateReviewIntoDb(user, id, payload) {
    return __awaiter(this, void 0, void 0, function* () {
        if (payload.isDeleted || payload.productId) {
            return {
                status: 400,
                success: false,
                message: "Invalid payload",
                data: null,
            };
        }
        const review = yield prisma_constructor_1.default.review.findUnique({
            where: {
                id,
                isDeleted: false,
            },
        });
        if (!review) {
            return {
                status: 404,
                success: false,
                message: "Review not found with that id",
                data: null,
            };
        }
        if (review.userId !== user.id && user.role !== client_1.UserRole.ADMIN) {
            return {
                status: 401,
                success: false,
                message: "Permission denied. You cannot some edit someone else's review",
                data: null,
            };
        }
        const result = yield prisma_constructor_1.default.review.update({
            where: {
                id,
            },
            data: payload,
            include: {
                product: true,
                vendorResponse: true,
                user: {
                    select: {
                        profile: true,
                    },
                },
            },
        });
        return {
            status: 200,
            success: true,
            message: "Review updated successfully",
            data: result,
        };
    });
}
function deleteReviewFromDb(user, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const review = yield prisma_constructor_1.default.review.findUnique({
            where: {
                id,
                isDeleted: false,
            },
        });
        if (!review) {
            return {
                status: 404,
                success: false,
                message: "Review not found with that id",
                data: null,
            };
        }
        if (review.userId !== user.id && user.role !== client_1.UserRole.ADMIN) {
            return {
                status: 401,
                success: false,
                message: "Permission denied. You cannot some delete someone else's review",
                data: null,
            };
        }
        const result = yield prisma_constructor_1.default.review.delete({
            where: {
                id,
            },
            include: {
                product: true,
                vendorResponse: true,
                user: {
                    select: {
                        profile: true,
                    },
                },
            },
        });
        return {
            status: 200,
            success: true,
            message: "Review deleted successfully",
            data: result,
        };
    });
}
exports.ReviewServices = {
    createNewReviewIntoDb,
    updateReviewIntoDb,
    deleteReviewFromDb,
    getAllReviewsFromDb,
};
