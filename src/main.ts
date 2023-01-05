import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {HttpExceptionFilter} from "../exception/http.exception.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 예외 필터 연결
  app.useGlobalFilters(new HttpExceptionFilter());

  app.enableCors();
  await app.listen(3000);
}
bootstrap();
