import { Injectable } from '@nestjs/common';
import { Prisma, Project } from '@prisma/client';
import { PrismaService } from './../prisma.service';


@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async projetcs(): Promise<Project[]> {
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

  // async checkIfProjectExists(id: string): Promise<boolean> {
  //   const project = await this.prisma.project.findUnique({
  //     where: {
  //       id: id,
  //     },
  //   });
  
  //   return !!project;
  // }
  

  async updateProject(params: {
    where: Prisma.ProjectWhereUniqueInput;
    data: Prisma.ProjectUpdateInput;
  }): Promise<Project> {
    const { where, data } = params;
    try {
      return await this.prisma.project.update({
        data,
        where,
      });
    } catch (error: any) {
      if (error.code === 'P2025') {
        // Handle specific error code P2025 (Unique constraint violation)
        throw new Error('Project with the same unique key already exists.');
      } else {
        // Handle other Prisma errors or generic errors
        throw new Error('An error occurred while updating the project.');
      }
    }
  }

  async deleteProject(where: Prisma.ProjectWhereUniqueInput): Promise<Project> {
    return this.prisma.project.delete({
      where,
    });
  }
}
