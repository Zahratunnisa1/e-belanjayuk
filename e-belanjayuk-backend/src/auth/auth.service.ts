import { Injectable, ConflictException  } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService,
  private jwtService: JwtService,
) {}

  async register(data: RegisterDto) {
    const hashedPassword = await bcrypt.hash(
      data.password,
      10,
    );

    const existingUser = await this.prisma.user.findUnique({
  where: {
    email: data.email,
  },
});

if (existingUser) {
  throw new ConflictException('Email sudah terdaftar');
}

    return this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
    });

  }
    async login(data: LoginDto) {
  const user = await this.prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!user) {
    throw new ConflictException('Email atau password salah');
  }

  const isPasswordValid = await bcrypt.compare(
    data.password,
    user.password,
  );

  if (!isPasswordValid) {
    throw new ConflictException('Email atau password salah');
  }


const payload = {
  sub: user.id,
  email: user.email,
};

const accessToken = await this.jwtService.signAsync(
  payload,
);

return {
  access_token: accessToken,
};
}
}
