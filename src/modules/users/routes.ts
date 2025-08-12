import { Router } from 'express';
import { validate } from '../../middlewares/validate.middleware';
import * as userController from './controllers/user.controller';
import { loginSchema, registerSchema } from './validators/user.validator';

const router = Router();

router.post('/register', validate(registerSchema), userController.registerUser);
router.post('/login', validate(loginSchema), userController.loginUser);

export default router;
