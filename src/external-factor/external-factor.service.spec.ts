import { Test, TestingModule } from '@nestjs/testing';
import { ExternalFactorService } from './external-factor.service';
import { PrismaService } from './../prisma.service';

describe('ExternalFactorService', () => {
  let service: ExternalFactorService;

  const external = [
    {
      id: 1,
      name: 'סקייבר',
      image: 'skyvar.png',
    },
  ];
  const newExternal = {
    id: 2,
    name: 'elbit',
    image: 'elbit.png',
  };

  const db = {
    external: {
      findMany: jest.fn().mockReturnValue(external),
      create: jest.fn().mockReturnValue(newExternal),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExternalFactorService,
        {
          provide: PrismaService,
          useValue: db,
        },
      ],
    }).compile();

    service = module.get<ExternalFactorService>(ExternalFactorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return external factors', async () => {
    expect(await service.externalFactors()).toEqual([
      {
        id: external[0].id,
        name: external[0].name,
        image: external[0].image,
      },
    ]);
  });

  it('should create external factor', async () => {
    expect(await service.createExternalFactor(newExternal)).toEqual(
      newExternal,
    );
  });
});
