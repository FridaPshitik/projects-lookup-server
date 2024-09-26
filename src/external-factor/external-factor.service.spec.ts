import { Test, TestingModule } from '@nestjs/testing';
import { ExternalFactorService } from './external-factor.service';
import { PrismaService } from './../prisma.service';

describe('ExternalFactorService', () => {
  let service: ExternalFactorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExternalFactorService, PrismaService],
    }).compile();

    service = module.get<ExternalFactorService>(ExternalFactorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
