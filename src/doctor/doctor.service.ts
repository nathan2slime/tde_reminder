import { Injectable } from '@nestjs/common';

import { CreateDoctorDto } from '~/doctor/doctor.dto';
import { PrismaService } from '~/database/prisma.service';

@Injectable()
export class DoctorService {
  constructor(private readonly prisma: PrismaService) {}

  async create(payload: CreateDoctorDto) {
    // const doctor = await this.prisma.client.create()
  }
}
