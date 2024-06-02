import { Module } from '@nestjs/common';

import { PrismaService } from '~/database/prisma.service';
import { ScheduleService } from '~/schedule/schedule.service';
import { ScheduleController } from '~/schedule/schedule.controller';

@Module({
  imports: [],
  controllers: [ScheduleController],
  providers: [PrismaService, ScheduleService],
})
export class ScheduleModule {}
