import { Test, TestingModule } from '@nestjs/testing';
import { ExternalFactorService } from './external-factor.service';
import { PrismaService } from './../prisma.service';
import * as fs from 'fs';

describe('ExternalFactorService', () => {
  let service: ExternalFactorService;

  const external = {
    id: 1,
    name: 'סקייבר',
    image: 'inside.png',
  };

  const idNotFound = {
    status: 400,
    error:
      'An operation failed because it depends on one or more records that were required but not found. Record to delete does not exist.',
  };

  const name = 'start';
  const updateExternal = external;
  updateExternal.name = name;

  const db = {
    external: {
      findMany: jest.fn().mockReturnValue([external]),
      create: jest.fn().mockReturnValue(external),
      update: jest.fn(({ where: { id } }) =>
        id === updateExternal.id ? updateExternal : idNotFound,
      ),
      delete: jest.fn(({ where: { id } }) =>
        id === updateExternal.id ? updateExternal : idNotFound,
      ),
      findUnique: jest.fn().mockReturnValue(updateExternal),
    },
  };
  jest.spyOn(fs, 'rm').mockReturnValue(null);

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
    expect(await service.externalFactors()).toEqual([external]);
  });

  it('should create external factor', async () => {
    expect(await service.createExternalFactor(external)).toEqual(external);
  });
  describe('update internal factor by id', () => {
    it('should update external factor', async () => {
      expect(
        await service.updateExternalFactor({
          where: { id: external.id },
          data: { name: name },
        }),
      ).toEqual(updateExternal);
    });

    it('should return error - id to update does not exist', async () => {
      expect(
        await service.updateExternalFactor({
          where: { id: -9 },
          data: { name: name },
        }),
      ).toEqual(idNotFound);
    });
  });
  describe('delete external factor by id', () => {
    it('should delete external factor', async () => {
      expect(
        await service.deleteExternalFactor({
          where: { id: external.id },
        }),
      ).toEqual(updateExternal);
    });
    it('should return error - id to delete does not exist', async () => {
      expect(
        await service.deleteExternalFactor({
          where: { id: -9 },
        }),
      ).toEqual(idNotFound);
    });
  });
});
