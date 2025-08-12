import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  UUIDV4,
} from 'sequelize';
import sequelize from '../index';

class Category extends Model<
  InferAttributes<Category>,
  InferCreationAttributes<Category>
> {
  declare id: CreationOptional<string>;
  declare name: string;

  declare created_at: CreationOptional<Date>;
  declare created_by: string;
  declare modified_at: CreationOptional<Date>;
  declare modified_by: CreationOptional<string | null>;
  declare deleted_at: CreationOptional<Date | null>;
  declare deleted_by: CreationOptional<string | null>;
}

Category.init(
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
      unique: true,
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
    modelName: 'Category',
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'modified_at',
    deletedAt: 'deleted_at',
  },
);

export default Category;
