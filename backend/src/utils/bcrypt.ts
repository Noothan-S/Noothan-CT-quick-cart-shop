import bcrypt from 'bcryptjs';
import AppError from '../app/errors/app_error';
import config from '../app/config';

async function hashedPassword(plainPassword: string): Promise<string> {
    try {
        const hash = await bcrypt.hash(plainPassword, config.bcrypt_salt_round as string);
        return hash;

    } catch (error) {
        throw new AppError(400, 'Failed to hash password!');
    }
}

export const bcryptOperation = {
    hashedPassword
};
