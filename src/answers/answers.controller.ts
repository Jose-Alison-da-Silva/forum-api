import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { AnswersService } from './answers.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserId } from 'src/questions/questions.service';

@Controller('answers')
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @Post(':questionId')
  @UseGuards(AuthGuard)
  create(
    @Body(new ValidationPipe()) createAnswerDto: CreateAnswerDto,
    @Request() req: Request & { sub: UserId },
    @Param('questionId', ParseIntPipe) questionId: number,
  ) {
    return this.answersService.create(createAnswerDto, req.sub, questionId);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.answersService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.answersService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) updateAnswerDto: UpdateAnswerDto,
  ) {
    return this.answersService.update(id, updateAnswerDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.answersService.remove(id);
  }
}
