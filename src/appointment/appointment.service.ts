import { Injectable } from '@nestjs/common';

import { PrismaService } from '~/database/prisma.service';
import {
  CreateAppointmentDto,
  FilterAppointmentDto,
} from '~/appointment/appointment.dto';

@Injectable()
export class AppointmentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(payload: CreateAppointmentDto) {
    const { id } = await this.prisma.appointment.create({
      data: {
        ...payload,
        schedule: {
          connect: {
            id: payload.schedule,
          },
        },
        user: {
          connect: {
            id: payload.user,
          },
        },
        doctor: {
          connect: {
            id: payload.doctor,
          },
        },
      },
    });

    return this.prisma.appointment.findUnique({ where: { id } });
  }

  async paginate({ doctor, pagination }: FilterAppointmentDto) {
    const AND = [];
    if (doctor)
      AND.push({
        doctor: {
          id: doctor,
        },
      });
    const total = await this.prisma.appointment.count();

    const docs = await this.prisma.appointment.findMany({
      take: pagination.per_page,
      skip: (pagination.page - 1) * pagination.per_page,
      where: {
        AND,
      },
    });

    return {
      ...pagination,
      total,
      docs,
      pages: Math.ceil(total / pagination.per_page),
    };
  }

  async show(id: string) {
    return this.prisma.appointment.findUnique({
      where: { id },
      include: {
        user: true,
        doctor: true,
        schedule: true,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.schedule.delete({ where: { id } });
  }
}
