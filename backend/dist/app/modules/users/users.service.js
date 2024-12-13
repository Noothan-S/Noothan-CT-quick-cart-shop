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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = require("../../../utils/bcrypt");
const build_prisma_query_1 = __importDefault(require("../../../utils/build_prisma_query"));
const prisma_constructor_1 = __importDefault(require("../../constants/prisma_constructor"));
const users_constant_1 = require("./users.constant");
function getUserFromDb(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield prisma_constructor_1.default.user.findUnique({
            where: {
                email: user.email,
            },
        });
        if (!result) {
            return {
                status: 404,
                success: false,
                message: "user not found with that email",
                data: null,
            };
        }
        return {
            status: 200,
            success: true,
            message: "user retrieved successfully",
            data: result,
        };
    });
}
function blockUnblockUserIntoDb(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma_constructor_1.default.user.findUnique({
            where: {
                email: payload.email,
            },
        });
        if (!user) {
            return {
                status: 404,
                success: false,
                message: "user not found with that email",
                data: null,
            };
        }
        const actionPayloadForUser = {
            status: user.status === client_1.UserStatus.ACTIVE
                ? client_1.UserStatus.BLOCKED
                : client_1.UserStatus.ACTIVE,
        };
        const result = yield prisma_constructor_1.default.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
            const blockOrUnblockUser = yield prisma_constructor_1.default.user.update({
                where: {
                    email: payload.email,
                },
                data: actionPayloadForUser,
            });
            if (user.role === client_1.UserRole.VENDOR) {
                const actionPayloadForVendor = {
                    isBlackListed: user.status === client_1.UserStatus.ACTIVE,
                };
                yield prisma_constructor_1.default.vendor.update({
                    where: {
                        email: payload.email,
                    },
                    data: actionPayloadForVendor,
                });
            }
            if (user.role === client_1.UserRole.CUSTOMER) {
                const actionPayloadForCustomer = {
                    isDeleted: user.status === client_1.UserStatus.ACTIVE,
                };
                yield prisma_constructor_1.default.profile.update({
                    where: {
                        email: payload.email,
                    },
                    data: actionPayloadForCustomer,
                });
            }
            return blockOrUnblockUser;
        }));
        return {
            status: 200,
            success: true,
            message: `User ${user.status === "ACTIVE" ? "Blocked" : "unblocked"} successfully`,
            data: result,
        };
    });
}
function getMyProfileFromDb(user, options) {
    return __awaiter(this, void 0, void 0, function* () {
        let result;
        switch (user.role) {
            case client_1.UserRole.VENDOR:
                result = yield prisma_constructor_1.default.vendor.findUnique({
                    where: {
                        email: user.email,
                        isBlackListed: false,
                    },
                    include: (options === null || options === void 0 ? void 0 : options.include) === "yes"
                        ? users_constant_1.UserConstants.fetchMeIncludeObj
                        : undefined,
                });
                break;
            default:
                result = yield prisma_constructor_1.default.profile.findUnique({
                    where: {
                        email: user.email,
                        isDeleted: false,
                    },
                    include: (options === null || options === void 0 ? void 0 : options.include) === "yes"
                        ? users_constant_1.UserConstants.fetchMeProfileIncludeObj
                        : undefined,
                });
                break;
        }
        if (!user) {
            return {
                status: 423,
                success: false,
                message: "Locked: User deleted or blocked by admin",
                data: null,
            };
        }
        return {
            status: 200,
            success: true,
            message: "Users retrieved successfully",
            data: result,
        };
    });
}
function getAllUsersFromDb(options, filters) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield (0, build_prisma_query_1.default)({
            model: "user",
            pagination: options,
            filters: Object.assign(Object.assign({}, filters), { role: client_1.UserRole.CUSTOMER }),
            include: users_constant_1.UserConstants.fetchAllUsersIncludeObj,
        });
        return {
            status: 200,
            success: true,
            message: "Users retrieved successfully",
            data: result,
        };
    });
}
function getAllVendorsFromDb(options, filters) {
    return __awaiter(this, void 0, void 0, function* () {
        const _filters = {};
        if (filters.isBlackListed === "true") {
            _filters.isBlackListed = true;
        }
        else if (filters.isBlackListed === "false") {
            _filters.isBlackListed = false;
        }
        const result = yield (0, build_prisma_query_1.default)({
            model: "vendor",
            pagination: options,
            filters: _filters,
            include: users_constant_1.UserConstants.fetchAllVendorsIncludeObj,
        });
        return {
            status: 200,
            success: true,
            message: "Vendors retrieved successfully",
            data: result,
        };
    });
}
function createUserIntoDb(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        const { password } = payload, othersData = __rest(payload, ["password"]);
        const hashedPassword = yield bcrypt_1.bcryptOperation.hashPassword(password);
        const isExist = yield prisma_constructor_1.default.user.findUnique({
            where: {
                email: othersData.email,
            },
        });
        if (isExist) {
            return {
                status: 400,
                success: false,
                message: "Email already registered",
                data: null,
            };
        }
        const result = yield prisma_constructor_1.default.user.create({
            data: Object.assign(Object.assign({}, othersData), { password: hashedPassword }),
        });
        const { password: _password } = result, userWithoutPassword = __rest(result, ["password"]);
        return {
            status: 201,
            success: true,
            message: "User created Successfully",
            data: userWithoutPassword,
        };
    });
}
function updateProfileIntoDb(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email } = payload, othersData = __rest(payload, ["email"]);
        let result;
        const user = yield prisma_constructor_1.default.user.findUnique({
            where: {
                email,
                isDeleted: false,
            },
        });
        if (!user) {
            return {
                status: 404,
                success: false,
                message: "Account not found with that id",
                data: null,
            };
        }
        if (user.role === "VENDOR") {
            result = yield prisma_constructor_1.default.vendor.upsert({
                where: { email },
                update: Object.assign({}, othersData),
                create: Object.assign({ email }, othersData),
            });
        }
        else {
            result = yield prisma_constructor_1.default.profile.upsert({
                where: { email },
                update: Object.assign({}, othersData),
                create: Object.assign({ email }, othersData),
            });
        }
        const { password } = user, userWithoutPassword = __rest(user, ["password"]);
        return {
            status: 200,
            success: true,
            message: `${user.role === "VENDOR" ? "Vendor" : "Profile"} updated successfully`,
            data: {
                user: Object.assign({}, userWithoutPassword),
                [user.role.toLocaleLowerCase()]: Object.assign({}, result),
            },
        };
    });
}
exports.UserServices = {
    createUserIntoDb,
    updateProfileIntoDb,
    getAllUsersFromDb,
    getAllVendorsFromDb,
    getMyProfileFromDb,
    blockUnblockUserIntoDb,
    getUserFromDb,
};
