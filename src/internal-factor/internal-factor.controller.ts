import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Internal, Prisma } from '@prisma/client';
import { InternalFactorService } from './internal-factor.service';

@Controller('internal-factor')
export class InternalFactorController {
  constructor(private readonly internalFactorService: InternalFactorService) {}

  @Get()
  async getInternalFactors(): Promise<Internal[]> {
    return this.internalFactorService.internalFactors();
  }

  @Post()
  async createInternalFactor(@Body() data: Prisma.InternalCreateInput) {
    return this.internalFactorService.createInternalFactor(data);
  }

  @Put(':id')
  async updateInternalFactor(
    @Body() data: Prisma.InternalUpdateInput,
    @Param('id') id: string,
  ): Promise<Internal> {
    return this.internalFactorService.updateInternalFactor({
      where: { id: Number(id) },
      data: data,
    });
  }

  @Delete(':id')
  async deleteInternalFactor(@Param('id') id: string): Promise<Internal> {
    return this.internalFactorService.deleteInternalFactor({ id: Number(id) });
  }
}
