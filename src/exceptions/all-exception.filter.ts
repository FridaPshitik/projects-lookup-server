import { FastifyError } from 'fastify';
import { AbstractHttpAdapter } from '@nestjs/core';

import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: AbstractHttpAdapter) {}
  catch(exception: FastifyError, host: ArgumentsHost): void {
    let errorMessage: unknown;
    let httpStatus: number;
    const lastIndex = exception.message.lastIndexOf('\n');
    const extractedString = exception.message.substring(lastIndex + 1).trim();
    const httpAdapter = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    if (exception instanceof Prisma.PrismaClientRustPanicError) {
      httpStatus = 400;
      errorMessage = extractedString;
    } else if (exception instanceof Prisma.PrismaClientValidationError) {
      httpStatus = 422;
      errorMessage = extractedString;
    } else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      httpStatus = 400;
      errorMessage = extractedString;
    } else if (exception instanceof Prisma.PrismaClientUnknownRequestError) {
      httpStatus = 400;
      errorMessage = extractedString;
    } else if (exception instanceof Prisma.PrismaClientInitializationError) {
      httpStatus = 400;
      errorMessage = extractedString;
    } else if (
      exception.statusCode &&
      exception.statusCode >= 400 &&
      exception.statusCode <= 499
    ) {
      httpStatus = exception.statusCode;
      errorMessage = exception.message;
    } else {
      httpStatus = 500;
      errorMessage = [
        `${exception.message}  Sorry! something went to wrong on our end `,
      ];
    }
    const errorResponse = {
      status: httpStatus,
      errors: typeof errorMessage === 'string' ? [errorMessage] : errorMessage,
    };
    httpAdapter.reply(ctx.getResponse(), errorResponse, httpStatus);
  }
}
