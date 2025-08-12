import jwt from 'jsonwebtoken';
import { CreationAttributes } from 'sequelize';
import { config } from '../../../config/config';
import { User } from '../../../database/models';
import ApiError from '../../../utils/ApiError';
import * as userRepository from '../repositories/user.repository';
import { toPublicUser } from '../utils/user.util';

/**
 * Generates a JWT token for a user.
 * @param {string} userId - The ID of the user.
 * @returns {string} The generated JWT.
 */
const generateToken = (userId: string): string => {
  return jwt.sign({ id: userId }, config.jwt.secret!, {
    expiresIn: config.jwt.expiresIn,
  });
};

/**
 * Registers a new user.
 * @param {object} userData - The user registration data.
 * @returns {Promise<Partial<User>>} The created user (password excluded).
 */
export const register = async (
  userData: CreationAttributes<User>,
): Promise<Partial<User>> => {
  const { email } = userData;

  const existingUser = await userRepository.findByEmail(email);
  if (existingUser) {
    throw new ApiError(409, 'User with this email already exists');
  }

  const newUser = await userRepository.createUser(userData);

  const userWithDefaults = await userRepository.findByEmail(newUser.email);
  if (!userWithDefaults) {
    throw new ApiError(500, 'Failed to retrieve user after creation');
  }

  return toPublicUser(userWithDefaults);
};

/**
 * Logs in a user.
 * @param {object} loginData - The user login data.
 * @returns {Promise<{user: Partial<User>, token: string}>} The user object and JWT.
 */
export const login = async (loginData: Pick<User, 'email' | 'password'>) => {
  const { email, password: loginPassword } = loginData;

  const user = await userRepository.findByEmail(email);
  if (!user || !(await user.comparePassword(loginPassword))) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const token = generateToken(user.id);
  await userRepository.updateUserToken(user.id, token);

  const publicUser = toPublicUser(user);

  return { user: publicUser, token };
};
