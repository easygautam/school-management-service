import { Exclude } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class PaginationDto {
  @IsNumber()
  @IsPositive()
  page?: number = 1;

  @IsNumber()
  @IsPositive()
  pageSize?: number = 10;

  @Exclude()
  get skip(): number {
    return (this.page - 1) * this.pageSize;
  }
}
