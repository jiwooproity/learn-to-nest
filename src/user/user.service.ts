import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAllUser(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('해당되는 유저가 없습니다.');
    else return user;
  }

  async searchUser(name: string): Promise<User[]> {
    const user = await this.userRepository.find({ where: { name } });
    return user;
  }

  async registerUser(user: CreateUserDto) {
    const searchUser = await this.searchUser(user.name);

    if (searchUser.length > 0) {
      throw new ConflictException('이미 등록된 이름입니다.');
    } else {
      const { identifiers } = await this.userRepository.insert(user);
      const newUser = await this.findOne(identifiers[0].id);
      return newUser;
    }
  }

  async unregisterUser(id: number) {
    await this.findOne(id);
    this.userRepository.delete({ id });
  }
}
