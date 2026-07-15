/* tf-gateway/src/ubicaciones/ubicaciones.controller.ts */
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
import { CreateUbicacionDto } from './dto/create-ubicacion.dto';
import { UpdateUbicacionDto } from './dto/update-ubicacion.dto';
import { UbicacionesService } from './ubicaciones.service';

@Controller('ubicaciones')
export class UbicacionesController {
  constructor(private readonly ubicacionesService: UbicacionesService) {}

  @Post()
  create(@Body() createUbicacionDto: CreateUbicacionDto): Promise<unknown> {
    return this.ubicacionesService.create(createUbicacionDto);
  }

  @Get()
  findAll(): Promise<unknown[]> {
    return this.ubicacionesService.findAll();
  }

  @Get('usuario/:idUsuario')
  findByUsuario(
    @Param('idUsuario', ParseIntPipe) IdUsuario: number,
  ): Promise<unknown[]> {
    return this.ubicacionesService.findByUsuario(IdUsuario);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) IdUbicacion: number): Promise<unknown> {
    return this.ubicacionesService.findOne(IdUbicacion);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) IdUbicacion: number,
    @Body() updateUbicacionDto: UpdateUbicacionDto,
  ): Promise<unknown> {
    return this.ubicacionesService.update(IdUbicacion, updateUbicacionDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) IdUbicacion: number): Promise<unknown> {
    return this.ubicacionesService.remove(IdUbicacion);
  }
}
