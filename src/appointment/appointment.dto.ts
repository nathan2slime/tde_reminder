import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationDto } from '~/types';

export class CreateAppointmentDto {
  @IsUUID()
  @ApiProperty()
  doctor: string;
  @IsUUID()
  @ApiProperty()
  schedule: string;

  @IsUUID()
  @ApiProperty()
  user: string;

  @IsNotEmpty()
  @ApiProperty()
  description: string;
}

export class FilterAppointmentDto {
  @ApiProperty({ type: PaginationDto})
  pagination: PaginationDto

  @IsUUID()
  @ApiProperty()
  @IsOptional()
  doctor: string;
}
