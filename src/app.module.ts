import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { DoctorModule } from '~/doctor/doctor.module';
import { ScheduleModule } from '~/schedule/schedule.module';
import { AppointmentModule } from '~/appointment/appointment.module';
import { ClientModule } from '~/client/client.module';

@Module({
  imports: [
    PassportModule,
    ClientModule,
    DoctorModule,
    AppointmentModule,
    ScheduleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
