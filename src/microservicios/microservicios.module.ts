/* src/microservicios/microservicios.module.ts: */
import { Module } from '@nestjs/common';
import { MicroserviciosService } from './microservicios.service';
import { MicroserviciosController } from './microservicios.controller';

@Module({
  controllers: [MicroserviciosController],
  providers: [MicroserviciosService],
})
export class MicroserviciosModule { }
