import { ObjectId } from 'mongoose';

export interface IAuthValidateUserOutput {
  id: ObjectId;
  email?: string;
}
