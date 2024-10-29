import { Test, TestingModule } from '@nestjs/testing';
import { ExternalFactorService } from './external-factor.service';
import { PrismaService } from './../prisma.service';

describe('ExternalFactorService', () => {
  let service: ExternalFactorService;

  const external = [
    {
      id: 1,
      name: 'סקייבר',
      image: 'inside.png',
    },
  ];
  const newExternal = {
    id: 2,
    name: 'elbit',
    image: 'elbit.png',
  };

  const name = 'start';
  const updateExternal = external[0];
  updateExternal.name = name;

  const db = {
    external: {
      findMany: jest.fn().mockReturnValue(external),
      create: jest.fn().mockReturnValue(newExternal),
      update: jest.fn().mockReturnValue(updateExternal),
      delete: jest.fn().mockReturnValue(updateExternal),
      findUnique: jest.fn().mockReturnValue(updateExternal),
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

  it('should update external factor', async () => {
    expect(
      await service.updateExternalFactor({
        where: { id: external[0].id },
        data: { name: name },
      }),
    ).toEqual(updateExternal);
  });

  it('should delete external factor', async () => {
    expect(
      await service.deleteExternalFactor({
        where: { id: external[0].id },
      }),
    ).toEqual(updateExternal);
  });
});
