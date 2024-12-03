
import { UserRole } from '@prisma/client';
import jwt, { Secret } from 'jsonwebtoken';
import config from '../app/config';

interface ITokenPayload {
    id: string;
    email: string;
    role: UserRole
}

function generateToken(payload: ITokenPayload) {
    const result = jwt.sign(payload, config.jwt_secret as Secret, { expiresIn: '1h' });
    return result
};

export const jwtOperation = {
    generateToken
}