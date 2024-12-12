"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Function to filter out null values and sensitive fields (e.g., password) from a User object
function filteredUser(user) {
    // Creating a new object with only non-null fields and excluding the 'password' field
    const result = Object.fromEntries(Object.entries(user).filter(([key, value]) => value !== null && key !== 'password'));
    return result; // Returning the filtered user object
}
exports.default = filteredUser;
