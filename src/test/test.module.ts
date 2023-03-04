import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test } from './entities/test.entity';
import { TestController } from './test.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Test])],
  exports: [TypeOrmModule],
  controllers: [TestController],
  providers: [TestService],
})
export class TestModule {}
