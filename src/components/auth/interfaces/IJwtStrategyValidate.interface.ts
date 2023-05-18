import { ObjectId } from 'mongoose';

export interface IJwtStrategyValidate {
  id: ObjectId;
  email: string;
}
