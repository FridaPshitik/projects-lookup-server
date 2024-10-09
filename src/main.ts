import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './exceptions/http-exception.filter'
import { useContainer } from 'class-validator';


async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, transform: true }),
    );

    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new HttpExceptionFilter(httpAdapter));
    app.enableCors();
    await app.listen(8000);
  } catch (error) {
    Logger.error({ err: error });
    process.exit();
  }
}
bootstrap();
