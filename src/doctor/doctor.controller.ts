import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { CreateDoctorDto } from '~/doctor/doctor.dto';
import { logger } from '~/logger';
import { DoctorService } from '~/doctor/doctor.service';

@Controller('doctor')
@ApiTags('Doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {
  }
  @Post('create')
  async create(@Res() res: Response, @Body() payload: CreateDoctorDto) {
    try {
      return this.doctorService.create(payload);
    } catch (error) {
      logger.error(error);
      return res.status(HttpStatus.BAD_REQUEST).json(error.message);
    }
  }
}
