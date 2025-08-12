import { Request, Response } from 'express';
import { asyncHandler } from '../../../utils/asyncHandler';
import * as categoryService from '../services/category.service';

export const createCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const { name } = req.body;
    const category = await categoryService.createCategory(name, req.user!.id);
    res.status(201).json({ success: true, data: category });
  },
);

export const getAllCategories = asyncHandler(
  async (req: Request, res: Response) => {
    const categories = await categoryService.getAllCategories();
    res.status(200).json({ success: true, data: categories });
  },
);

export const getCategoryById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const category = await categoryService.getCategoryById(id);
    res.status(200).json({ success: true, data: category });
  },
);

export const updateCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;
    const updatedCategory = await categoryService.updateCategory(
      id,
      name,
      req.user!.id,
    );
    res.status(200).json({ success: true, data: updatedCategory });
  },
);

export const deleteCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    await categoryService.deleteCategory(id, req.user!.id);
    res.status(204).send();
  },
);
