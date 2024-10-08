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
import { Prisma } from '@prisma/client';
import { InternalFactorService } from './internal-factor.service';

@Controller('internal-factor')
export class InternalFactorController {
  constructor(private readonly internalFactorService: InternalFactorService) {}

  @Get()
  async getInternalFactors(@Res() reply: FastifyReply) {
    try {
      const data = await this.internalFactorService.internalFactors();
      return reply.code(200).send(data);
    } catch (error) {
      reply.send(error);
    }
  }

  @Post()
  async createInternalFactor(
    @Body() data: Prisma.InternalCreateInput,
    @Res() reply: FastifyReply,
  ) {
    try {
      const newData =
        await this.internalFactorService.createInternalFactor(data);
      return reply.code(200).send(newData);
    } catch (error) {
      reply.send(error);
    }
  }

  @Put(':id')
  async updateInternalFactor(
    @Body() data: Prisma.InternalUpdateInput,
    @Param('id') id: string,
    @Res() reply: FastifyReply,
  ) {
    try {
      const update = await this.internalFactorService.updateInternalFactor({
        where: { id: Number(id) },
        data: data,
      });
      return reply.code(200).send(update);
    } catch (error) {
      reply.send(error);
    }
  }

  @Delete(':id')
  async deleteInternalFactor(
    @Param('id') id: string,
    @Res() reply: FastifyReply,
  ) {
    try {
      const deleted = await this.internalFactorService.deleteInternalFactor({
        id: Number(id),
      });
      return reply.code(200).send(deleted);
    } catch (error) {
      reply.send(error);
    }
  }
}
