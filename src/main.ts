import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomValidationPipe } from './common/pipes/validation.pipe';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('MAIN');

  app.useGlobalPipes(new CustomValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Boilerplate')
    .setDescription('NestJS Boilerplate')
    .setVersion('1.0')
    .addTag('User')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(process.env.NODE_PORT, () => {
    logger.verbose(`Server is running on port ${process.env.NODE_PORT}`);
  });
}
bootstrap();
