/* tf-gateway/src/fotos/fotos.controller.ts */
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
import { CreateFotoDto } from './dto/create-foto.dto';
import { UpdateFotoDto } from './dto/update-foto.dto';
import { FotosService } from './fotos.service';

@Controller('fotos')
export class FotosController {
  constructor(private readonly fotosService: FotosService) {}

  @Post()
  create(@Body() createFotoDto: CreateFotoDto): Promise<unknown> {
    return this.fotosService.create(createFotoDto);
  }

  @Get()
  findAll(): Promise<unknown[]> {
    return this.fotosService.findAll();
  }

  @Get('usuario/:idUsuario')
  findByUsuario(
    @Param('idUsuario', ParseIntPipe) IdUsuario: number,
  ): Promise<unknown[]> {
    return this.fotosService.findByUsuario(IdUsuario);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) IdFoto: number): Promise<unknown> {
    return this.fotosService.findOne(IdFoto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) IdFoto: number,
    @Body() updateFotoDto: UpdateFotoDto,
  ): Promise<unknown> {
    return this.fotosService.update(IdFoto, updateFotoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) IdFoto: number): Promise<unknown> {
    return this.fotosService.remove(IdFoto);
  }
}
