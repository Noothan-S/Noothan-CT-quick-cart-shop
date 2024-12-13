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
exports.UserControllers = void 0;
const catch_async_1 = __importDefault(require("../../../utils/catch_async"));
const users_service_1 = require("./users.service");
const pick_1 = __importDefault(require("../../../utils/pick"));
const blockUnblockUser = (0, catch_async_1.default)(function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield users_service_1.UserServices.blockUnblockUserIntoDb(req.body);
        res.status(result.status).json(result);
    });
});
const getUser = (0, catch_async_1.default)(function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield users_service_1.UserServices.getUserFromDb(req.user);
        res.status(result.status).json(result);
    });
});
const getAllUsers = (0, catch_async_1.default)(function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const options = (0, pick_1.default)(req.query, ["limit", "page", "sortBy", "sortOrder"]);
        const filters = (0, pick_1.default)(req.query, []);
        const result = yield users_service_1.UserServices.getAllUsersFromDb(options, filters);
        res.status(result.status).json(result);
    });
});
const getMyProfile = (0, catch_async_1.default)(function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const options = (0, pick_1.default)(req.query, ["include"]);
        const result = yield users_service_1.UserServices.getMyProfileFromDb(req.user, options);
        res.status(result.status).json(result);
    });
});
const getAllVendors = (0, catch_async_1.default)(function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const options = (0, pick_1.default)(req.query, ["limit", "page", "sortBy", "sortOrder"]);
        const filters = (0, pick_1.default)(req.query, ["isBlackListed"]);
        const result = yield users_service_1.UserServices.getAllVendorsFromDb(options, filters);
        res.status(result.status).json(result);
    });
});
const createUser = (0, catch_async_1.default)(function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield users_service_1.UserServices.createUserIntoDb(req.body);
        res.status(result.status).json(result);
    });
});
const updateProfile = (0, catch_async_1.default)(function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield users_service_1.UserServices.updateProfileIntoDb(req.body);
        res.status(result.status).json(result);
    });
});
exports.UserControllers = {
    createUser,
    updateProfile,
    getAllUsers,
    getAllVendors,
    getMyProfile,
    blockUnblockUser,
    getUser,
};
