import { z } from 'zod';

export const createProductSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: 'Product name is required' })
      .min(3, 'Product name must be at least 3 characters long'),
    price: z
      .number({ required_error: 'Price is required' })
      .positive('Price must be a positive number'),
    stock: z.number().int().nonnegative('Stock cannot be negative').optional(),
    categoryId: z.string().uuid('Invalid category ID format'),
  }),
});

export const updateProductSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(3, 'Product name must be at least 3 characters long')
      .optional(),
    price: z.number().positive('Price must be a positive number').optional(),
    stock: z.number().int().nonnegative('Stock cannot be negative').optional(),
    categoryId: z.string().uuid('Invalid category ID format').optional(),
  }),
  params: z.object({
    id: z.string().uuid('Invalid product ID format'),
  }),
});

export const listProductsSchema = z.object({
  query: z.object({
    category: z.string().optional(),
    page: z
      .string()
      .optional()
      .transform((val) => (val ? parseInt(val, 10) : 1))
      .refine((val) => val > 0, { message: 'Page must be a positive number' }),
    limit: z
      .string()
      .optional()
      .transform((val) => (val ? parseInt(val, 10) : 10))
      .refine((val) => val > 0, { message: 'Limit must be a positive number' }),
  }),
});

export const productIdParamSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid product ID format'),
  }),
});
