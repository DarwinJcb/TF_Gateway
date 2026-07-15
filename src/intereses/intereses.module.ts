/* tf-gateway/src/intereses/intereses.module.ts */
import { Module } from '@nestjs/common';
import { InteresesController } from './intereses.controller';
import { InteresesService } from './intereses.service';

@Module({
  controllers: [InteresesController],
  providers: [InteresesService],
})
export class InteresesModule {}
