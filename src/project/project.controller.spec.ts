import { Test, TestingModule } from '@nestjs/testing';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { PrismaService } from '../prisma.service';

describe('ProjectController', () => {
  let controller: ProjectController;
  let service: ProjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectController],
      providers: [ProjectService, PrismaService],
    }).compile();

    controller = module.get<ProjectController>(ProjectController);
    service = module.get<ProjectService>(ProjectService);
  });

  it('should return all projects', async () => {
    const result = [
      {
        id: 1,
        name: 'name',
        purpose: 'purpose',
        description: 'description',
        status: 'באיפיון',
        productionTime: new Date(),
        factorableType: 'חיצוני',
        externalId: 1,
        internalId: 1,
        requiresId: 1,
        classification: 'סודי',
        environment: 'שחורה',
        population: ['קבע'],
      },
    ];

    jest.spyOn(service, 'projects').mockImplementation(async () => result);

    expect(await controller.getProjects()).toBe(result);
  });

  it('should create a project', async () => {
    const data = {
      name: 'name',
      purpose: 'purpose',
      description: 'description',
      status: 'באיפיון',
      productionTime: null,
      factorableType: 'פנימי',
      classification: 'סודי',
      environment: 'שחורה',
      population: ['קבע'],
      requires: {},
      external: null,
      internal: null,
    };
    const result = {
      id: 1,
      name: 'name',
      purpose: 'purpose',
      description: 'purpose',
      status: 'באיפיון',
      productionTime: new Date(),
      factorableType: 'חיצוני',
      externalId: 1,
      internalId: 1,
      requiresId: 1,
      classification: 'סודי',
      environment: 'שחורה',
      population: ['קבע'],
    };

    jest.spyOn(service, 'createProject').mockImplementation(async () => result);

    expect(await controller.createProject(data)).toBe(result);
  });

  it('should update a project', async () => {
    const data = {
      name: 'name',
      purpose: 'purpose',
      description: 'purpose',
      status: 'באיפיון',
      productionTime: null,
      factorableType: 'פנימי',
      classification: 'סודי',
      environment: 'שחורה',
      population: ['קבע'],
      requires: {},
      external: null,
      internal: null,
    };
    const id = '1';
    const result = {
      id: 1,
      name: 'מערכת',
      purpose: 'מטרה',
      description: 'תאור',
      status: 'באיפיון',
      productionTime: new Date(),
      factorableType: 'חיצוני',
      externalId: 1,
      internalId: 1,
      requiresId: 1,
      classification: 'סודי',
      environment: 'שחורה',
      population: ['קבע'],
    };

    jest.spyOn(service, 'updateProject').mockImplementation(async () => result);

    expect(await controller.updateProject(data, id)).toBe(result);
  });

  it('should delete a project', async () => {
    const id = '1';
    const result = {
      id: 1,
      name: 'מערכת',
      purpose: 'מטרה',
      description: 'תאור',
      status: 'באיפיון',
      productionTime: new Date(),
      factorableType: 'חיצוני',
      externalId: 1,
      internalId: 1,
      requiresId: 1,
      classification: 'סודי',
      environment: 'שחורה',
      population: ['קבע'],
    };

    jest.spyOn(service, 'deleteProject').mockImplementation(async () => result);

    expect(await controller.deleteProject(id)).toBe(result);
  });
});
