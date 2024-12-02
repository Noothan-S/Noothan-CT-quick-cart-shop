import bcrypt from 'bcryptjs';
import AppError from '../app/errors/app_error';

async function hashedPassword(plainPassword: string): Promise<string> {
    try {
        const hash = await bcrypt.hash(plainPassword, 8);
        return hash;

    } catch (error) {
        throw new AppError(400, 'Failed to hash password!');
    }
}

export const bcryptOperation = {
    hashedPassword
};
