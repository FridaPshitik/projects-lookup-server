import { Test, TestingModule } from '@nestjs/testing';
import { InternalFactorService } from './internal-factor.service';
import { PrismaService } from './../prisma.service';

describe('InternalFactorService', () => {
  let service: InternalFactorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InternalFactorService, PrismaService],
    }).compile();

    service = module.get<InternalFactorService>(InternalFactorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
