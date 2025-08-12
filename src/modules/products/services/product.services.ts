import { FindOptions, Op } from 'sequelize';
import { Category, Product, User } from '../../../database/models';
import ApiError from '../../../utils/ApiError';
import * as categoryRepository from '../../categories/repositories/category.repository';
import * as productRepository from '../repositories/product.repository';

interface ListProductsQuery {
  category?: string;
  page: number;
  limit: number;
}

export const createProduct = async (
  productData: {
    name: string;
    price: number;
    stock?: number;
    categoryId: string;
  },
  created_by: string,
) => {
  const category = await categoryRepository.findById(productData.categoryId!);

  if (!category) {
    throw new ApiError(404, 'Category not found');
  }

  return productRepository.create({ ...productData, created_by });
};

export const getAllProducts = async (query: ListProductsQuery) => {
  const { category, page, limit } = query;
  const offset = (page - 1) * limit;

  const options: FindOptions = {
    limit,
    offset,
    include: [
      {
        model: Category,
        as: 'category',
        attributes: ['id', 'name'],
        where: category ? { name: { [Op.like]: `%${category}%` } } : undefined,
      },
      {
        model: User,
        as: 'creator',
        attributes: ['id', 'name'],
      },
    ],
    order: [['created_at', 'DESC']],
    where: {},
  };

  const { rows, count } = await productRepository.findAllAndCount(options);

  return {
    data: rows,
    pagination: {
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      itemsPerPage: limit,
    },
  };
};

export const getProductById = async (id: string) => {
  const product = await productRepository.findById(id);
  if (!product) {
    throw new ApiError(404, 'Product not found');
  }
  return product;
};

export const updateProduct = async (
  id: string,
  updateData: Partial<Product>,
  modified_by: string,
) => {
  const productToUpdate = await productRepository.findById(id);
  if (!productToUpdate) {
    throw new ApiError(404, 'Product not found');
  }

  if (updateData.categoryId) {
    const category = await categoryRepository.findById(updateData.categoryId);
    if (!category) {
      throw new ApiError(404, 'New category not found');
    }
  }

  await productRepository.update(id, { ...updateData, modified_by });
  return getProductById(id);
};

export const deleteProduct = async (id: string, deleted_by: string) => {
  const productToDelete = await productRepository.findById(id);
  if (!productToDelete) {
    throw new ApiError(404, 'Product not found');
  }

  await productRepository.softDelete(id, deleted_by);
};
