import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModule: SoftDeleteModel<UserDocument>,
  ) {}

  getHashPassword = (password: string) => {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
  };

  async create(createUserDto: CreateUserDto) {
    let user = await this.userModule.create({
      email: createUserDto.email,
      password: this.getHashPassword(createUserDto.password),
      name: createUserDto.name,
    });
    return user;
  }

  findAll() {
    return this.userModule.find();
  }

  findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return 'Not found user';
    }
    return this.userModule.findOne({
      _id: id,
    });
  }

  findOneByUsername(username: string) {
    return this.userModule.findOne({
      email: username,
    });
  }

  isValidPassword(password: string, hash: string) {
    return compareSync(password, hash);
  }

  async update(updateUserDto: UpdateUserDto) {
    return await this.userModule.updateOne(
      { _id: updateUserDto._id },
      { ...updateUserDto },
    );
  }

  remove(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return 'Not found user';
    }
    return this.userModule.softDelete({
      _id: id,
    });
  }
}
