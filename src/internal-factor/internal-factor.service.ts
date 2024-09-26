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
    where: Prisma.InternalWhereUniqueInput;
    data: Prisma.InternalUpdateInput;
  }): Promise<Internal> {
    const { where, data } = params;
    return this.prisma.internal.update({
      data,
      where,
    });
  }

  async deleteInternalFactor(
    where: Prisma.InternalWhereUniqueInput,
  ): Promise<Internal> {
    return this.prisma.internal.delete({
      where,
    });
  }
}
