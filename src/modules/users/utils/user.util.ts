/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from '../../../database/models';

// for sanitation purposes
export const toPublicUser = (user: User) => {
  const userJson = user.toJSON();

  const {
    password: _password,
    token: _token,
    deleted_at: _deleted_at,
    deleted_by: _deleted_by,
    ...publicUserDetails
  } = userJson;

  return publicUserDetails;
};
