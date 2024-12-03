import { UserRole } from '@prisma/client';
import jwt, { Secret } from 'jsonwebtoken';
import config from '../app/config';

interface ITokenPayload {
    id: string;           // User ID
    email: string;        // User email
    role: UserRole;       // User role from Prisma UserRole enum
}

// Function to generate a JWT with a default expiration of 7 days
function generateToken(payload: ITokenPayload, expiresIn: string = '7d') {
    const result = jwt.sign(payload, config.jwt_secret as Secret, { expiresIn }); // Signing the JWT with the provided payload, secret, and expiration
    return result; // Returning the generated token
}

export const jwtOperation = {
    generateToken // Exporting the token generation function
};
