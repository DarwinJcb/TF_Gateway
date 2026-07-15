/* tf-gateway/src/transmisiones/transmisiones.controller.ts */
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
import { CreateTransmisionDto } from './dto/create-transmision.dto';
import { UpdateTransmisionDto } from './dto/update-transmision.dto';
import { TransmisionesService } from './transmisiones.service';

@Controller('transmisiones')
export class TransmisionesController {
  constructor(private readonly transmisionesService: TransmisionesService) {}

  @Post()
  create(@Body() createTransmisionDto: CreateTransmisionDto): Promise<unknown> {
    return this.transmisionesService.create(createTransmisionDto);
  }

  @Get()
  findAll(): Promise<unknown[]> {
    return this.transmisionesService.findAll();
  }

  @Get('live')
  findLive(): Promise<unknown[]> {
    return this.transmisionesService.findLive();
  }

  @Get('usuario/:idUsuario')
  findByUsuario(
    @Param('idUsuario', ParseIntPipe) IdUsuario: number,
  ): Promise<unknown[]> {
    return this.transmisionesService.findByUsuario(IdUsuario);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) IdTransmision: number): Promise<unknown> {
    return this.transmisionesService.findOne(IdTransmision);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) IdTransmision: number,
    @Body() updateTransmisionDto: UpdateTransmisionDto,
  ): Promise<unknown> {
    return this.transmisionesService.update(
      IdTransmision,
      updateTransmisionDto,
    );
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) IdTransmision: number): Promise<unknown> {
    return this.transmisionesService.remove(IdTransmision);
  }
}
