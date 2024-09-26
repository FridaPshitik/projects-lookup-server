import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ExternalFactorService } from './external-factor.service';
import { External, Prisma } from '@prisma/client';

@Controller('external-factor')
export class ExternalFactorController {
  constructor(private readonly externalFactorService: ExternalFactorService) {}

  @Get()
  async getExternalFactors(): Promise<External[]> {
    return this.externalFactorService.externalFactors();
  }

  @Post()
  async createExternalFactor(@Body() data: Prisma.ExternalCreateInput) {
    return this.externalFactorService.createExternalFactor(data);
  }

  @Put(':id')
  async updateExternalFactor(
    @Body() data: Prisma.ExternalUpdateInput,
    @Param('id') id: string,
  ): Promise<External> {
    return this.externalFactorService.updateExternalFactor({
      where: { id: Number(id) },
      data: data,
    });
  }

  @Delete(':id')
  async deleteExternalFactor(@Param('id') id: string): Promise<External> {
    return this.externalFactorService.deleteExternalFactor({ id: Number(id) });
  }
}
