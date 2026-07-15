/* tf-gateway/src/musicas/musicas.module.ts */
import { Module } from '@nestjs/common';
import { MusicasController } from './musicas.controller';
import { MusicasService } from './musicas.service';

@Module({
  controllers: [MusicasController],
  providers: [MusicasService],
})
export class MusicasModule {}
