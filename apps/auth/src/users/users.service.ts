import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcryptjs';
import { getuserDto } from './dto/get-user.dto';
@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
  async create(createUserDto: CreateUserDto) {
    //user email validation
    await this.validateUser(createUserDto);
    return this.usersRepository.create({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 12),
    });
  }
  async validateUser(createUserDto: CreateUserDto) {
    try {
      await this.usersRepository.findone({ email: createUserDto.email });
    } catch (err) {
      return;
    }
    throw new UnprocessableEntityException('email already exist!!s');
  }
  async verifyUser(email: string, password: string) {
    const user = await this.usersRepository.findone({ email });
    const correctPass = await bcrypt.compare(password, user.password);
    if (!correctPass) {
      throw new UnauthorizedException('Invalid user Credentials');
    }
    return user;
  }

  async getUser(getuserDto: getuserDto) {
    return this.usersRepository.findone(getuserDto);
  }
}
