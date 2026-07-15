/* tf-gateway/src/fotos/fotos.service.ts */
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { MICROSERVICIO_USUARIOS } from '../microservicios/microservicios.constants';
import { traducirErrorRpcAHttp } from '../microservicios/traducir-error-rpc';
import { CreateFotoDto } from './dto/create-foto.dto';
import { UpdateFotoDto } from './dto/update-foto.dto';
import { FOTOS_PATTERNS } from './fotos.patterns';

interface IdFotoPayload {
  IdFoto: number;
}

interface IdUsuarioFotosPayload {
  IdUsuario: number;
}

interface ActualizarFotoPayload extends IdFotoPayload {
  datosFoto: UpdateFotoDto;
}

@Injectable()
export class FotosService {
  constructor(
    @Inject(MICROSERVICIO_USUARIOS)
    private readonly clienteUsuarios: ClientProxy,
  ) {}

  create(createFotoDto: CreateFotoDto): Promise<unknown> {
    return this.enviarSolicitud(FOTOS_PATTERNS.CREAR, createFotoDto);
  }

  findAll(): Promise<unknown[]> {
    return this.enviarSolicitud(FOTOS_PATTERNS.LISTAR, {});
  }

  findByUsuario(IdUsuario: number): Promise<unknown[]> {
    const payload: IdUsuarioFotosPayload = {
      IdUsuario,
    };

    return this.enviarSolicitud(FOTOS_PATTERNS.LISTAR_POR_USUARIO, payload);
  }

  findOne(IdFoto: number): Promise<unknown> {
    const payload: IdFotoPayload = {
      IdFoto,
    };

    return this.enviarSolicitud(FOTOS_PATTERNS.BUSCAR_POR_ID, payload);
  }

  update(IdFoto: number, updateFotoDto: UpdateFotoDto): Promise<unknown> {
    const payload: ActualizarFotoPayload = {
      IdFoto,
      datosFoto: updateFotoDto,
    };

    return this.enviarSolicitud(FOTOS_PATTERNS.ACTUALIZAR, payload);
  }

  remove(IdFoto: number): Promise<unknown> {
    const payload: IdFotoPayload = {
      IdFoto,
    };

    return this.enviarSolicitud(FOTOS_PATTERNS.ELIMINAR, payload);
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
