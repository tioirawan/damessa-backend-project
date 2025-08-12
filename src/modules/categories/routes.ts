import { Router } from 'express';
import { authenticate } from '../../middlewares/auth.middleware';
import { validate } from '../../middlewares/validate.middleware';
import * as categoryController from './controllers/category.controller';
import {
  categoryIdParamSchema,
  createCategorySchema,
  updateCategorySchema,
} from './validators/category.validator';

const router = Router();

router.use(authenticate);

router
  .route('/')
  .post(validate(createCategorySchema), categoryController.createCategory)
  .get(categoryController.getAllCategories);

router
  .route('/:id')
  .get(validate(categoryIdParamSchema), categoryController.getCategoryById)
  .put(validate(updateCategorySchema), categoryController.updateCategory)
  .delete(validate(categoryIdParamSchema), categoryController.deleteCategory);

export default router;
