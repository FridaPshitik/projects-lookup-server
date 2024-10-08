import { AppModule } from './app.module';
import { useContainer } from 'class-validator';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './exceptions/all-exception.filter';
import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  try {
    const app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter(),
    );

    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, transform: true }),
    );

    //exception-filter
    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new HttpExceptionFilter(httpAdapter));

    await app.listen(3000, '0.0.0.0');
  } catch (error) {
    Logger.error({ err: error });
    process.exit();
  }
}
bootstrap();
