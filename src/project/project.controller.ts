import { FastifyReply } from 'fastify';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  async getProjects(@Res() reply: FastifyReply) {
    try {
      const data = await this.projectService.projetcs();
      return reply.code(200).send(data);
    } catch (error) {
      reply.send(error);
    }
  }

  @Post()
  async createProject(
    @Body() data: Prisma.ProjectCreateInput,
    @Res() reply: FastifyReply,
  ) {
    try {
      const newData = await this.projectService.createProject(data);
      return reply.code(200).send(newData);
    } catch (error) {
      reply.send(error);
    }
  }

  @Put(':id')
  async updateProject(
    @Body() data: Prisma.ProjectUpdateInput,
    @Param('id') id: string,
    @Res() reply: FastifyReply,
  ) {
    try {
      const update = await this.projectService.updateProject({
        where: { id: Number(id) },
        data: data,
      });
      return reply.code(200).send(update);
    } catch (error) {
      reply.send(error);
    }
  }

  @Delete(':id')
  async deleteProject(@Param('id') id: string, @Res() reply: FastifyReply) {
    try {
      const deleted = await this.projectService.deleteProject({
        id: Number(id),
      });
      return reply.code(200).send(deleted);
    } catch (error) {
      reply.send(error);
    }
  }
}
