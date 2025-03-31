/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsAlphanumeric, Length } from 'class-validator';

export class CreateAnswerDto {
  @Length(3)
  @IsAlphanumeric()
  body: string;
}
