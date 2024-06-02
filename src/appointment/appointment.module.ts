import { Module } from '@nestjs/common';

import { AppointmentService } from '~/appointment/appointment.service';
import { PrismaService } from '~/database/prisma.service';
import { AppointmentController } from '~/appointment/appointment.controller';

@Module({
  imports: [],
  providers: [AppointmentService, PrismaService],
  controllers: [AppointmentController],
})
export class AppointmentModule {}
