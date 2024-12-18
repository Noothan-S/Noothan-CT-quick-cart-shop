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
exports.ProductControllers = void 0;
const catch_async_1 = __importDefault(require("../../../utils/catch_async"));
const pick_1 = __importDefault(require("../../../utils/pick"));
const products_service_1 = require("./products.service");
const getAllProducts = (0, catch_async_1.default)(function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const options = (0, pick_1.default)(req.query, ["limit", "page", "sortBy", "sortOrder"]);
        const filters = (0, pick_1.default)(req.query, [
            "vendorId",
            "searchTerm",
            "categoryId",
            "minPrice",
            "maxPrice",
        ]);
        const result = yield products_service_1.ProductServices.getAllProductsFromDb(options, filters);
        res.status(result.status).json(result);
    });
});
const getProductsForCompare = (0, catch_async_1.default)(function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield products_service_1.ProductServices.getProductsForCompareFromDb(req.query.ids);
        res.status(result.status).json(result);
    });
});
const getSingleProduct = (0, catch_async_1.default)(function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield products_service_1.ProductServices.getSingleProductFromDb(req.params.id);
        res.status(result.status).json(result);
    });
});
const createProduct = (0, catch_async_1.default)(function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield products_service_1.ProductServices.createProductIntoDb(req.user, req.body);
        res.status(result.status).json(result);
    });
});
const updateProduct = (0, catch_async_1.default)(function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield products_service_1.ProductServices.updateProductIntoDb(req.user, req.params.id, req.body);
        res.status(result.status).json(result);
    });
});
const deleteProduct = (0, catch_async_1.default)(function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield products_service_1.ProductServices.deleteProductFromDb(req.user, req.params.id);
        res.status(result.status).json(result);
    });
});
exports.ProductControllers = {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
    getSingleProduct,
    getProductsForCompare,
};
