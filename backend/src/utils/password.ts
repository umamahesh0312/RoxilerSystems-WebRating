import bcryptjs from 'bcryptjs';

export class PasswordUtils {
  static async hashPassword(password: string): Promise<string> {
    const salt = await bcryptjs.genSalt(10);
    return bcryptjs.hash(password, salt);
  }

  static async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcryptjs.compare(password, hashedPassword);
  }
}
