import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export enum EProviders {
  LOCAL = 'local',
  GOOGLE = 'google',
  GITHUB = 'github',
}

@Schema()
export class User {
  @ApiProperty({ type: String })
  _id: ObjectId;

  @ApiProperty({ type: String })
  @Prop({ required: true })
  email: string;

  @ApiProperty({ type: String })
  @Prop()
  password: string;

  @ApiProperty({ type: Boolean })
  @Prop()
  verified: boolean;

  @ApiProperty({ type: String, enum: EProviders })
  @Prop({ enum: EProviders })
  provider: EProviders;
}

export type UserDocument = HydratedDocument<User>;

export const UserSchema = SchemaFactory.createForClass(User);
