import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  @Inject()
  private readonly prisma: PrismaService;

  @Inject()
  private readonly jwt: JwtService;

  async signin(params: Prisma.UserCreateInput) {
    const user = await this.prisma.user.findUnique({
      where: { email: params.email },
    });
    if (!user) throw new NotFoundException('User not found');
    const passwordMatch = await bcrypt.compare(params.password, user.password);
    if (!passwordMatch) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user.id };
    return {
      access_token: await this.jwt.signAsync(payload),
    };
  }
}
