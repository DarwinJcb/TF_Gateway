/* tf-gateway/src/intereses/intereses.service.ts */
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { MICROSERVICIO_USUARIOS } from '../microservicios/microservicios.constants';
import { traducirErrorRpcAHttp } from '../microservicios/traducir-error-rpc';
import { CreateInteresDto } from './dto/create-interes.dto';
import { UpdateInteresDto } from './dto/update-interes.dto';
import { INTERESES_PATTERNS } from './intereses.patterns';

interface IdInteresPayload {
  IdInteres: number;
}

interface IdUsuarioInteresesPayload {
  IdUsuario: number;
}

interface ActualizarInteresPayload extends IdInteresPayload {
  datosInteres: UpdateInteresDto;
}

@Injectable()
export class InteresesService {
  constructor(
    @Inject(MICROSERVICIO_USUARIOS)
    private readonly clienteUsuarios: ClientProxy,
  ) {}

  create(createInteresDto: CreateInteresDto): Promise<unknown> {
    return this.enviarSolicitud(INTERESES_PATTERNS.CREAR, createInteresDto);
  }

  findAll(): Promise<unknown[]> {
    return this.enviarSolicitud(INTERESES_PATTERNS.LISTAR, {});
  }

  findByUsuario(IdUsuario: number): Promise<unknown> {
    const payload: IdUsuarioInteresesPayload = {
      IdUsuario,
    };

    return this.enviarSolicitud(INTERESES_PATTERNS.BUSCAR_POR_USUARIO, payload);
  }

  findOne(IdInteres: number): Promise<unknown> {
    const payload: IdInteresPayload = {
      IdInteres,
    };

    return this.enviarSolicitud(INTERESES_PATTERNS.BUSCAR_POR_ID, payload);
  }

  update(
    IdInteres: number,
    updateInteresDto: UpdateInteresDto,
  ): Promise<unknown> {
    const payload: ActualizarInteresPayload = {
      IdInteres,
      datosInteres: updateInteresDto,
    };

    return this.enviarSolicitud(INTERESES_PATTERNS.ACTUALIZAR, payload);
  }

  remove(IdInteres: number): Promise<unknown> {
    const payload: IdInteresPayload = {
      IdInteres,
    };

    return this.enviarSolicitud(INTERESES_PATTERNS.ELIMINAR, payload);
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
