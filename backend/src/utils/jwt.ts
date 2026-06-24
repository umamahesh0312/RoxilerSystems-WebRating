import jwt from 'jsonwebtoken';
import { config } from '@config/env';
import { IJwtPayload, UserRole } from '@types/index';

export class JwtUtils {
  static generateToken(userId: string, email: string, role: UserRole): string {
    const payload: IJwtPayload = {
      id: userId,
      email,
      role,
    };

    return jwt.sign(payload, config.jwt.secret, {
      expiresIn: config.jwt.expiration,
    });
  }

  static verifyToken(token: string): IJwtPayload {
    try {
      const decoded = jwt.verify(token, config.jwt.secret) as IJwtPayload;
      return decoded;
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }

  static decodeToken(token: string): IJwtPayload | null {
    try {
      const decoded = jwt.decode(token) as IJwtPayload;
      return decoded;
    } catch (error) {
      return null;
    }
  }
}
