import bcrypt from 'bcryptjs';
import AppError from '../app/errors/app_error';
import config from '../app/config';

// Function to hash a plain text password
async function hashPassword(plainPassword: string): Promise<string> {
    try {
        // Hashing password using bcrypt with specified salt rounds
        const hash = await bcrypt.hash(plainPassword, Number(config.bcrypt_salt_round));
        return hash; // Returning the hashed password
    } catch (error) {
        // Throwing a custom error if hashing fails
        throw new AppError(400, 'Failed to hash password!');
    }
}

// Function to compare a plain text password with a hashed password
async function comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    try {
        // Comparing plain text password with the hashed password
        const result = await bcrypt.compare(plainPassword, hashedPassword);
        return result; // Returning true if passwords match, false otherwise
    } catch (error) {
        // Throwing a custom error if comparison fails
        throw new AppError(400, 'Failed to compare password!');
    }
}

// Exporting bcrypt operations for use in other parts of the application
export const bcryptOperation = {
    hashPassword,
    comparePassword,
};
