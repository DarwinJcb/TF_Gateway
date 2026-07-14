/* tf-gateway/src/auth/auth.controller.ts */
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import type {
  RequestConUsuario,
  RespuestaLogin,
  UsuarioAutenticado,
} from './auth.interfaces';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LoginDto } from './login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() loginDto: LoginDto): Promise<RespuestaLogin> {
    return this.authService.login(loginDto);
  }

  @Get('perfil')
  @UseGuards(JwtAuthGuard)
  obtenerPerfil(@Req() request: RequestConUsuario): UsuarioAutenticado {
    return request.user;
  }
}
