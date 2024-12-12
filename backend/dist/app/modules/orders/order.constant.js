"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderConstants = void 0;
const newOrderCreateIncludeObj = {
    items: {
        include: {
            product: true
        }
    }
};
const fetchOrdersForCustomer = {
    vendor: true,
    items: {
        include: {
            product: true
        }
    }
};
const fetchOrdersVendor = {
    user: {
        select: {
            profile: true
        }
    },
    items: {
        include: {
            product: true
        }
    }
};
const fetchOrdersAdmin = {
    user: {
        select: {
            profile: true
        }
    },
    items: {
        include: {
            product: true
        }
    },
    vendor: true
};
const fetchOrderForUpdateStatus = {
    vendor: {
        include: {
            user: {
                select: {
                    id: true
                }
            }
        }
    }
};
exports.OrderConstants = {
    newOrderCreateIncludeObj,
    fetchOrdersForCustomer,
    fetchOrdersVendor,
    fetchOrdersAdmin,
    fetchOrderForUpdateStatus
};
