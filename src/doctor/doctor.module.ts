import { Module } from '@nestjs/common';

import { DoctorService } from '~/doctor/doctor.service';
import { PrismaService } from '~/database/prisma.service';
import { DoctorController } from '~/doctor/doctor.controller';

@Module({
  controllers: [DoctorController],
  providers: [DoctorService, PrismaService],
  imports: [],
})
export class DoctorModule {}
