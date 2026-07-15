/* tf-gateway/src/musicas/musicas.controller.ts */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateMusicaDto } from './dto/create-musica.dto';
import { UpdateMusicaDto } from './dto/update-musica.dto';
import { MusicasService } from './musicas.service';

@Controller('musicas')
export class MusicasController {
  constructor(private readonly musicasService: MusicasService) {}

  @Post()
  create(@Body() createMusicaDto: CreateMusicaDto): Promise<unknown> {
    return this.musicasService.create(createMusicaDto);
  }

  @Get()
  findAll(): Promise<unknown[]> {
    return this.musicasService.findAll();
  }

  @Get('usuario/:idUsuario')
  findByUsuario(
    @Param('idUsuario', ParseIntPipe) IdUsuario: number,
  ): Promise<unknown[]> {
    return this.musicasService.findByUsuario(IdUsuario);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) IdMusica: number): Promise<unknown> {
    return this.musicasService.findOne(IdMusica);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) IdMusica: number,
    @Body() updateMusicaDto: UpdateMusicaDto,
  ): Promise<unknown> {
    return this.musicasService.update(IdMusica, updateMusicaDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) IdMusica: number): Promise<unknown> {
    return this.musicasService.remove(IdMusica);
  }
}
