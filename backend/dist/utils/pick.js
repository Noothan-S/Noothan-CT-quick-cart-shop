"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pick = (obj, keys) => {
    const finalObj = {}; // Initializing an empty object to store selected key-value pairs
    for (const key of keys) {
        // Check if the object contains the key and is not undefined or null
        if (obj && Object.hasOwnProperty.call(obj, key)) {
            finalObj[key] = obj[key]; // Assign the value of the selected key to the result object
        }
    }
    console.log(finalObj); // Logging the final object for debugging
    return finalObj; // Returning the object with only the selected key-value pairs
};
exports.default = pick;
