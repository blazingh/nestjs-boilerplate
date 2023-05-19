import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { EProviders, User, UserSchema } from './schema/user.schema';
import UpdateUserDto from './dto/updateUser.dto';
import CreateUserDto from './dto/createUser.dto';

@Injectable()
export default class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) { }

  async create(user: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    const newUser = new this.userModel({
      password: hashedPassword,
      email: user.email,
      verified: false,
    });

    return newUser.save();
  }

  getByEmail(email: string, verified = true): Promise<User> {
    return this.userModel.findOne({
      email,
      verified,
    });
  }

  getByEmailAndProvider(email: string, provider: EProviders): Promise<User> {
    return this.userModel.findOne({
      email,
      provider,
    });
  }

  getById(id: ObjectId, verified = true): Promise<User> {
    return this.userModel.findOne({
      _id: id,
      verified,
    });
  }

  update(id: ObjectId, data: UpdateUserDto): Promise<User> {
    return this.userModel.findOneAndUpdate({ _id: id }, data);
  }

  getAll(verified: boolean = true): Promise<User[] | []> {
    return this.userModel.find({
      where: {
        verified,
      },
    });
  }
}
