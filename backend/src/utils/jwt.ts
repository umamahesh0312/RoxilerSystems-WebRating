import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import { config } from '@config/env';
import { IJwtPayload, UserRole } from '../types';

export class JwtUtils {
  static generateToken(
    userId: string,
    email: string,
    role: UserRole
  ): string {
    const payload = {
      id: userId,
      email,
      role,
    };

    const secret: Secret = config.jwt.secret;

    const options: SignOptions = {
      expiresIn: '7d',
    };

    return jwt.sign(payload, secret, options);
  }

  static verifyToken(token: string): IJwtPayload {
    try {
      return jwt.verify(
        token,
        config.jwt.secret as Secret
      ) as IJwtPayload;
    } catch {
      throw new Error('Invalid or expired token');
    }
  }

  static decodeToken(token: string): IJwtPayload | null {
    try {
      return jwt.decode(token) as IJwtPayload;
    } catch {
      return null;
    }
  }
}