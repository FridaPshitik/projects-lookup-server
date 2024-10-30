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

  const idNotFound = {
    status: 400,
    error:
      'An operation failed because it depends on one or more records that were required but not found. Record to delete does not exist.',
  };
  const uniqueConstraint = {
    status: 400,
    error: 'Unique constraint failed on the fields: (`command`)',
  };
  const purpose = 'תיעוד פרויקטים';
  const updateProject = projectInDB;
  updateProject.purpose = purpose;

  const db = {
    project: {
      findMany: jest.fn().mockReturnValue([projectInDB]),
      create: jest
        .fn()
        .mockImplementationOnce(() => projectInDB)
        .mockImplementationOnce(() => uniqueConstraint),
      update: jest.fn(({ where: { id } }) =>
        id === updateProject.id ? updateProject : idNotFound,
      ),
      delete: jest.fn(({ where: { id } }) =>
        id === updateProject.id ? updateProject : idNotFound,
      ),
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

  describe('create project', () => {
    it('should create project', async () => {
      expect(await service.createProject(projectToSend)).toEqual(projectInDB);
    });

    it('should return error - Unique error', async () => {
      const failNew = projectToSend;
      failNew.id = 2;
      expect(await service.createProject(failNew)).toEqual(uniqueConstraint);
    });
  });

  describe('update project by id', () => {
    it('should update project', async () => {
      expect(
        await service.updateProject({
          where: { id: projectInDB.id },
          data: { purpose: purpose },
        }),
      ).toEqual(updateProject);
    });

    it('should return error - id to update does not exist', async () => {
      expect(
        await service.updateProject({
          where: { id: -9 },
          data: { purpose: purpose },
        }),
      ).toEqual(idNotFound);
    });
  });

  describe('delete project by id', () => {
    it('should delete project', async () => {
      const projectInDB: { id: number } = { id: 1 };
      expect(
        await service.deleteProject({
          where: { id: projectInDB.id },
        }),
      ).toEqual(updateProject);
    });

    it('should return error - id to delete does not exist', async () => {
      expect(
        await service.deleteProject({
          where: { id: -9 },
        }),
      ).toEqual(idNotFound);
    });
  });
});
