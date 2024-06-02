import { Injectable } from '@nestjs/common';

import { PrismaService } from '~/database/prisma.service';
import { CreateScheduleDto, UpdateScheduleDto } from '~/schedule/schedule.dto';

@Injectable()
export class ScheduleService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateScheduleDto) {
    return this.prisma.schedule.create({
      data: {
        ...data,
        doctor: {
          connect: {
            id: data.doctor,
          },
        },
      },
    });
  }

  async update(payload: UpdateScheduleDto, id: string) {
    return this.prisma.schedule.update({
      data: payload,
      where: {
        id,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.schedule.delete({ where: { id } });
  }
}
