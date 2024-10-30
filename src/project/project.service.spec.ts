import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './../prisma.service';
import { ProjectService } from './project.service';

describe('ProjectService', () => {
  let service: ProjectService;

  const projectToSend = {
    id: 2,
    name: 'אלומה',
    purpose: 'תיעוד פרויקטים',
    description:
      'פרויקט זה נועד על מנת למנוע כפילות פיתוח קוד של פרוייקט קיים.\nהפרוייקט ייתן אפשרויות חיפוש מתקדמות.',
    status: 'IN_PROGRESS',
    productionTime: '2024-09-25T12:16:37.284Z',
    factorableType: 'EXTERNAL',
    externalId: null,
    internalId: 1,
    requiresId: 1,
    classification: 'SODI',
    environment: 'BLACk',
    population: ['MUST', 'ATUDA'],
    requires: null,
  };

  const projectInDB = {
    id: 1,
    name: 'תיעוד',
    purpose: 'תיעוד פרויקטים',
    description:
      'פרויקט זה נועד על מנת למנוע כפילות פיתוח קוד של פרוייקט קיים.\nהפרוייקט ייתן אפשרויות חיפוש מתקדמות.',
    status: 'IN_PROGRESS',
    productionTime: '2024-09-25T12:16:37.284Z',
    factorableType: 'EXTERNAL',
    externalId: null,
    internalId: 1,
    requiresId: 1,
    classification: 'SODI',
    environment: 'BLACk',
    population: ['MUST', 'ATUDA'],
    external: null,
    internal: {
      id: 1,
      name: 'יחידת hhhh',
      command: 'פיקוד צפון',
      department: '',
      contact: 'רפי',
      phone: '0534189652',
      email: 'r@tzipor.co.il',
    },
    requires: {
      id: 1,
      name: 'יחידת hhhh',
      command: 'פיקוד צפון',
      department: '',
      contact: 'רפי',
      phone: '0534189652',
      email: 'r@tzipor.co.il',
    },
  };

  const newProject = projectInDB;
  newProject.id = 2;
  newProject.name = 'אלומה';

  const purpose = 'תיעוד פרויקטים';
  const updateProject = projectInDB;
  updateProject.purpose = purpose;

  const db = {
    project: {
      findMany: jest.fn().mockReturnValue([projectInDB]),
      create: jest.fn().mockReturnValue(newProject),
      update: jest.fn().mockReturnValue(updateProject),
      delete: jest.fn().mockReturnValue(updateProject),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectService,
        {
          provide: PrismaService,
          useValue: db,
        },
      ],
    }).compile();

    service = module.get<ProjectService>(ProjectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return projects', async () => {
    expect(await service.projects()).toEqual([projectInDB]);
  });

  it('should create project', async () => {
    expect(await service.createProject(projectToSend)).toEqual(newProject);
  });

  it('should update project', async () => {
    expect(
      await service.updateProject({
        where: { id: projectInDB.id },
        data: { purpose: purpose },
      }),
    ).toEqual(updateProject);
  });

  it('should delete project', async () => {
    const projectInDB: { id: number } = { id: 1 };
    expect(
      await service.deleteProject({
        where: { id: projectInDB.id },
      }),
    ).toEqual(updateProject);
  });
});
