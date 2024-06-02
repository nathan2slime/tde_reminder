import { Body, Controller, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { logger } from '~/logger';
import { CreateAppointmentDto, FilterAppointmentDto } from '~/appointment/appointment.dto';
import { AppointmentService } from '~/appointment/appointment.service';

@Controller('appointment')
@ApiTags('Appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {
  }

  @Get('show/:id')
  @ApiParam({ type: 'string', name: 'id' })
  async get(@Res() res: Response, @Param("id") id: string) {
    try {
      const data =await this.appointmentService.show(id);

      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      logger.error(error);
      return res.status(HttpStatus.BAD_REQUEST).json(error.message);
    }
  }

  @Post('paginate')
  async paginate(@Res() res: Response, @Body() payload: FilterAppointmentDto) {
    try {
      const data= await this.appointmentService.paginate(payload);

      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      logger.error(error);
      return res.status(HttpStatus.BAD_REQUEST).json(error.message);
    }

  }

  @Post('create')
  async create(@Res() res: Response, @Body() payload: CreateAppointmentDto) {
    try {
      const data= await this.appointmentService.create(payload);

      return res.status(HttpStatus.CREATED).json(data);
    } catch (error) {
      logger.error(error);
      return res.status(HttpStatus.BAD_REQUEST).json(error.message);
    }
  }
}
