import { CreationAttributes } from 'sequelize';
import { User } from '../../../database/models';


/**
 * Finds a user by their email address.
 * @param {string} email - The email of the user to find.
 * @returns {Promise<User | null>} The user instance or null if not found.
 */
export const findByEmail = async (email: string): Promise<User | null> => {
  return await User.findOne({ where: { email } });
};

/**
 * Creates a new user in the database.
 * @param {object} userData - The data for the new user.
 * @returns {Promise<User>} The newly created user instance.
 */
export const createUser = async (
  userData: CreationAttributes<User>,
): Promise<User> => {
  return await User.create(userData);
};

/**
 * Updates a user's token.
 * @param {string} userId - The ID of the user to update.
 * @param {string} token - The new token.
 * @returns {Promise<void>}
 */
export const updateUserToken = async (
  userId: string,
  token: string,
): Promise<void> => {
  await User.update({ token }, { where: { id: userId } });
};
