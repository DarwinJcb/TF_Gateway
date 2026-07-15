/* tf-gateway/src/donaciones/donaciones.controller.ts */
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
import { CreateDonacionDto } from './dto/create-donacion.dto';
import { UpdateDonacionDto } from './dto/update-donacion.dto';
import { DonacionesService } from './donaciones.service';

@Controller('donaciones')
export class DonacionesController {
  constructor(private readonly donacionesService: DonacionesService) {}

  @Post()
  create(@Body() createDonacionDto: CreateDonacionDto): Promise<unknown> {
    return this.donacionesService.create(createDonacionDto);
  }

  @Get()
  findAll(): Promise<unknown[]> {
    return this.donacionesService.findAll();
  }

  @Get('donante/:idUsuario')
  findByDonante(
    @Param('idUsuario', ParseIntPipe) IdUsuario: number,
  ): Promise<unknown[]> {
    return this.donacionesService.findByDonante(IdUsuario);
  }

  @Get('receptor/:idUsuario')
  findByReceptor(
    @Param('idUsuario', ParseIntPipe) IdUsuario: number,
  ): Promise<unknown[]> {
    return this.donacionesService.findByReceptor(IdUsuario);
  }

  @Get('transmision/:idTransmision')
  findByTransmision(
    @Param('idTransmision', ParseIntPipe)
    IdTransmision: number,
  ): Promise<unknown[]> {
    return this.donacionesService.findByTransmision(IdTransmision);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) IdDonacion: number): Promise<unknown> {
    return this.donacionesService.findOne(IdDonacion);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) IdDonacion: number,
    @Body() updateDonacionDto: UpdateDonacionDto,
  ): Promise<unknown> {
    return this.donacionesService.update(IdDonacion, updateDonacionDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) IdDonacion: number): Promise<unknown> {
    return this.donacionesService.remove(IdDonacion);
  }
}
