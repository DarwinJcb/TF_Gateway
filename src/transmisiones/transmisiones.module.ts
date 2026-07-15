/* tf-gateway/src/transmisiones/transmisiones.module.ts */
import { Module } from '@nestjs/common';
import { TransmisionesController } from './transmisiones.controller';
import { TransmisionesService } from './transmisiones.service';

@Module({
  controllers: [TransmisionesController],
  providers: [TransmisionesService],
})
export class TransmisionesModule {}
