import dotenv from 'dotenv';
import path from 'path';

const envPath = path.resolve(
  process.cwd(),
  process.env.NODE_ENV === 'production' ? '.env.production' : '.env',
);

dotenv.config({ path: envPath });

export const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME || 'damessa_db',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'supersecret',
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  },
};
