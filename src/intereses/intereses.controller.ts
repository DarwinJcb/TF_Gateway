/* tf-gateway/src/intereses/intereses.controller.ts */
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
import { CreateInteresDto } from './dto/create-interes.dto';
import { UpdateInteresDto } from './dto/update-interes.dto';
import { InteresesService } from './intereses.service';

@Controller('intereses')
export class InteresesController {
  constructor(private readonly interesesService: InteresesService) {}

  @Post()
  create(@Body() createInteresDto: CreateInteresDto): Promise<unknown> {
    return this.interesesService.create(createInteresDto);
  }

  @Get()
  findAll(): Promise<unknown[]> {
    return this.interesesService.findAll();
  }

  @Get('usuario/:idUsuario')
  findByUsuario(
    @Param('idUsuario', ParseIntPipe) IdUsuario: number,
  ): Promise<unknown> {
    return this.interesesService.findByUsuario(IdUsuario);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) IdInteres: number): Promise<unknown> {
    return this.interesesService.findOne(IdInteres);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) IdInteres: number,
    @Body() updateInteresDto: UpdateInteresDto,
  ): Promise<unknown> {
    return this.interesesService.update(IdInteres, updateInteresDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) IdInteres: number): Promise<unknown> {
    return this.interesesService.remove(IdInteres);
  }
}
