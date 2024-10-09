import { BadRequestException, Injectable, InternalServerErrorException, Response, ServiceUnavailableException } from '@nestjs/common';
import { External, Prisma } from '@prisma/client';
import { PrismaService } from './../prisma.service';
// import {Response} from 'express';

@Injectable()
export class ExternalFactorService {
  constructor(private prisma: PrismaService) { }

  async externalFactors(): Promise<External[]> {
    // try {
      return this.prisma.external.findMany();
    // }
    // catch (err) {
    //   throw new ServiceUnavailableException(
    //     'Cannot retrieve data, try again later',
    //   );
    // }
  }

  async getExternalById(id: number) {
    // try {
      return await this.prisma.external.findUnique({
        where: { id: Number(id) },
      });
    // } catch (error) {
    //   throw new InternalServerErrorException();
    // }
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
    // try {
      const { where, data } = params;
      // const external = await this.getExternalById(Number(where))
      // if (!external) {
      //   throw new BadRequestException('external ID not found');
      // }
      return this.prisma.external.update({
        data,
        where,
      });
    // }
    // catch (e) {
    //   console.log(e);
    // }
  }


  async deleteExternalFactor(
    where: Prisma.ExternalWhereUniqueInput,
  ): Promise<External> {
    // const external=await this.getExternalById(Number(where))
    // if(!external){
    //   throw new BadRequestException(Promise.apply() .send(exception.message));
    // }
    return this.prisma.external.delete({
      where,
    });
  }
}
