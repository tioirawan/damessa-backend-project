import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from './config/config';
import { errorHandler } from './middlewares/errorHandler.middleware';
import ApiError from './utils/ApiError';

import categoryRoutes from './modules/categories/routes';
import productRoutes from './modules/products/routes';
import userRoutes from './modules/users/routes';

const app: Application = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// HTTP request logger
if (config.env === 'development') {
  app.use(morgan('dev'));
}

// Health check route
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to the Damessa API!',
  });
});

// API Routes
app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/products', productRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
  next(new ApiError(404, 'Not Found'));
});

app.use(errorHandler);

export default app;
