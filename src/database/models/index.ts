import Category from './category';
import Product from './product';
import User from './user';

// user created the category
User.hasMany(Category, {
  foreignKey: 'created_by',
  as: 'createdCategories',
});
Category.belongsTo(User, {
  foreignKey: 'created_by',
  as: 'creator',
});

// user last modified the category
User.hasMany(Category, {
  foreignKey: 'modified_by',
  as: 'modifiedCategories',
});
Category.belongsTo(User, {
  foreignKey: 'modified_by',
  as: 'modifier',
});

// user soft-deleted the category
User.hasMany(Category, {
  foreignKey: 'deleted_by',
  as: 'deletedCategories',
});
Category.belongsTo(User, {
  foreignKey: 'deleted_by',
  as: 'deleter',
});

// product belongs to one Category
Category.hasMany(Product, { foreignKey: 'categoryId' });
Product.belongsTo(Category, {
  foreignKey: 'categoryId',
  as: 'category', // We'll use this alias to eager-load
});

// product is created by one User
User.hasMany(Product, { foreignKey: 'created_by' });
Product.belongsTo(User, {
  foreignKey: 'created_by',
  as: 'creator',
});

// product is modified by one User
User.hasMany(Product, { foreignKey: 'modified_by' });
Product.belongsTo(User, {
  foreignKey: 'modified_by',
  as: 'modifier',
});

// product is deleted by one User
User.hasMany(Product, { foreignKey: 'deleted_by' });
Product.belongsTo(User, {
  foreignKey: 'deleted_by',
  as: 'deleter',
});

export { Category, Product, User };
