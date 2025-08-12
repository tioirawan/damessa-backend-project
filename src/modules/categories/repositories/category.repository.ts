import { CreationAttributes } from 'sequelize';
import { Category, User } from '../../../database/models';

export const create = async (
  categoryData: CreationAttributes<Category>,
): Promise<Category> => {
  return Category.create(categoryData);
};

export const findAll = async (): Promise<Category[]> => {
  return Category.findAll({
    include: [
      {
        model: User,
        as: 'creator',
        attributes: ['id', 'name'],
      },
    ],
    order: [['name', 'ASC']],
  });
};

export const findById = async (id: string): Promise<Category | null> => {
  return Category.findByPk(id, {
    include: [
      { model: User, as: 'creator', attributes: ['id', 'name'] },
      { model: User, as: 'modifier', attributes: ['id', 'name'] },
    ],
  });
};

export const findByName = async (name: string): Promise<Category | null> => {
  return Category.findOne({ where: { name } });
};

export const update = async (
  id: string,
  updateData: Partial<Category>,
): Promise<[number, Category[]]> => {
  return Category.update(updateData, {
    where: { id },
    returning: true,
  });
};

export const softDelete = async (
  id: string,
  deleted_by: string,
): Promise<number> => {
  await Category.update({ deleted_by }, { where: { id } });
  return Category.destroy({ where: { id } });
};
