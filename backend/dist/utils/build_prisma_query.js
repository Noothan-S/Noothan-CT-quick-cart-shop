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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const pagination_helper_1 = require("./pagination_helper");
const prisma = new client_1.PrismaClient();
const buildPrismaQuery = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const { model, filters = {}, pagination, include } = options;
    const { limit, page, skip, sortBy, sortOrder } = pagination_helper_1.paginationHelper.calculatePagination(pagination);
    const andConditions = [];
    // Handle the case where a search term is provided
    if (filters.searchTerm) {
        andConditions.push({
            OR: [
                { title: { contains: filters.searchTerm, mode: "insensitive" } },
                { description: { contains: filters.searchTerm, mode: "insensitive" } },
            ],
        });
    }
    // Handle price range filtering for `product` model
    if (model === "product") {
        if (filters.minPrice) {
            andConditions.push({
                price: { gte: +filters.minPrice },
            });
        }
        if (filters.maxPrice) {
            andConditions.push({
                price: { lte: +filters.maxPrice },
            });
        }
    }
    // Map other filters into Prisma's AND conditions
    Object.keys(filters).forEach((key) => {
        if (key !== "searchTerm" && key !== "minPrice" && key !== "maxPrice") {
            andConditions.push({
                [key]: { equals: filters[key] },
            });
        }
    });
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const queryOptions = {
        where: whereConditions,
        skip,
        take: limit,
        orderBy: sortBy ? { [sortBy]: sortOrder || "asc" } : undefined,
        include,
    };
    const result = yield prisma[model].findMany(queryOptions);
    const total = yield prisma[model].count({ where: whereConditions });
    const totalPages = Math.ceil(total / limit);
    let computedResults = result;
    // Only compute avgRating and totalSale if the model is `product`
    if (model === "product") {
        computedResults = result.map((item) => {
            var _a, _b;
            const avgRating = ((_a = item.review) === null || _a === void 0 ? void 0 : _a.length) > 0
                ? item.review.reduce((sum, rev) => sum + rev.rating, 0) /
                    item.review.length
                : 0;
            const totalSale = ((_b = item.orderItem) === null || _b === void 0 ? void 0 : _b.length) > 0
                ? item.orderItem.reduce((sum, order) => sum + order.quantity, 0)
                : 0;
            return Object.assign(Object.assign({}, item), { avgRating,
                totalSale });
        });
    }
    return {
        meta: { total, totalPages, page, limit },
        data: computedResults,
    };
});
exports.default = buildPrismaQuery;
