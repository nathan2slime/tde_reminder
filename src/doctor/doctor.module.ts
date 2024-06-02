import { Module } from '@nestjs/common';

import { DoctorService } from '~/doctor/doctor.service';
import { PrismaService } from '~/database/prisma.service';
import { DoctorController } from '~/doctor/doctor.controller';
import { ScheduleService } from '~/schedule/schedule.service';
import { AppointmentService } from '~/appointment/appointment.service';

@Module({
  controllers: [DoctorController],
  providers: [DoctorService, PrismaService, ScheduleService, AppointmentService],
  imports: [],
})
export class DoctorModule {}
