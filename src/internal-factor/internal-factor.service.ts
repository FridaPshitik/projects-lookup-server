import { Injectable } from '@nestjs/common';
import { Internal, Prisma } from '@prisma/client';
import { PrismaService } from './../prisma.service';

@Injectable()
export class InternalFactorService {
  constructor(private prisma: PrismaService) {}

  async internalFactors(): Promise<Internal[]> {
    return this.prisma.internal.findMany();
  }

  async createInternalFactor(
    data: Prisma.InternalCreateInput,
  ): Promise<Internal> {
    return this.prisma.internal.create({
      data,
    });
  }

  async updateInternalFactor(params: {
    where: { id: number };
    data: Prisma.InternalUpdateInput;
  }): Promise<Internal> {
    const { where, data } = params;
    return this.prisma.internal.update({
      data,
      where,
    });
  }

  async deleteInternalFactor(params: {
    where: { id: number };
  }): Promise<Internal> {
    const { where } = params;
    return this.prisma.internal.delete({
      where,
    });
  }
}
