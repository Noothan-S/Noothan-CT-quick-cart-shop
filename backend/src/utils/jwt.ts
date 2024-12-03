
import { UserRole } from '@prisma/client';
import jwt, { Secret } from 'jsonwebtoken';
import config from '../app/config';

interface ITokenPayload {
    id: string;
    email: string;
    role: UserRole
}

function generateToken(payload: ITokenPayload, expiresIn: string = '7d') {
    const result = jwt.sign(payload, config.jwt_secret as Secret, { expiresIn });
    return result
};

export const jwtOperation = {
    generateToken
}