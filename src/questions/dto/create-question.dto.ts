/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Length } from 'class-validator';

export class CreateQuestionDto {
  @Length(3)
  title: string;

  @Length(3)
  body: string;
}
