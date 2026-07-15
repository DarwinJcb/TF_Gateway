/* tf-gateway/src/donaciones/donaciones.service.ts */
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { MICROSERVICIO_USUARIOS } from '../microservicios/microservicios.constants';
import { traducirErrorRpcAHttp } from '../microservicios/traducir-error-rpc';
import { CreateDonacionDto } from './dto/create-donacion.dto';
import { UpdateDonacionDto } from './dto/update-donacion.dto';
import { DONACIONES_PATTERNS } from './donaciones.patterns';

interface IdDonacionPayload {
  IdDonacion: number;
}

interface IdUsuarioDonacionesPayload {
  IdUsuario: number;
}

interface IdTransmisionDonacionesPayload {
  IdTransmision: number;
}

interface ActualizarDonacionPayload extends IdDonacionPayload {
  datosDonacion: UpdateDonacionDto;
}

@Injectable()
export class DonacionesService {
  constructor(
    @Inject(MICROSERVICIO_USUARIOS)
    private readonly clienteUsuarios: ClientProxy,
  ) {}

  create(createDonacionDto: CreateDonacionDto): Promise<unknown> {
    return this.enviarSolicitud(DONACIONES_PATTERNS.CREAR, createDonacionDto);
  }

  findAll(): Promise<unknown[]> {
    return this.enviarSolicitud(DONACIONES_PATTERNS.LISTAR, {});
  }

  findByDonante(IdUsuario: number): Promise<unknown[]> {
    const payload: IdUsuarioDonacionesPayload = {
      IdUsuario,
    };

    return this.enviarSolicitud(
      DONACIONES_PATTERNS.LISTAR_POR_DONANTE,
      payload,
    );
  }

  findByReceptor(IdUsuario: number): Promise<unknown[]> {
    const payload: IdUsuarioDonacionesPayload = {
      IdUsuario,
    };

    return this.enviarSolicitud(
      DONACIONES_PATTERNS.LISTAR_POR_RECEPTOR,
      payload,
    );
  }

  findByTransmision(IdTransmision: number): Promise<unknown[]> {
    const payload: IdTransmisionDonacionesPayload = {
      IdTransmision,
    };

    return this.enviarSolicitud(
      DONACIONES_PATTERNS.LISTAR_POR_TRANSMISION,
      payload,
    );
  }

  findOne(IdDonacion: number): Promise<unknown> {
    const payload: IdDonacionPayload = {
      IdDonacion,
    };

    return this.enviarSolicitud(DONACIONES_PATTERNS.BUSCAR_POR_ID, payload);
  }

  update(
    IdDonacion: number,
    updateDonacionDto: UpdateDonacionDto,
  ): Promise<unknown> {
    const payload: ActualizarDonacionPayload = {
      IdDonacion,
      datosDonacion: updateDonacionDto,
    };

    return this.enviarSolicitud(DONACIONES_PATTERNS.ACTUALIZAR, payload);
  }

  remove(IdDonacion: number): Promise<unknown> {
    const payload: IdDonacionPayload = {
      IdDonacion,
    };

    return this.enviarSolicitud(DONACIONES_PATTERNS.ELIMINAR, payload);
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
