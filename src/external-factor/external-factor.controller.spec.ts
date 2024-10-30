import { Test, TestingModule } from '@nestjs/testing';
import { ExternalFactorController } from './external-factor.controller';
import { ExternalFactorService } from './external-factor.service';
import { PrismaService } from '../prisma.service';

describe('ExternalFactorController', () => {
  let controller: ExternalFactorController;
  let service: ExternalFactorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExternalFactorController],
      providers: [ExternalFactorService, PrismaService],
    }).compile();

    controller = module.get<ExternalFactorController>(ExternalFactorController);
    service = module.get<ExternalFactorService>(ExternalFactorService);
  });

  it('should return all external factors', async () => {
    const result = [
      { id: 1, name: 'Factor 1', image: 'factor1.png' },
      { id: 2, name: 'Factor 2', image: 'factor2.png' },
    ];

    jest
      .spyOn(service, 'externalFactors')
      .mockImplementation(async () => result);

    expect(await controller.getExternalFactors()).toBe(result);
  });

  it('should create an external factor', async () => {
    const data = { name: 'New Factor', image: 'new_image.jpg' };
    const result = { id: 3, name: 'New Factor', image: 'new_image.jpg' };

    jest
      .spyOn(service, 'createExternalFactor')
      .mockImplementation(async () => result);

    expect(await controller.createExternalFactor(data)).toBe(result);
  });

  it('should update an external factor', async () => {
    const data = { name: 'Updated Factor' };
    const id = '1';
    const result = { id: 1, name: 'Updated Factor', image: 'image.jpg' };

    jest
      .spyOn(service, 'updateExternalFactor')
      .mockImplementation(async () => result);

    expect(await controller.updateExternalFactor(data, id)).toBe(result);
  });

  it('should delete an external factor', async () => {
    const id = 1;
    const result = { id: 1, name: 'Factor 1', image: 'image.jpg' };

    jest
      .spyOn(service, 'deleteExternalFactor')
      .mockImplementation(async () => result);

    expect(await controller.deleteExternalFactor(id)).toBe(result);
  });
});
