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

import { logger } from '~/logger';
import { PaginationDto } from '~/types';
import { ClientService } from '~/client/client.service';
import { CreateClientDto, UpdateClientDto } from '~/client/client.dto';

@Controller('client')
@ApiTags('Client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post('create')
  async create(@Res() res: Response, @Body() payload: CreateClientDto) {
    try {
      const data = await this.clientService.create(payload);

      return res.status(HttpStatus.CREATED).json(data);
    } catch (error) {
      logger.error(error);
      return res.status(HttpStatus.BAD_REQUEST).json(error.message);
    }
  }

  @Post('paginate')
  async paginate(@Res() res: Response, @Body() payload: PaginationDto) {
    try {
      const data = await this.clientService.paginate(payload);

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
      await this.clientService.remove(id);

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
    @Body() payload: UpdateClientDto,
    @Param('id') id: string,
  ) {
    try {
      const data = await this.clientService.update(payload, id);

      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      logger.error(error);
      return res.status(HttpStatus.BAD_REQUEST).json(error.message);
    }
  }

  @Get('show/:id')
  async show(@Res() res: Response, @Param('id') id: string) {
    try {
      const data = await this.clientService.show({ id });

      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      logger.error(error);
      return res.status(HttpStatus.BAD_REQUEST).json(error.message);
    }
  }
}
