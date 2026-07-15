/* tf-gateway/src/musicas/musicas.service.ts */
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { MICROSERVICIO_USUARIOS } from '../microservicios/microservicios.constants';
import { traducirErrorRpcAHttp } from '../microservicios/traducir-error-rpc';
import { CreateMusicaDto } from './dto/create-musica.dto';
import { UpdateMusicaDto } from './dto/update-musica.dto';
import { MUSICAS_PATTERNS } from './musicas.patterns';

interface IdMusicaPayload {
  IdMusica: number;
}

interface IdUsuarioMusicasPayload {
  IdUsuario: number;
}

interface ActualizarMusicaPayload extends IdMusicaPayload {
  datosMusica: UpdateMusicaDto;
}

@Injectable()
export class MusicasService {
  constructor(
    @Inject(MICROSERVICIO_USUARIOS)
    private readonly clienteUsuarios: ClientProxy,
  ) {}

  create(createMusicaDto: CreateMusicaDto): Promise<unknown> {
    return this.enviarSolicitud(MUSICAS_PATTERNS.CREAR, createMusicaDto);
  }

  findAll(): Promise<unknown[]> {
    return this.enviarSolicitud(MUSICAS_PATTERNS.LISTAR, {});
  }

  findByUsuario(IdUsuario: number): Promise<unknown[]> {
    const payload: IdUsuarioMusicasPayload = {
      IdUsuario,
    };

    return this.enviarSolicitud(MUSICAS_PATTERNS.LISTAR_POR_USUARIO, payload);
  }

  findOne(IdMusica: number): Promise<unknown> {
    const payload: IdMusicaPayload = {
      IdMusica,
    };

    return this.enviarSolicitud(MUSICAS_PATTERNS.BUSCAR_POR_ID, payload);
  }

  update(IdMusica: number, updateMusicaDto: UpdateMusicaDto): Promise<unknown> {
    const payload: ActualizarMusicaPayload = {
      IdMusica,
      datosMusica: updateMusicaDto,
    };

    return this.enviarSolicitud(MUSICAS_PATTERNS.ACTUALIZAR, payload);
  }

  remove(IdMusica: number): Promise<unknown> {
    const payload: IdMusicaPayload = {
      IdMusica,
    };

    return this.enviarSolicitud(MUSICAS_PATTERNS.ELIMINAR, payload);
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
