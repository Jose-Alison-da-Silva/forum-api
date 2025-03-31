/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  Length,
  IsAlphanumeric,
} from 'class-validator';
export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(3)
  name: string;

  @IsAlphanumeric()
  @IsNotEmpty()
  @Length(6)
  password: string;
}
