import { Injectable } from '@nestjs/common';

import {
  CreateClientDto,
  ShowClientDto,
  UpdateClientDto,
} from '~/client/client.dto';
import { PrismaService } from '~/database/prisma.service';
import { PaginationDto } from '~/types';
import { AppointmentService } from '~/appointment/appointment.service';

@Injectable()
export class ClientService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly appointmentService: AppointmentService,
  ) {}

  async create(data: CreateClientDto) {
    const { id } = await this.prisma.client.create({
      data,
      select: { id: true },
    });

    return this.prisma.client.findUnique({
      where: { id },
    });
  }

  async update(payload: UpdateClientDto, id: string) {
    await this.prisma.client.update({ data: payload, where: { id } });

    return this.prisma.client.findUnique({ where: { id } });
  }

  async remove(id: string) {
    const appointments = await this.prisma.appointment.findMany({
      where: {
        user: {
          id,
        },
      },
    });
    await Promise.all(
      appointments.map((appointment) =>
        this.appointmentService.remove(appointment.id),
      ),
    );

    return this.prisma.client.delete({ where: { id } });
  }

  async paginate(payload: PaginationDto) {
    const total = await this.prisma.doctor.count();
    const docs = await this.prisma.client.findMany({
      take: payload.per_page,
      skip: (payload.page - 1) * payload.per_page,
    });

    return {
      ...payload,
      total,
      docs,
      pages: Math.ceil(total / payload.per_page),
    };
  }

  async show(payload: ShowClientDto) {
    return this.prisma.client.findUnique({
      where: {
        id: payload.id,
      },
      include: {
        appointments: true,
      },
    });
  }
}
