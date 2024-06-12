import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs/promises';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Fission Dashboard Spec')
      .setDescription('The Fission Dashboard Spec API description')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    await fs.writeFile(
      path.join(__dirname, '../generated', 'swagger.json'),
      JSON.stringify(document, null, 2),
    );
    SwaggerModule.setup('api', app, document);
  }
  
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
