
// import { Catch, HttpException } from '@nestjs/common';

// @Catch(HttpException)
// export class HttpExceptionFilter {
//   catch(exception, host) {
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse();
//     const request = ctx.getRequest();
//     const status = exception.getStatus();
//     const message=exception.message

//     response
//       .status(status)
//       .json({
//         statusCode: status,
//         timestamp: new Date().toISOString(),
//         message:message,
//         // path: request.url,
//       });
//   }
// }
// import { FastifyError } from 'fastify';
import { AbstractHttpAdapter } from '@nestjs/core';
import { Catch, ArgumentsHost, ExceptionFilter ,HttpException} from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: AbstractHttpAdapter) {}
  catch(exception:HttpException , host: ArgumentsHost): void {
    // let errorMessage: unknown;
    let httpStatus: number;
    const lastIndex = exception.message.lastIndexOf('\n');
    const extractedString = exception.message.substring(lastIndex + 1).trim();
    let errorMessage = extractedString;
    const httpAdapter = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    if (exception instanceof Prisma.PrismaClientRustPanicError) {
      httpStatus = 400;
    //   errorMessage = extractedString;
    } else if (exception instanceof Prisma.PrismaClientValidationError) {
      httpStatus = 422;
    //   errorMessage = extractedString;
    } else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      httpStatus = 400;
    //   errorMessage = extractedString;
    } else if (exception instanceof Prisma.PrismaClientUnknownRequestError) {
      httpStatus = 400;
    //   errorMessage = extractedString;
    } else if (exception instanceof Prisma.PrismaClientInitializationError) {
      httpStatus = 400;
    //   errorMessage = extractedString;
    } else if (
      exception.getStatus() &&
      exception.getStatus() >= 400 &&
      exception.getStatus() <= 499
    ) {
      httpStatus = exception.getStatus();
      errorMessage = exception.message;
    } else {
      httpStatus = 500;
      errorMessage = `${exception.message}  Sorry! something went to wrong on our end `;
    }
    const errorResponse = {
      status: httpStatus,
      // error: typeof errorMessage === 'string' ? [errorMessage] : errorMessage,
      error: errorMessage,
    };
    console.log(errorResponse);
    httpAdapter.reply(ctx.getResponse(), errorResponse, httpStatus);
  }
}
