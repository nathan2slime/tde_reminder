import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { CreateDoctorDto, UpdateDoctorDto } from '~/doctor/doctor.dto';
import { PaginationDto } from '~/types';
import { logger } from '~/logger';
import { DoctorService } from '~/doctor/doctor.service';

@Controller('doctor')
@ApiTags('Doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post('create')
  async create(@Res() res: Response, @Body() payload: CreateDoctorDto) {
    try {
      const data = await this.doctorService.create(payload);

      return res.status(HttpStatus.CREATED).json(data);
    } catch (error) {
      logger.error(error);
      return res.status(HttpStatus.BAD_REQUEST).json(error.message);
    }
  }

  @Post('paginate')
  async paginate(@Res() res: Response, @Body() payload: PaginationDto) {
    try {
      const data = await this.doctorService.paginate(payload);

      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      logger.error(error);
      return res.status(HttpStatus.BAD_REQUEST).json(error.message);
    }
  }

  @Delete('remove/:id')
  @ApiParam({ type: 'string', name: 'id' })
  async remove(@Res() res: Response, @Param('id') id: string) {
    try {
      await this.doctorService.remove(id);

      return res.status(HttpStatus.OK).send();
    } catch (error) {
      logger.error(error);
      return res.status(HttpStatus.BAD_REQUEST).json(error.message);
    }
  }

  @Post('update/:id')
  @ApiParam({ type: 'string', name: 'id' })
  async update(
    @Res() res: Response,
    @Body() payload: UpdateDoctorDto,
    @Param('id') id: string,
  ) {
    try {
      const data = await this.doctorService.update(payload, id);

      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      logger.error(error);
      return res.status(HttpStatus.BAD_REQUEST).json(error.message);
    }
  }

  @Get('schedule/:id')
  async schedule(@Res() res: Response, @Param('id') id: string) {
    try {
      const data = await this.doctorService.schedule({ id });

      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      logger.error(error);
      return res.status(HttpStatus.BAD_REQUEST).json(error.message);
    }
  }

  @Get('show/:id')
  async show(@Res() res: Response, @Param('id') id: string) {
    try {
      const data = await this.doctorService.show({ id });

      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      logger.error(error);
      return res.status(HttpStatus.BAD_REQUEST).json(error.message);
    }
  }
}
