import { Test, TestingModule } from '@nestjs/testing';
import { InternalFactorService } from './internal-factor.service';
import { PrismaService } from './../prisma.service';

describe('InternalFactorService', () => {
  let service: InternalFactorService;

  const internal = [
    {
      id: 1,
      name: 'יחידת ציפור',
      command: 'פיקוד צפון',
      department: '',
      contact: 'רפי',
      phone: '0534189652',
      email: 'r@tzipor.co.il',
    },
  ];

  const newInternal = {
    id: 2,
    name: 'יחידת ציפור',
    command: 'פיקוד דרום',
    department: '',
    contact: 'רפי',
    phone: '0534189652',
    email: 'r@tzipor.co.il',
  };

  const phone = '0533333333';
  const updateInternal = internal[0];
  updateInternal.phone = phone;

  const db = {
    internal: {
      findMany: jest.fn().mockReturnValue(internal),
      create: jest.fn().mockReturnValue(newInternal),
      update: jest.fn().mockReturnValue(updateInternal),
      delete: jest.fn().mockReturnValue(updateInternal),
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
    expect(await service.internalFactors()).toEqual([
      {
        id: internal[0].id,
        name: internal[0].name,
        command: internal[0].command,
        department: internal[0].department,
        contact: internal[0].contact,
        phone: internal[0].phone,
        email: internal[0].email,
      },
    ]);
  });

  it('should create internal factor', async () => {
    expect(await service.createInternalFactor(newInternal)).toEqual(
      newInternal,
    );
  });

  it('should update internal factor', async () => {
    expect(
      await service.updateInternalFactor({
        where: { id: internal[0].id },
        data: { phone: phone },
      }),
    ).toEqual(updateInternal);
  });

  it('should delete internal factor', async () => {
    expect(
      await service.deleteInternalFactor({
        where: { id: internal[0].id },
      }),
    ).toEqual(updateInternal);
  });
});
