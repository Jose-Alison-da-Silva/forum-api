import { Inject, Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { PrismaService } from 'src/database/prisma.service';

export interface UserId {
  sub: number;
}

@Injectable()
export class QuestionsService {
  @Inject()
  private readonly prisma: PrismaService;

  async create(createQuestionDto: CreateQuestionDto, userId: UserId) {
    return await this.prisma.questions.create({
      data: {
        ...createQuestionDto,
        userId: userId.sub,
      },
    });
  }

  async findAll() {
    return await this.prisma.questions.findMany({
      include: {
        answers: {
          select: {
            body: true,
          },
        },
        user: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.questions.findUnique({
      where: { id },
      include: {
        answers: {
          select: {
            body: true,
          },
        },
        user: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return await this.prisma.questions.update({
      where: { id },
      data: updateQuestionDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.questions.delete({ where: { id } });
  }
}
