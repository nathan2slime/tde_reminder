import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateDoctorScheduleDto {
  @ApiProperty()
  @IsDate()
  start: Date;

  @ApiProperty()
  @IsDate()
  end: Date;
}

export class ShowDoctorDto {
  @IsUUID()
  @ApiProperty()
  id: string;
}

export class UpdateDoctorDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  surname: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  crm: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  specialty: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  phone: string;

  @ApiProperty()
  @IsEmail()
  @IsOptional()
  email: string;
}

export class CreateDoctorDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  surname: string;

  @ApiProperty()
  @IsNotEmpty()
  crm: string;

  @ApiProperty()
  @IsNotEmpty()
  specialty: string;

  @ApiProperty()
  @IsNotEmpty()
  phone: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty({ type: [CreateDoctorScheduleDto] })
  schedules: CreateDoctorScheduleDto[];
}
