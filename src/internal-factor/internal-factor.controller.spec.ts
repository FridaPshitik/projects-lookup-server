import { Test, TestingModule } from '@nestjs/testing';
import { InternalFactorController } from './internal-factor.controller';
import { InternalFactorService } from './internal-factor.service';
import { PrismaService } from '../prisma.service';

describe('InternalFactorController', () => {
  let controller: InternalFactorController;
  let service: InternalFactorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InternalFactorController],
      providers: [InternalFactorService, PrismaService],
    }).compile();

    controller = module.get<InternalFactorController>(InternalFactorController);
    service = module.get<InternalFactorService>(InternalFactorService);
  });

  it('should return all internal factors', async () => {
    const result = [
      {
        id: 1,
        name: 'internal-factor',
        command: 'department',
        department: 'department',
        contact: 'Bob',
        phone: '123456789',
        email: 'bob@gmail.om',
      },
    ];

    jest
      .spyOn(service, 'internalFactors')
      .mockImplementation(async () => result);

    expect(await controller.getInternalFactors()).toBe(result);
  });

  it('should create an internal factor', async () => {
    const data = {
      name: 'internal-factor',
      command: 'department',
      department: 'department',
      contact: 'Bob',
      phone: '123456789',
      email: 'bob@gmail.om',
    };
    const result = {
      id: 1,
      name: 'internal-factor',
      command: 'department',
      department: 'department',
      contact: 'Bob',
      phone: '123456789',
      email: 'bob@gmail.om',
    };

    jest
      .spyOn(service, 'createInternalFactor')
      .mockImplementation(async () => result);

    expect(await controller.createInternalFactor(data)).toBe(result);
  });

  it('should update an internal factor', async () => {
    const data = { name: 'Updated Factor' };
    const id = '1';
    const result = {
      id: 1,
      name: 'internal-factor',
      command: 'department',
      department: 'department',
      contact: 'Bob',
      phone: '123456789',
      email: 'bob@gmail.om',
    };

    jest
      .spyOn(service, 'updateInternalFactor')
      .mockImplementation(async () => result);

    expect(await controller.updateInternalFactor(data, id)).toBe(result);
  });

  it('should delete an internal factor', async () => {
    const id = '1';
    const result = {
      id: 1,
      name: 'internal-factor',
      command: 'department',
      department: 'department',
      contact: 'Bob',
      phone: '123456789',
      email: 'bob@gmail.om',
    };

    jest
      .spyOn(service, 'deleteInternalFactor')
      .mockImplementation(async () => result);

    expect(await controller.deleteInternalFactor(id)).toBe(result);
  });
});
