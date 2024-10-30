import { Injectable } from '@nestjs/common';
import { Prisma, Project } from '@prisma/client';
import { PrismaService } from './../prisma.service';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async projects(): Promise<Project[]> {
    return this.prisma.project.findMany({
      include: {
        external: true,
        internal: true,
        requires: true,
      },
    });
  }

  async createProject(data: Prisma.ProjectCreateInput): Promise<Project> {
    return this.prisma.project.create({
      data,
      include: {
        external: true,
        internal: true,
        requires: true,
      },
    });
  }

  async updateProject(params: {
    where: { id: number };
    data: Prisma.ProjectUpdateInput;
  }): Promise<Project> {
    const { where, data } = params;
    return this.prisma.project.update({
      data,
      where,
    });
  }

  async deleteProject(params: { where: { id: number } }): Promise<Project> {
    const { where } = params;
    return this.prisma.project.delete({
      where,
    });
  }
}
