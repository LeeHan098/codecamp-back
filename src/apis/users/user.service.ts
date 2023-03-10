import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entites/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create({ email, hashedPassword, name, age }) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user) {
      throw new ConflictException('이미 등록된 이메일');
    }

    const result = await this.userRepository.save({
      email,
      password: hashedPassword,
      name,
      age,
    });
    return result;
  }

  async findOne({ email }) {
    return await this.userRepository.findOne({ where: { email } });
  }
}
