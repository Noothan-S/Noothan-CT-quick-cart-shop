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
exports.FollowServices = void 0;
const prisma_constructor_1 = __importDefault(require("../../constants/prisma_constructor"));
const is_valid_uuid_1 = __importDefault(require("../../../utils/is_valid_uuid"));
const follows_service_return_1 = __importDefault(require("./follows.service_return"));
const client_1 = require("@prisma/client");
function getFollowersOrFollowingsFromDb(user) {
    return __awaiter(this, void 0, void 0, function* () {
        let result;
        switch (user.role) {
            case client_1.UserRole.CUSTOMER:
                result = yield prisma_constructor_1.default.follow.findMany({
                    where: {
                        userId: user.id
                    },
                    include: {
                        vendor: true
                    }
                });
                break;
            case client_1.UserRole.VENDOR:
                result = yield prisma_constructor_1.default.follow.findMany({
                    where: {
                        vendor: {
                            email: user.email
                        }
                    },
                    include: {
                        user: {
                            select: {
                                profile: true
                            }
                        }
                    }
                });
                break;
            case client_1.UserRole.ADMIN:
                result = yield prisma_constructor_1.default.follow.findMany({
                    include: {
                        vendor: true,
                        user: {
                            select: {
                                profile: true
                            }
                        }
                    }
                });
        }
        ;
        return {
            status: 200,
            success: false,
            message: 'Data Retrieved successfully',
            data: result
        };
    });
}
;
function getVendorFollowersFromDb(vendorId) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(0, is_valid_uuid_1.default)(vendorId)) {
            return {
                status: 400,
                success: false,
                message: 'Invalid VendorId Formate',
                data: null
            };
        }
        const result = yield prisma_constructor_1.default.follow.findMany({
            where: {
                vendorId
            },
            include: {
                user: {
                    select: {
                        profile: true
                    }
                }
            }
        });
        return {
            status: 200,
            success: true,
            message: 'Followers retrieved successfully',
            data: result
        };
    });
}
function createOrRemoveFollowIntoDb(user, vendorId) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(0, is_valid_uuid_1.default)(vendorId)) {
            return (0, follows_service_return_1.default)('invalid_uuid');
        }
        ;
        const vendor = yield prisma_constructor_1.default.vendor.findUnique({
            where: {
                id: vendorId,
                isBlackListed: false
            }
        });
        if (!vendor) {
            return (0, follows_service_return_1.default)('vendor_not_found');
        }
        ;
        let result;
        const isExist = yield prisma_constructor_1.default.follow.findUnique({
            where: {
                userId_vendorId: {
                    userId: user.id,
                    vendorId
                }
            },
        });
        if (isExist) {
            result = yield prisma_constructor_1.default.follow.delete({
                where: {
                    userId_vendorId: {
                        userId: user.id,
                        vendorId
                    }
                },
                include: {
                    vendor: true
                }
            });
        }
        else {
            result = yield prisma_constructor_1.default.follow.create({
                data: {
                    userId: user.id,
                    vendorId
                },
                include: {
                    vendor: true
                }
            });
        }
        ;
        return (0, follows_service_return_1.default)(undefined, result);
    });
}
exports.FollowServices = {
    createOrRemoveFollowIntoDb,
    getFollowersOrFollowingsFromDb,
    getVendorFollowersFromDb
};
