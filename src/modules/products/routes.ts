import { Router } from 'express';
import { authenticate } from '../../middlewares/auth.middleware';
import { validate } from '../../middlewares/validate.middleware';
import * as productController from './controllers/product.controller';
import {
  createProductSchema,
  listProductsSchema,
  productIdParamSchema,
  updateProductSchema,
} from './validators/product.validator';

const router = Router();

router.use(authenticate);

router
  .route('/')
  .post(validate(createProductSchema), productController.createProduct)
  .get(validate(listProductsSchema), productController.getAllProducts);

router
  .route('/:id')
  .get(validate(productIdParamSchema), productController.getProductById)
  .put(validate(updateProductSchema), productController.updateProduct)
  .delete(validate(productIdParamSchema), productController.deleteProduct);

export default router;
