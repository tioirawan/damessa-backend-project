import ApiError from '../../../utils/ApiError';
import * as categoryRepository from '../repositories/category.repository';

export const createCategory = async (name: string, created_by: string) => {
  const existingCategory = await categoryRepository.findByName(name);
  if (existingCategory) {
    throw new ApiError(409, `Category with name '${name}' already exists.`);
  }

  const newCategory = await categoryRepository.create({ name, created_by });
  return newCategory;
};

export const getAllCategories = async () => {
  return categoryRepository.findAll();
};

export const getCategoryById = async (id: string) => {
  const category = await categoryRepository.findById(id);
  if (!category) {
    throw new ApiError(404, 'Category not found');
  }
  return category;
};

export const updateCategory = async (
  id: string,
  name: string,
  modified_by: string,
) => {
  const categoryToUpdate = await categoryRepository.findById(id);
  if (!categoryToUpdate) {
    throw new ApiError(404, 'Category not found');
  }

  const existingCategory = await categoryRepository.findByName(name);
  if (existingCategory && existingCategory.id !== id) {
    throw new ApiError(409, `Category with name '${name}' already exists.`);
  }

  await categoryRepository.update(id, { name, modified_by });

  return getCategoryById(id);
};

export const deleteCategory = async (id: string, deleted_by: string) => {
  const categoryToDelete = await categoryRepository.findById(id);
  if (!categoryToDelete) {
    throw new ApiError(404, 'Category not found');
  }

  await categoryRepository.softDelete(id, deleted_by);
};
