import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateDoctorScheduleDto {
  @ApiProperty()
  @IsDate()
  start: Date;

  @ApiProperty()
  @IsDate()
  end: Date;
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
