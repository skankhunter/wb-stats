import { NestApplicationOptions } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';

import { ConfigService } from './config/config.service';
import { Logger } from './logger/logger';
import { createDocument } from './swagger/swagger';
import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';
import { AppModule } from './modules/app.module';
dotenv.config();

const NEST_LOGGING = false;
async function bootstrap() {
  const opts: NestApplicationOptions = {};

  if (!NEST_LOGGING) { 
    opts.logger = false
  }

  admin.initializeApp({
    credential: admin.credential.cert({
      private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      project_id: process.env.FIREBASE_PROJECT_ID
    } as Partial<admin.ServiceAccount>),
    databaseURL: process.env.FIREBASE_DATABASE_URL
  });

  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(Logger));

  const configService = app.get(ConfigService);

  SwaggerModule.setup('api/v1', app, createDocument(app));

  await app.listen(configService.get().port);

}
export default admin;
bootstrap();
