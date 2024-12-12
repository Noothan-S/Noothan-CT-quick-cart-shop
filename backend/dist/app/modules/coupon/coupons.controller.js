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
exports.CouponControllers = void 0;
const catch_async_1 = __importDefault(require("../../../utils/catch_async"));
const coupons_service_1 = require("./coupons.service");
const getAllCoupon = (0, catch_async_1.default)(function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield coupons_service_1.CouponServices.getAllCouponsFromDb(req.user);
        res.status(result.status).json(result);
    });
});
const getSingleCoupon = (0, catch_async_1.default)(function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield coupons_service_1.CouponServices.getSingleCouponFromDb(req.body);
        res.status(result.status).json(result);
    });
});
const createNewCoupon = (0, catch_async_1.default)(function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield coupons_service_1.CouponServices.createNewCouponIntoDb(req.body);
        res.status(result.status).json(result);
    });
});
const updateCoupon = (0, catch_async_1.default)(function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield coupons_service_1.CouponServices.updateCouponIntoDb(req.user, req.body);
        res.status(result.status).json(result);
    });
});
const deleteCoupon = (0, catch_async_1.default)(function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield coupons_service_1.CouponServices.deleteCouponFromDb(req.user, req.body);
        res.status(result.status).json(result);
    });
});
exports.CouponControllers = {
    createNewCoupon,
    updateCoupon,
    deleteCoupon,
    getAllCoupon,
    getSingleCoupon
};
