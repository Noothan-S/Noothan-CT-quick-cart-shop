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
exports.CategoryServices = void 0;
const prisma_constructor_1 = __importDefault(require("../../constants/prisma_constructor"));
function getCategoriesFromDb() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield prisma_constructor_1.default.category.findMany({
            where: {
                isDeleted: false,
            },
            orderBy: {
                updatedAt: "desc",
            },
        });
        return {
            status: 200,
            success: true,
            message: "Categories retrieved successfully",
            data: result,
        };
    });
}
function createCategoryIntoDb(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        let result;
        const isExistInTrash = yield prisma_constructor_1.default.category.findUnique({
            where: {
                name: payload.name,
            },
        });
        if (isExistInTrash) {
            result = yield prisma_constructor_1.default.category.update({
                where: {
                    name: payload.name,
                },
                data: {
                    isDeleted: false,
                },
            });
        }
        else {
            result = yield prisma_constructor_1.default.category.create({
                data: payload,
            });
        }
        return {
            status: 201,
            success: true,
            message: `${payload.name} is successfully ${isExistInTrash ? "restored from trash" : "created as new category"}`,
            data: result,
        };
    });
}
function updateCategoryIntoDb(id, payload) {
    return __awaiter(this, void 0, void 0, function* () {
        const isExist = yield prisma_constructor_1.default.category.findUnique({
            where: {
                id,
                isDeleted: false,
            },
        });
        if (!isExist) {
            return {
                status: 404,
                success: false,
                message: `Category no longer exist`,
                data: null,
            };
        }
        const result = yield prisma_constructor_1.default.category.update({
            where: {
                id,
            },
            data: payload,
        });
        return {
            success: true,
            status: 200,
            message: `${isExist.name} is successfully updated to ${payload.name}`,
            data: result,
        };
    });
}
function deleteCategoryFromDb(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield prisma_constructor_1.default.category.update({
            where: {
                id,
            },
            data: {
                isDeleted: true,
            },
        });
        return {
            status: 200,
            success: true,
            message: "Category deleted successfully",
            data: result,
        };
    });
}
exports.CategoryServices = {
    createCategoryIntoDb,
    updateCategoryIntoDb,
    deleteCategoryFromDb,
    getCategoriesFromDb,
};
