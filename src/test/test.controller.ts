import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Test } from './entities/test.entity';

@Controller('test')
export class TestController {
  constructor(
    @InjectRepository(Test)
    private testRepository: Repository<Test>,
  ) {}

  @Get()
  getTest() {
    return this.testRepository.find();
  }
}
