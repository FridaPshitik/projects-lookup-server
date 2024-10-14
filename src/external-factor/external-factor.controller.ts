import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { ExternalFactorService } from './external-factor.service';
import { External, Prisma } from '@prisma/client';

@Controller('external-factor')
export class ExternalFactorController {
  constructor(private readonly externalFactorService: ExternalFactorService) {}

  @Get()
  async getExternalFactors(): Promise<External[]> {
    return this.externalFactorService.externalFactors();
  }

  @Get(':imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './uploads' });
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    }),
  )
  async createExternalFactor(
    @Body() data: Prisma.ExternalCreateInput,
    @UploadedFile() image = data.image,
  ) {
    data.image = image['originalname'];
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
