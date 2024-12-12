"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function calculateAvgRatingAndTotalSale(item) {
    var _a, _b;
    const avgRating = ((_a = item.review) === null || _a === void 0 ? void 0 : _a.length) > 0
        ? item.review.reduce((sum, rev) => sum + rev.rating, 0) /
            item.review.length
        : 0;
    const totalSale = ((_b = item.orderItem) === null || _b === void 0 ? void 0 : _b.length) > 0
        ? item.orderItem.reduce((sum, order) => sum + order.quantity, 0)
        : 0;
    return Object.assign(Object.assign({}, item), { avgRating: parseFloat(String(avgRating)).toFixed(1), totalSale });
}
exports.default = calculateAvgRatingAndTotalSale;
