
import bcrypt from 'bcryptjs';
import AppError from '../app/errors/app_error';

async function hashedPassword(plainPassword: string) {
    bcrypt.hash(plainPassword, 8, function (err: any, hash: string) {

        if (err) {
            return new AppError(400, 'Failed to hashing password!');
        };
        return hash
    });
}

export const bcryptOperation = {
    hashedPassword
}