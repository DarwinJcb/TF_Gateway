/* tf-gateway/src/transmisiones/transmisiones.service.ts */
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { MICROSERVICIO_USUARIOS } from '../microservicios/microservicios.constants';
import { traducirErrorRpcAHttp } from '../microservicios/traducir-error-rpc';
import { CreateTransmisionDto } from './dto/create-transmision.dto';
import { UpdateTransmisionDto } from './dto/update-transmision.dto';
import { TRANSMISIONES_PATTERNS } from './transmisiones.patterns';

interface IdTransmisionPayload {
  IdTransmision: number;
}

interface IdUsuarioTransmisionesPayload {
  IdUsuario: number;
}

interface ActualizarTransmisionPayload extends IdTransmisionPayload {
  datosTransmision: UpdateTransmisionDto;
}

@Injectable()
export class TransmisionesService {
  constructor(
    @Inject(MICROSERVICIO_USUARIOS)
    private readonly clienteUsuarios: ClientProxy,
  ) {}

  create(createTransmisionDto: CreateTransmisionDto): Promise<unknown> {
    return this.enviarSolicitud(
      TRANSMISIONES_PATTERNS.CREAR,
      createTransmisionDto,
    );
  }

  findAll(): Promise<unknown[]> {
    return this.enviarSolicitud(TRANSMISIONES_PATTERNS.LISTAR, {});
  }

  findLive(): Promise<unknown[]> {
    return this.enviarSolicitud(TRANSMISIONES_PATTERNS.LISTAR_LIVE, {});
  }

  findByUsuario(IdUsuario: number): Promise<unknown[]> {
    const payload: IdUsuarioTransmisionesPayload = {
      IdUsuario,
    };

    return this.enviarSolicitud(
      TRANSMISIONES_PATTERNS.LISTAR_POR_USUARIO,
      payload,
    );
  }

  findOne(IdTransmision: number): Promise<unknown> {
    const payload: IdTransmisionPayload = {
      IdTransmision,
    };

    return this.enviarSolicitud(TRANSMISIONES_PATTERNS.BUSCAR_POR_ID, payload);
  }

  update(
    IdTransmision: number,
    updateTransmisionDto: UpdateTransmisionDto,
  ): Promise<unknown> {
    const payload: ActualizarTransmisionPayload = {
      IdTransmision,
      datosTransmision: updateTransmisionDto,
    };

    return this.enviarSolicitud(TRANSMISIONES_PATTERNS.ACTUALIZAR, payload);
  }

  remove(IdTransmision: number): Promise<unknown> {
    const payload: IdTransmisionPayload = {
      IdTransmision,
    };

    return this.enviarSolicitud(TRANSMISIONES_PATTERNS.ELIMINAR, payload);
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
