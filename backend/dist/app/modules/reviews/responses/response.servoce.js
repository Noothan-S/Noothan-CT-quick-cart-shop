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
exports.ReviewResponseServices = void 0;
const client_1 = require("@prisma/client");
const prisma_constructor_1 = __importDefault(require("../../../constants/prisma_constructor"));
const response_constant_1 = require("./response.constant");
function responseNewReviewIntoDb(user, id, payload) {
    return __awaiter(this, void 0, void 0, function* () {
        const review = yield prisma_constructor_1.default.review.findUnique({
            where: {
                id,
                isDeleted: false,
            },
            include: response_constant_1.ReviewResponseConstants.findReviewForResponseIncludeObj,
        });
        // console.dir(review, { depth: null, colors: true });
        if (!review) {
            return {
                status: 404,
                success: false,
                message: "Review not found with that id",
                data: null,
            };
        }
        if (review.product.vendor.isBlackListed) {
            return {
                status: 400,
                success: false,
                message: "Vendor back listed",
                data: null,
            };
        }
        if (user.id !== review.product.vendor.user.id &&
            user.role !== client_1.UserRole.ADMIN) {
            return {
                status: 401,
                success: false,
                message: "Permission denied. You cannot replay another vendor's review",
                data: null,
            };
        }
        const _payload = Object.assign({ reviewId: id, vendorId: review.product.vendorId }, payload);
        const result = yield prisma_constructor_1.default.vendorResponse.create({
            data: _payload,
            include: {
                vendor: true,
            },
        });
        return {
            status: 201,
            success: true,
            message: "Successfully respond",
            data: result,
        };
    });
}
function updateReviewResponseIntoDb(user, id, payload) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield prisma_constructor_1.default.vendorResponse.findUnique({
            where: {
                id,
                isDeleted: false,
            },
            include: {
                vendor: {
                    include: {
                        user: {
                            select: {
                                id: true,
                            },
                        },
                    },
                },
            },
        });
        // console.dir(review, { depth: null, colors: true });
        if (!response) {
            return {
                status: 404,
                success: false,
                message: "response not found with that id",
                data: null,
            };
        }
        if (response.vendor.isBlackListed) {
            return {
                status: 400,
                success: false,
                message: "Vendor back listed",
                data: null,
            };
        }
        if (user.id !== response.vendor.user.id && user.role !== client_1.UserRole.ADMIN) {
            return {
                status: 401,
                success: false,
                message: "Permission denied. You cannot edit another vendor's review",
                data: null,
            };
        }
        const result = yield prisma_constructor_1.default.vendorResponse.update({
            where: {
                id,
            },
            data: payload,
            include: {
                vendor: true,
            },
        });
        return {
            status: 201,
            success: true,
            message: "Successfully edit response",
            data: result,
        };
    });
}
function deleteReviewResponseIntoDb(user, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield prisma_constructor_1.default.vendorResponse.findUnique({
            where: {
                id,
                isDeleted: false,
            },
            include: {
                vendor: {
                    include: {
                        user: {
                            select: {
                                id: true,
                            },
                        },
                    },
                },
            },
        });
        // console.dir(review, { depth: null, colors: true });
        if (!response) {
            return {
                status: 404,
                success: false,
                message: "response not found with that id or already deleted",
                data: null,
            };
        }
        if (response.vendor.isBlackListed) {
            return {
                status: 400,
                success: false,
                message: "Vendor back listed",
                data: null,
            };
        }
        if (user.id !== response.vendor.user.id && user.role !== client_1.UserRole.ADMIN) {
            return {
                status: 401,
                success: false,
                message: "Permission denied. You cannot delete another vendor's review",
                data: null,
            };
        }
        const result = yield prisma_constructor_1.default.vendorResponse.delete({
            where: {
                id,
            },
            include: {
                vendor: true,
            },
        });
        return {
            status: 201,
            success: true,
            message: "Response Successfully deleted",
            data: result,
        };
    });
}
exports.ReviewResponseServices = {
    responseNewReviewIntoDb,
    updateReviewResponseIntoDb,
    deleteReviewResponseIntoDb,
};
