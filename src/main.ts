import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigModule } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './common/filter/respons-interceptors';

ConfigModule.forRoot({
  envFilePath: '.env',
});
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('api campaign')
    .setDescription('The campaign api description')
    .addTag('campaign')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.useGlobalInterceptors(new ResponseInterceptor());
  app.setGlobalPrefix('campaign_api');
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  const port = Number(process.env.PORT);
  const host = String(process.env.HOST);
  await app.listen(port, host);

  console.log(`Application is running on: http://${host}:${port}`)
}
bootstrap();
