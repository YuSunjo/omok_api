import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './exception/http.exception.filter';
import { setupSwagger } from './configs/swagger/swagger.config';
import { initializeTransactionalContext } from 'typeorm-transactional';

async function bootstrap() {
  initializeTransactionalContext();
  const app = await NestFactory.create(AppModule, {
    abortOnError: true,
  });

  // 예외 필터 연결
  app.useGlobalFilters(new HttpExceptionFilter());

  app.enableCors();
  setupSwagger(app);
  await app.listen(3000);
}
bootstrap();
