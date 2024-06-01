import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { DoctorModule } from '~/doctor/doctor.module';

@Module({
  imports: [PassportModule, DoctorModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
