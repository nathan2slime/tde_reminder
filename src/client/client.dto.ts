import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ShowClientDto {
  @IsUUID()
  @ApiProperty()
  id: string;
}

export class UpdateClientDto {
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
  cpf: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  address: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  phone: string;

  @ApiProperty()
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  date_birth: Date;

  @ApiProperty()
  @IsEmail()
  @IsOptional()
  email: string;
}

export class CreateClientDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  surname: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(11)
  cpf: string;

  @ApiProperty()
  @IsNotEmpty()
  address: string;

  @ApiProperty()
  @IsNotEmpty()
  phone: string;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  date_birth: Date;

  @ApiProperty()
  @IsEmail()
  email: string;
}
