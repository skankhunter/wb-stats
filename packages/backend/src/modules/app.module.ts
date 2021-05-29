import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { ConfigModule } from 'src/config/config.module';
import { LoggerModule } from 'src/logger/logger.module';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { FirebaseAuthService } from 'src/services/firebase.service';
import { AuthController } from 'src/controllers/auth.controller';

import 'dotenv/config';


@Module({
  imports: [
    ConfigModule,
    LoggerModule],
  controllers: [AppController, AuthController],
  providers: [AppService, FirebaseAuthService],
  exports: [FirebaseAuthService],
})

export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({path: '/api/v1', method: RequestMethod.ALL});
  }
}
