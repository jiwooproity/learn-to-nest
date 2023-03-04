import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  breed: string;

  @Column({ default: true })
  isActive: boolean;
}

export class CreateUserDto {
  @IsString()
  name: string;

  @IsNumber()
  age: number;

  @IsString()
  breed: string;

  @IsBoolean()
  isActive: boolean;
}

export class SearchUserDto {
  @IsString()
  name?: string;

  @IsNumber()
  age?: number;
}
