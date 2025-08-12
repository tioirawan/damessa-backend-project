import { User } from '../database/models';

declare global {
  namespace Express {
    export interface Request {
      user?: User;
    }
  }
}
