import { Injectable, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { External, Prisma } from '@prisma/client';
import { PrismaService } from './../prisma.service';

@Injectable()
export class ExternalFactorService {
  constructor(private prisma: PrismaService) { }

  async externalFactors(): Promise<External[]> {
    try {
      return this.prisma.external.findMany();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async createExternalFactor(
    data: Prisma.ExternalCreateInput,
  ): Promise<External> {
    try {
      return this.prisma.external.create({
        data,
      });
    }
    catch (error) {
      if (error instanceof Prisma.PrismaClientValidationError) {
        throw new BadRequestException(error.message);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async updateExternalFactor(params: {
    where: Prisma.ExternalWhereUniqueInput;
    data: Prisma.ExternalUpdateInput;
  }): Promise<External> {
    try {
      const { where, data } = params;
      return this.prisma.external.update({
        data,
        where,
      });
    }
    catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async deleteExternalFactor(
    where: Prisma.ExternalWhereUniqueInput,
  ): Promise<External> {
    try {
      return this.prisma.external.delete({
        where,
      });
    }
    catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
