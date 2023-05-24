import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SimpleLoggerMiddleware } from './middleware/auth.middleware';
import { ScheduleController } from './schedule/schedule.controller';
import { ScheduleService } from './schedule/schedule.service';

@Module({
  imports: [],
  controllers: [AppController, ScheduleController],
  providers: [AppService, ScheduleService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SimpleLoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
