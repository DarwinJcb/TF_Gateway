/* src/microservicios/microservicios.module.ts */
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  ClientOptions,
  ClientsModule,
  Transport,
} from '@nestjs/microservices';
import {
  obtenerPuertoRequerido,
  obtenerTextoRequerido,
} from '../configuracion/entorno';
import { ConexionMicroserviciosService } from './conexion-microservicios.service';
import { MICROSERVICIO_USUARIOS } from './microservicios.constants';

@Global()
@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: MICROSERVICIO_USUARIOS,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (
          configService: ConfigService,
        ): ClientOptions => ({
          transport: Transport.TCP,
          options: {
            host: obtenerTextoRequerido(
              configService,
              'HOST_MICROSERVICIO_USUARIOS',
            ),
            port: obtenerPuertoRequerido(
              configService,
              'PUERTO_MICROSERVICIO_USUARIOS',
            ),
          },
        }),
      },
    ]),
  ],
  providers: [ConexionMicroserviciosService],
  exports: [ClientsModule],
})
export class MicroserviciosModule { }