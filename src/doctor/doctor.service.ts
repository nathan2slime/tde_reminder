import { Injectable } from '@nestjs/common';

import {
  CreateDoctorDto,
  ShowDoctorDto,
  UpdateDoctorDto,
} from '~/doctor/doctor.dto';
import { PrismaService } from '~/database/prisma.service';
import { ScheduleService } from '~/schedule/schedule.service';
import { PaginationDto } from '~/types';
import { AppointmentService } from '~/appointment/appointment.service';

@Injectable()
export class DoctorService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly scheduleService: ScheduleService,
    private readonly appointmentService: AppointmentService,
  ) {}

  async create(payload: CreateDoctorDto) {
    const { schedules, ...data } = payload;

    const { id } = await this.prisma.doctor.create({
      data,
      select: { id: true },
    });
    await Promise.all(
      schedules.map(async (schedule) =>
        this.scheduleService.create({ ...schedule, doctor: id }),
      ),
    );

    return this.prisma.doctor.findUnique({
      where: { id },
      include: {
        schedules: true,
      },
    });
  }

  async update(payload: UpdateDoctorDto, id: string) {
    await this.prisma.doctor.update({ data: payload, where: { id } });

    return this.prisma.doctor.findUnique({ where: { id } });
  }

  async remove(id: string) {
    const { schedules, appointments } = await this.prisma.doctor.findUnique({
      where: {
        id,
      },
      select: {
        schedules: {
          select: {
            id: true,
          },
        },
        appointments: {
          select: {
            id: true,
          },
        },
      },
    });

    await Promise.all(
      schedules.map((schedule) => this.scheduleService.remove(schedule.id)),
    );
    await Promise.all(
      appointments.map((schedule) =>
        this.appointmentService.remove(schedule.id),
      ),
    );

    return this.prisma.doctor.delete({ where: { id } });
  }

  async paginate(payload: PaginationDto) {
    const total = await this.prisma.doctor.count();
    const docs = await this.prisma.doctor.findMany({
      take: payload.per_page,
      skip: (payload.page - 1) * payload.per_page,
    });

    return {
      ...payload,
      total,
      pages: Math.ceil(total / payload.per_page),
      docs,
    };
  }

  async schedule(payload: ShowDoctorDto) {
    return this.prisma.doctor.findUnique({
      where: {
        id: payload.id,
      },
      select: {
        schedules: true,
      },
    });
  }

  async show(payload: ShowDoctorDto) {
    return this.prisma.doctor.findUnique({
      where: {
        id: payload.id,
      },
      include: {
        schedules: true,
      },
    });
  }
}
