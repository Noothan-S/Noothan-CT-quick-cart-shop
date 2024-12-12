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
exports.orderControllers = void 0;
const catch_async_1 = __importDefault(require("../../../utils/catch_async"));
const orders_service_1 = require("./orders.service");
const pick_1 = __importDefault(require("../../../utils/pick"));
const getAllOrders = (0, catch_async_1.default)(function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const options = (0, pick_1.default)(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
        const filters = (0, pick_1.default)(req.query, ['paymentStatus', 'status']);
        const result = yield orders_service_1.OrderServices.getAllOrdersFromDb(req.user, options, filters);
        res.status(result.status).json(result);
    });
});
const createNewOrder = (0, catch_async_1.default)(function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield orders_service_1.OrderServices.createNewOrderIntoDb(req.user, req.body);
        res.status(result.status).json(result);
    });
});
const updateOrderStatus = (0, catch_async_1.default)(function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield orders_service_1.OrderServices.updateOrderStatusIntoDb(req.user, req.params.id, req.body);
        res.status(result.status).json(result);
    });
});
exports.orderControllers = {
    createNewOrder,
    getAllOrders,
    updateOrderStatus
};
