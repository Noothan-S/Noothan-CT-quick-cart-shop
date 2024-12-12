"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsConstants = void 0;
const productIncludeObj = {
    category: {
        select: {
            name: true,
            id: true,
        },
    },
    coupon: true,
    vendor: true,
    review: {
        where: {
            isDeleted: false,
        },
        orderBy: {
            createdAt: "desc",
        },
        include: {
            user: {
                select: {
                    profile: true,
                },
            },
            vendorResponse: {
                where: {
                    isDeleted: false,
                },
                orderBy: {
                    createdAt: "desc",
                },
            },
        },
    },
};
const productCategoryIncludeObjForCoupon = {
    product: {
        include: {
            vendor: true,
            category: {
                select: {
                    name: true,
                },
            },
        },
    },
};
exports.ProductsConstants = {
    productIncludeObj,
    productCategoryIncludeObjForCoupon,
};
