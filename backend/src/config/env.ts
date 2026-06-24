import dotenv from 'dotenv';

dotenv.config();

export const config = {
  database: {
    url: process.env.DATABASE_URL || 'mysql://user:password@localhost:3306/roxsys',
  },
  server: {
    port: parseInt(process.env.PORT || '3001', 10),
    nodeEnv: process.env.NODE_ENV || 'development',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your_jwt_secret_key_change_this_in_production',
    expiration: process.env.JWT_EXPIRATION || '7d',
  },
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  },
  logging: {
    level: process.env.LOG_LEVEL || 'debug',
  },
};
