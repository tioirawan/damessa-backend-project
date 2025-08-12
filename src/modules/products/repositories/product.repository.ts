import { CreationAttributes, FindOptions } from 'sequelize';
import { Category, Product, User } from '../../../database/models';

export const create = async (
  productData: CreationAttributes<Product>,
): Promise<Product> => {
  return Product.create(productData);
};

export const findAllAndCount = async (
  options: FindOptions,
): Promise<{ rows: Product[]; count: number }> => {
  return Product.findAndCountAll(options);
};

export const findById = async (id: string): Promise<Product | null> => {
  return Product.findByPk(id, {
    include: [
      { model: User, as: 'creator', attributes: ['id', 'name'] },
      { model: User, as: 'modifier', attributes: ['id', 'name'] },
      { model: Category, as: 'category', attributes: ['id', 'name'] },
    ],
  });
};

export const update = async (
  id: string,
  updateData: Partial<Product>,
): Promise<[number]> => {
  return Product.update(updateData, { where: { id } });
};

export const softDelete = async (
  id: string,
  deleted_by: string,
): Promise<number> => {
  await Product.update({ deleted_by }, { where: { id } });
  return Product.destroy({ where: { id } });
};
