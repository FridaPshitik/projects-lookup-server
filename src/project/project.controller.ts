import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Prisma, Project } from '@prisma/client';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  async getProjects(): Promise<Project[]> {
    return this.projectService.projetcs();
  }

  @Post()
  async createProject(@Body() data: Prisma.ProjectCreateInput) {
    return this.projectService.createProject(data);
  }

  @Put(':id')
  async updateProject(
    @Body() data: Prisma.ProjectUpdateInput,
    @Param('id') id: string,
  ): Promise<Project> {
    return this.projectService.updateProject({
      where: { id: Number(id) },
      data: data,
    });
  }

  @Delete(':id')
  async deleteProject(@Param('id') id: string): Promise<Project> {
    return this.projectService.deleteProject({ id: Number(id) });
  }
}
