import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { logger } from '~/logger';
import { ScheduleService } from '~/schedule/schedule.service';
import { CreateScheduleDto, UpdateScheduleDto } from '~/schedule/schedule.dto';

@Controller('schedule')
@ApiTags('Schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post('create')
  async create(@Res() res: Response, @Body() payload: CreateScheduleDto) {
    try {
      const data = await this.scheduleService.create(payload);

      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      logger.error(error);
      return res.status(HttpStatus.BAD_REQUEST).json(error.message);
    }
  }

  @Post('update/:id')
  @ApiParam({ name: 'id', type: 'string' })
  async update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() payload: UpdateScheduleDto,
  ) {
    try {
      const data = await this.scheduleService.update(payload, id);

      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      logger.error(error);
      return res.status(HttpStatus.BAD_REQUEST).json(error.message);
    }
  }

  @Delete('remove/:id')
  @ApiParam({ name: 'id', type: 'string' })
  async remove(@Res() res: Response, @Param('id') id: string) {
    try {
      await this.scheduleService.remove(id);

      return res.status(HttpStatus.OK).send();
    } catch (error) {
      logger.error(error);
      return res.status(HttpStatus.BAD_REQUEST).json(error.message);
    }
  }
}
