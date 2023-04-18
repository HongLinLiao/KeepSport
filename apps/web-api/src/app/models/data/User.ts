import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { MongoSchema } from './MongoSchema';
import { SignInType } from '@model';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User extends MongoSchema {
  @Prop()
  name: string;

  @Prop()
  avatar?: string;

  @Prop({ type: String, enum: SignInType, default: SignInType.LINE })
  signInType: SignInType;

  @Prop()
  thirdPartyUid: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
