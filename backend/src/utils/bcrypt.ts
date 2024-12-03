import bcrypt from 'bcryptjs';
import AppError from '../app/errors/app_error';
import config from '../app/config';

async function hashPassword(plainPassword: string): Promise<string> {
    try {
        const hash = await bcrypt.hash(plainPassword, Number(config.bcrypt_salt_round));
        return hash;

    } catch (error) {
        throw new AppError(400, 'Failed to hash password!');
    }
};

async function comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {

    try {
        const result = await bcrypt.compare(plainPassword, hashedPassword);
        return result;

    } catch (error) {
        throw new AppError(400, 'Failed to comparing password!');
    }
}

export const bcryptOperation = {
    hashPassword,
    comparePassword
};
