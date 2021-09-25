import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';

const PORT = process.env.PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
}
bootstrap();