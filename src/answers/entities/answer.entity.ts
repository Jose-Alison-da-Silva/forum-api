import { Answers as PrismaAnswers } from '@prisma/client';

export class Answer implements PrismaAnswers {
  id: number;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  questionId: number;
  userId: number;
}
