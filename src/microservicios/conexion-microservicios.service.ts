/* src/microservicios/conexion-microservicios.service.ts */
import {
  Inject,
  Injectable,
  Logger,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import {
  obtenerPuertoRequerido,
  obtenerTextoRequerido,
} from '../configuracion/entorno';
import { MICROSERVICIO_USUARIOS } from './microservicios.constants';

@Injectable()
export class ConexionMicroserviciosService
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private readonly logger = new Logger(ConexionMicroserviciosService.name);

  constructor(
    @Inject(MICROSERVICIO_USUARIOS)
    private readonly clienteUsuarios: ClientProxy,
    private readonly configService: ConfigService,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    const host = obtenerTextoRequerido(
      this.configService,
      'HOST_MICROSERVICIO_USUARIOS',
    );

    const puerto = obtenerPuertoRequerido(
      this.configService,
      'PUERTO_MICROSERVICIO_USUARIOS',
    );

    await this.clienteUsuarios.connect();

    this.logger.log(
      `Gateway conectado por TCP al Microservicio de Usuarios en ${host}:${puerto}`,
    );
  }

  async onApplicationShutdown(): Promise<void> {
    await this.clienteUsuarios.close();
  }
}
