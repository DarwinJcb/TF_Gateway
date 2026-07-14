/* src/microservicios/microservicios.controller.ts: */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MicroserviciosService } from './microservicios.service';

@Controller('microservicios')
export class MicroserviciosController {
  constructor(private readonly microserviciosService: MicroserviciosService) { }

  @Get()
  findAll() {
    return this.microserviciosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.microserviciosService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.microserviciosService.remove(+id);
  }
}
