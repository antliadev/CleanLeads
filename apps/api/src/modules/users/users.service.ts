import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.passwordHash, 10);
    return this.prisma.user.create({
      data: {
        ...data,
        passwordHash: hashedPassword,
      },
    });
  }

  async updateSettings(userId: string, data: { sendgridApiKey?: string; linkedinConnected?: boolean; linkedinAccessToken?: string }): Promise<User> {
    return this.prisma.user.update({
      where: { id: userId },
      data,
    });
  }
}
