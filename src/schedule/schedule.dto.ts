import { IsDate, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateScheduleDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsUUID()
  doctor: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  end: Date;

  @IsNotEmpty()
  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  start: Date;
}

export class UpdateScheduleDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  end: Date;

  @IsNotEmpty()
  @ApiProperty()
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  start: Date;
}
