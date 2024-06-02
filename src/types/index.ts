import { IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @ApiProperty()
  @IsNumber()
  @Min(1)
  page: number = 1;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  per_page: number = 10;
}