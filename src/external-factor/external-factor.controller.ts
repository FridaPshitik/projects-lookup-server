import { FastifyReply } from 'fastify';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ExternalFactorService } from './external-factor.service';
import { Prisma } from '@prisma/client';

@Controller('external-factor')
export class ExternalFactorController {
  constructor(private readonly externalFactorService: ExternalFactorService) {}

  @Get()
  async getExternalFactors(@Res() reply: FastifyReply) {
    try {
      const data = await this.externalFactorService.externalFactors();
      return reply.code(200).send(data);
    } catch (error) {
      reply.send(error);
    }
  }

  @Post()
  async createExternalFactor(
    @Body() data: Prisma.ExternalCreateInput,
    @Res() reply: FastifyReply,
  ) {
    try {
      const newData =
        await this.externalFactorService.createExternalFactor(data);
      return reply.code(200).send(newData);
    } catch (error) {
      reply.send(error);
    }
  }

  @Put(':id')
  async updateExternalFactor(
    @Body() data: Prisma.ExternalUpdateInput,
    @Param('id') id: string,
    @Res() reply: FastifyReply,
  ) {
    try {
      const update = await this.externalFactorService.updateExternalFactor({
        where: { id: Number(id) },
        data: data,
      });
      return reply.code(200).send(update);
    } catch (error) {
      reply.send(error);
    }
  }

  @Delete(':id')
  async deleteExternalFactor(
    @Param('id') id: string,
    @Res() reply: FastifyReply,
  ) {
    try {
      const deleted = await this.externalFactorService.deleteExternalFactor({
        id: Number(id),
      });
      return reply.code(200).send(deleted);
    } catch (error) {
      reply.send(error);
    }
  }
}
