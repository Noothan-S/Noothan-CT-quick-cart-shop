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
// Higher-order function to wrap asynchronous route handlers with error handling
const catchAsync = (fn) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield fn(req, res, next); // Execute the provided handler function
        }
        catch (err) {
            next(err); // Pass any caught error to the next middleware (typically an error handler)
        }
    });
};
exports.default = catchAsync;
