import Category from './category';
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

export { Category, User };
