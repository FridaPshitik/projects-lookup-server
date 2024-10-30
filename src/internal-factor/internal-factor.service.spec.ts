import { Test, TestingModule } from '@nestjs/testing';
import { InternalFactorService } from './internal-factor.service';
import { PrismaService } from './../prisma.service';

describe('InternalFactorService', () => {
  let service: InternalFactorService;

  const internal = {
    id: 1,
    name: 'יחידת ציפור',
    command: 'פיקוד צפון',
    department: '',
    contact: 'רפי',
    phone: '0534189652',
    email: 'r@tzipor.co.il',
  };

  const phone = '0533333333';
  const updateInternal = internal;
  updateInternal.phone = phone;

  const idNotFound = {
    status: 400,
    error:
      'An operation failed because it depends on one or more records that were required but not found. Record to delete does not exist.',
  };

  const uniqueConstraint = {
    status: 400,
    error: 'Unique constraint failed on the fields: (`command`)',
  };
  const db = {
    internal: {
      findMany: jest.fn().mockReturnValue([internal]),
      create: jest.fn((data) =>
        data.data === internal ? internal : uniqueConstraint,
      ),
      update: jest.fn(({ where: { id } }) =>
        id === updateInternal.id ? updateInternal : idNotFound,
      ),
      delete: jest.fn(({ where: { id } }) =>
        id === updateInternal.id ? updateInternal : idNotFound,
      ),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InternalFactorService,
        {
          provide: PrismaService,
          useValue: db,
        },
      ],
    }).compile();

    service = module.get<InternalFactorService>(InternalFactorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return internal factors', async () => {
    expect(await service.internalFactors()).toEqual([internal]);
  });

  describe('create internal factor', () => {
    it('should create internal factor', async () => {
      expect(await service.createInternalFactor(internal)).toEqual(internal);
    });

    // it('should return error - Unique error', async () => {
    //   let failNew = newInternal;
    //   failNew.command = null;
    //   await service.createInternalFactor(newInternal)
    //   expect(await service.createInternalFactor(failNew))
    //   .toEqual(uniqueConstraint);
    // });
  });

  describe('update internal factor by id', () => {
    it('should update internal factor', async () => {
      expect(
        await service.updateInternalFactor({
          where: { id: internal.id },
          data: { phone: phone },
        }),
      ).toEqual(updateInternal);
    });

    it('should return error - id to update does not exist', async () => {
      expect(
        await service.updateInternalFactor({
          where: { id: -9 },
          data: { phone: phone },
        }),
      ).toEqual(idNotFound);
    });
  });

  describe('delete internal factor by id', () => {
    it('should delete internal factor', async () => {
      expect(
        await service.deleteInternalFactor({
          where: { id: internal.id },
        }),
      ).toEqual(updateInternal);
    });

    it('should return error - id to delete does not exist', async () => {
      expect(
        await service.deleteInternalFactor({
          where: { id: -9 },
        }),
      ).toEqual(idNotFound);
    });
  });
});
