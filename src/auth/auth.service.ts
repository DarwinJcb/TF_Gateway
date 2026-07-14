/* src/auth/auth.service.ts */
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { MICROSERVICIO_USUARIOS } from '../microservicios/microservicios.constants';
import { traducirErrorRpcAHttp } from '../microservicios/traducir-error-rpc';
import type { RespuestaLogin } from './auth.interfaces';
import { AUTH_PATTERNS } from './auth.patterns';
import { LoginDto } from './login.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(MICROSERVICIO_USUARIOS)
    private readonly clienteUsuarios: ClientProxy,
  ) { }

  async login(loginDto: LoginDto): Promise<RespuestaLogin> {
    try {
      return await firstValueFrom(
        this.clienteUsuarios.send<RespuestaLogin, LoginDto>(
          AUTH_PATTERNS.LOGIN,
          loginDto,
        ),
      );
    } catch (error: unknown) {
      throw traducirErrorRpcAHttp(error);
    }
  }
}