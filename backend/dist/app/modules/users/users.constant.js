"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserConstants = void 0;
const fetchAllUsersIncludeObj = {
    profile: true,
};
const fetchMeIncludeObj = {
    follower: {
        include: {
            user: {
                include: {
                    profile: true,
                },
            },
        },
    },
    product: {
        include: {
            category: {
                select: {
                    name: true,
                },
            },
            orderItem: true,
            review: true,
        },
    },
};
const fetchMeProfileIncludeObj = {
    user: {
        select: {
            following: {
                include: {
                    vendor: true,
                },
            },
            order: {
                include: {
                    items: {
                        select: {
                            product: {
                                include: {
                                    category: {
                                        select: {
                                            name: true,
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
};
const fetchAllVendorsIncludeObj = {
    follower: {
        include: {
            user: {
                select: {
                    profile: true,
                },
            },
        },
    },
};
exports.UserConstants = {
    fetchAllUsersIncludeObj,
    fetchMeIncludeObj,
    fetchMeProfileIncludeObj,
    fetchAllVendorsIncludeObj,
};
