import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query
} from '@nestjs/common';
import { PaginationDto } from 'src/prisma/dto/pagination.dto';
import { CreateInstituteDto } from './dto/create-institute.dto';
import { UpdateInstituteDto } from './dto/update-institute.dto';
import { InstituteService } from './institute.service';

@Controller('institute')
export class InstituteController {
  constructor(private instituteService: InstituteService) {}

  @Post()
  async create(@Body() createInstituteDto: CreateInstituteDto) {
    try {
      return await this.instituteService.create(createInstituteDto);
    } catch(e) {
      return e
    }
  }

  @Get()
  async findAll(@Query() paginationDto: PaginationDto) {
    console.log('Received DTO:', paginationDto);
    return await this.instituteService.findAll(paginationDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.instituteService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateInstituteDto: UpdateInstituteDto,
  ) {
    return await this.instituteService.update(+id, updateInstituteDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.instituteService.remove(+id);
  // }
}
