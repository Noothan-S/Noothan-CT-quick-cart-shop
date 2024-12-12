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
exports.ReviewControllers = void 0;
const catch_async_1 = __importDefault(require("../../../utils/catch_async"));
const reviews_service_1 = require("./reviews.service");
const getAllReviews = (0, catch_async_1.default)(function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield reviews_service_1.ReviewServices.getAllReviewsFromDb(req.user);
        res.status(result.status).json(result);
    });
});
const createNewReview = (0, catch_async_1.default)(function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield reviews_service_1.ReviewServices.createNewReviewIntoDb(req.user, req.body);
        res.status(result.status).json(result);
    });
});
const updateReview = (0, catch_async_1.default)(function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield reviews_service_1.ReviewServices.updateReviewIntoDb(req.user, req.params.id, req.body);
        res.status(result.status).json(result);
    });
});
const deleteReview = (0, catch_async_1.default)(function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield reviews_service_1.ReviewServices.deleteReviewFromDb(req.user, req.params.id);
        res.status(result.status).json(result);
    });
});
exports.ReviewControllers = {
    createNewReview,
    updateReview,
    deleteReview,
    getAllReviews
};
