import { Module } from '@nestjs/common';
import { ProjectController } from './project/project.controller';
import { ProjectService } from './project/project.service';
import { PrismaService } from './prisma.service';
import { InternalFactorService } from './internal-factor/internal-factor.service';
import { InternalFactorController } from './internal-factor/internal-factor.controller';
import { ExternalFactorService } from './external-factor/external-factor.service';
import { ExternalFactorController } from './external-factor/external-factor.controller';

@Module({
  imports: [],
  controllers: [
    ProjectController,
    InternalFactorController,
    ExternalFactorController,
  ],
  providers: [
    ProjectService,
    PrismaService,
    InternalFactorService,
    ExternalFactorService,
  ],
})
export class AppModule {}
