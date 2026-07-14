/* src/app.module.ts: */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MicroserviciosModule } from './microservicios/microservicios.module';

@Module({
  imports: [MicroserviciosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
