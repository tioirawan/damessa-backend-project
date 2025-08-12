import { z } from 'zod';

export const createCategorySchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: 'Category name is required' })
      .min(3, 'Category name must be at least 3 characters long'),
  }),
});

export const updateCategorySchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: 'Category name is required' })
      .min(3, 'Category name must be at least 3 characters long'),
  }),
  params: z.object({
    id: z.string().uuid('Invalid category ID format'),
  }),
});

export const categoryIdParamSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid category ID format'),
  }),
});
