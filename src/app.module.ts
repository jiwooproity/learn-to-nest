import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MoviesModule } from './movies/movies.module';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MySqlConfigService } from './config/database/config.service';
import { MysqlConfigModule } from './config/database/config.module';
import { UserModule } from './user/user.module';
import { TestModule } from './test/test.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [MysqlConfigModule],
      useClass: MySqlConfigService,
      inject: [MySqlConfigService],
    }),
    MoviesModule,
    UserModule,
    TestModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
