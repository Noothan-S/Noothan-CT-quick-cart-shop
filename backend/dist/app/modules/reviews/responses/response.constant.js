"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewResponseConstants = void 0;
const findReviewForResponseIncludeObj = {
    product: {
        include: {
            vendor: {
                include: {
                    user: {
                        select: {
                            id: true
                        }
                    }
                }
            }
        }
    }
};
exports.ReviewResponseConstants = {
    findReviewForResponseIncludeObj
};
