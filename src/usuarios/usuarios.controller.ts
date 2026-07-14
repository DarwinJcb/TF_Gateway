/* src/usuarios/usuarios.controller.ts */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { UsuariosService } from './usuarios.service';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) { }

  @Post()
  create(
    @Body() createUsuarioDto: CreateUsuarioDto,
  ): Promise<unknown> {
    return this.usuariosService.create(createUsuarioDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(): Promise<unknown[]> {
    return this.usuariosService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) IdUsuario: number,
  ): Promise<unknown> {
    return this.usuariosService.findOne(IdUsuario);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) IdUsuario: number,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
  ): Promise<unknown> {
    return this.usuariosService.update(
      IdUsuario,
      updateUsuarioDto,
    );
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) IdUsuario: number,
  ): Promise<unknown> {
    return this.usuariosService.remove(IdUsuario);
  }
}