import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  UUIDV4,
} from 'sequelize';
import sequelize from '../index';

class Product extends Model<
  InferAttributes<Product>,
  InferCreationAttributes<Product>
> {
  declare id: CreationOptional<string>;
  declare name: string;
  declare price: number;
  declare stock: CreationOptional<number>;
  declare categoryId: string;

  declare created_at: CreationOptional<Date>;
  declare created_by: string;
  declare modified_at: CreationOptional<Date>;
  declare modified_by: CreationOptional<string | null>;
  declare deleted_at: CreationOptional<Date | null>;
  declare deleted_by: CreationOptional<string | null>;
}

Product.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      get() {
        const value = this.getDataValue('price');
        return value === null ? null : parseFloat(value as unknown as string);
      },
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    categoryId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    created_by: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    modified_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    modified_by: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    deleted_by: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Product',
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'modified_at',
    deletedAt: 'deleted_at',
  },
);

export default Product;
