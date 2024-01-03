import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async getUserByMobile(mobile: string): Promise<User | undefined> {
    return await this.prismaService.user.findFirst({
      where: {
        mobile: mobile,
      },
    });
  }

  async getUserById(userId: number) {
    console.log("Get user by id ", userId)
    return await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });
  }

  async createNewUser(register: RegisterDto) {
    try {
      let user = await this.prismaService.user.create({
        data: {
          firstName: register.firstName,
          lastName: register.lastName,
          mobile: register.mobile,
          password: register.password,
        },
      });
      let { password, ...result } = user;
      return result;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // Unique key constraints failed error
        if (e.code === 'P2002') {
          throw new BadRequestException('Mobile number is already registered');
        }
      }
      throw e;
    }
  }
}
