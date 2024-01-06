import { Injectable } from '@nestjs/common';
import { CreateInstituteDto } from './dto/create-institute.dto';
import { UpdateInstituteDto } from './dto/update-institute.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDto } from 'src/prisma/dto/pagination.dto';

@Injectable()
export class InstituteService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createInstituteDto: CreateInstituteDto) {
    let newCode = await this.createNewCode(await this.getLastInstituteCode());
    return this.prismaService.institute.create({
      data: {
        code: newCode,
        name: createInstituteDto.name,
        mobile: createInstituteDto.mobile,
        email: createInstituteDto.email,
        address: createInstituteDto.address,
        image: createInstituteDto.image,
      },
    });
  }

  async findAll(paginationDto: PaginationDto) {
    const { skip, pageSize } = paginationDto;
    const allInstitutes = await this.prismaService.institute.findMany({
      skip: skip,
      take: pageSize,
    });
    return allInstitutes;
  }

  async findOne(id: number) {
    const institute = await this.prismaService.institute.findUnique({
      where: {
        id: id,
      },
    });

    return institute;
  }

  async update(id: number, updateInstituteDto: UpdateInstituteDto) {
    const updatedInstitute = await this.prismaService.institute.update({
      where: {
        id: id,
      },
      data: {
        ...updateInstituteDto,
      },
    });

    return updatedInstitute;
  }

  async remove(id: number) {
    const deletedInstitute = await this.prismaService.institute.delete({
      where: {
        id: id,
      },
    });

    return deletedInstitute;
  }

  async getLastInstituteCode() {
    const lastInstitute = await this.prismaService.institute.findFirst({
      orderBy: {
        createdAt: 'desc', // You can also use 'id' if it suits your needs
      },
      select: {
        code: true,
      },
    });

    return lastInstitute?.code || null;
  }

  private createNewCode(lastInstituteCode?): string {
    let codePrefix = 'AIYO';
    let newCode = codePrefix + '001'; // Default value if no previous entry exists
    if (lastInstituteCode) {
      const lastCodeNumericPart = parseInt(
        lastInstituteCode.match(/\d+$/)?.[0] || '0',
        10,
      );
      const newCodeNumericPart = lastCodeNumericPart + 1;
      newCode = `${codePrefix}${newCodeNumericPart
        .toString()
        .padStart(3, '0')}`;
    }
    return newCode;
  }
}
