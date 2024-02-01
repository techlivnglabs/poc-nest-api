import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string): Promise<{ token: string }> {
    const user = await this.usersService.findOne(email);

    if (!user) {
      throw new NotFoundException('User does not exist in database.');
    }

    const isSamePassword = await bcrypt.compare(password, user.password);

    if (!isSamePassword) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.userId, email: user.email };
    const token = await this.jwtService.signAsync(payload, {
      secret: process.env.AUTH_SECRET,
    });

    return {
      token,
    };
  }

  async register(email: string, password: string) {
    const user = await this.usersService.findOne(email);

    if (user) {
      throw new BadRequestException('User already exist in database');
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const savedUser = await this.usersService.create(email, hashPassword);

    const payload = { sub: savedUser.userId, email };

    const token = await this.jwtService.signAsync(payload, {
      secret: process.env.AUTH_SECRET,
    });

    return { token };
  }
}
