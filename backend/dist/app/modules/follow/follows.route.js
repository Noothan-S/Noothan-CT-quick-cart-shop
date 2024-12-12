"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowRoutes = void 0;
const express_1 = require("express");
const follows_controller_1 = require("./follows.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
router.get('/:vendorId', follows_controller_1.FollowControllers.getVendorFollowers);
router.get('/', (0, auth_1.default)(client_1.UserRole.CUSTOMER, client_1.UserRole.ADMIN, client_1.UserRole.VENDOR), follows_controller_1.FollowControllers.getFollowersOrFollowings);
router.post('/:vendorId', (0, auth_1.default)(client_1.UserRole.CUSTOMER), follows_controller_1.FollowControllers.createNewFollow);
exports.FollowRoutes = router;
