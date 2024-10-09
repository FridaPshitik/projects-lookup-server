import { BadRequestException, Injectable, InternalServerErrorException, Response, ServiceUnavailableException } from '@nestjs/common';
import { External, Prisma } from '@prisma/client';
import { PrismaService } from './../prisma.service';

@Injectable()
export class ExternalFactorService {
  constructor(private prisma: PrismaService) { }

  async externalFactors(): Promise<External[]> {
      return this.prisma.external.findMany();
  }

  async getExternalById(id: number) {
      return await this.prisma.external.findUnique({
        where: { id: Number(id) },
      });
    }

  async createExternalFactor(
    data: Prisma.ExternalCreateInput,
  ): Promise<External> {
    return this.prisma.external.create({
      data,
    });
  }

  async updateExternalFactor(params: {
    where: Prisma.ExternalWhereUniqueInput;
    data: Prisma.ExternalUpdateInput;
  }): Promise<External> {
      const { where, data } = params;
      return this.prisma.external.update({
        data,
        where,
      });
  }


  async deleteExternalFactor(
    where: Prisma.ExternalWhereUniqueInput,
  ): Promise<External> {
    return this.prisma.external.delete({
      where,
    });
  }
}
