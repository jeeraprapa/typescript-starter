import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create(createUserDto);

    return this.userRepository.save(newUser);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOne({
      where: { id },
      relations: ['educations'], // Load related educations
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { name, last_name, age , email, password } = updateUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.userRepository.update(
      { id: id },
      {
        name,
        last_name,
        age,
        email,
        password: hashedPassword
      },
    );
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }

  findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }
}
