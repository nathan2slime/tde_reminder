import { Module } from '@nestjs/common';

import { PrismaService } from '~/database/prisma.service';
import { ClientController } from '~/client/client.controller';
import { ClientService } from '~/client/client.service';
import { AppointmentService } from '~/appointment/appointment.service';

@Module({
  controllers: [ClientController],
  providers: [ClientService, PrismaService, AppointmentService],
  imports: [],
})
export class ClientModule {}
