import { Questions as PrismaQuestions } from '@prisma/client';

export class Question implements PrismaQuestions {
  id: number;
  title: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
}
