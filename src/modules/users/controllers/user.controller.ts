import { Request, Response } from 'express';
import { asyncHandler } from '../../../utils/asyncHandler';
import * as userService from '../services/user.service';

export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await userService.register(req.body);
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: user,
    });
  },
);

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { user, token } = await userService.login(req.body);
  res.status(200).json({
    success: true,
    message: 'Login successful',
    data: { user, token },
  });
});
