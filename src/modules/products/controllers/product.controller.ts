import { Request, Response } from 'express';
import { asyncHandler } from '../../../utils/asyncHandler';
import * as productService from '../services/product.services';

export const createProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const product = await productService.createProduct(req.body, req.user!.id);
    res.status(201).json({ success: true, data: product });
  },
);

export const getAllProducts = asyncHandler(
  async (req: Request, res: Response) => {
    const category = req.query.category as string | undefined;
    const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
    const limit = req.query.limit
      ? parseInt(req.query.limit as string, 10)
      : 10;

    const result = await productService.getAllProducts({
      category,
      page,
      limit,
    });
    res.status(200).json({ success: true, ...result });
  },
);

export const getProductById = asyncHandler(
  async (req: Request, res: Response) => {
    const product = await productService.getProductById(req.params.id);
    res.status(200).json({ success: true, data: product });
  },
);

export const updateProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const updatedProduct = await productService.updateProduct(
      req.params.id,
      req.body,
      req.user!.id,
    );
    res.status(200).json({ success: true, data: updatedProduct });
  },
);

export const deleteProduct = asyncHandler(
  async (req: Request, res: Response) => {
    await productService.deleteProduct(req.params.id, req.user!.id);
    res.status(204).send();
  },
);
