/* tf-gateway/src/ubicaciones/ubicaciones.service.ts */
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { MICROSERVICIO_USUARIOS } from '../microservicios/microservicios.constants';
import { traducirErrorRpcAHttp } from '../microservicios/traducir-error-rpc';
import { CreateUbicacionDto } from './dto/create-ubicacion.dto';
import { UpdateUbicacionDto } from './dto/update-ubicacion.dto';
import { UBICACIONES_PATTERNS } from './ubicaciones.patterns';

interface IdUbicacionPayload {
  IdUbicacion: number;
}

interface IdUsuarioUbicacionesPayload {
  IdUsuario: number;
}

interface ActualizarUbicacionPayload extends IdUbicacionPayload {
  datosUbicacion: UpdateUbicacionDto;
}

@Injectable()
export class UbicacionesService {
  constructor(
    @Inject(MICROSERVICIO_USUARIOS)
    private readonly clienteUsuarios: ClientProxy,
  ) {}

  create(createUbicacionDto: CreateUbicacionDto): Promise<unknown> {
    return this.enviarSolicitud(UBICACIONES_PATTERNS.CREAR, createUbicacionDto);
  }

  findAll(): Promise<unknown[]> {
    return this.enviarSolicitud(UBICACIONES_PATTERNS.LISTAR, {});
  }

  findByUsuario(IdUsuario: number): Promise<unknown[]> {
    const payload: IdUsuarioUbicacionesPayload = {
      IdUsuario,
    };

    return this.enviarSolicitud(
      UBICACIONES_PATTERNS.LISTAR_POR_USUARIO,
      payload,
    );
  }

  findOne(IdUbicacion: number): Promise<unknown> {
    const payload: IdUbicacionPayload = {
      IdUbicacion,
    };

    return this.enviarSolicitud(UBICACIONES_PATTERNS.BUSCAR_POR_ID, payload);
  }

  update(
    IdUbicacion: number,
    updateUbicacionDto: UpdateUbicacionDto,
  ): Promise<unknown> {
    const payload: ActualizarUbicacionPayload = {
      IdUbicacion,
      datosUbicacion: updateUbicacionDto,
    };

    return this.enviarSolicitud(UBICACIONES_PATTERNS.ACTUALIZAR, payload);
  }

  remove(IdUbicacion: number): Promise<unknown> {
    const payload: IdUbicacionPayload = {
      IdUbicacion,
    };

    return this.enviarSolicitud(UBICACIONES_PATTERNS.ELIMINAR, payload);
  }

  private async enviarSolicitud<Respuesta, Solicitud>(
    patron: string,
    solicitud: Solicitud,
  ): Promise<Respuesta> {
    try {
      return await firstValueFrom(
        this.clienteUsuarios.send<Respuesta, Solicitud>(patron, solicitud),
      );
    } catch (error: unknown) {
      throw traducirErrorRpcAHttp(error);
    }
  }
}
