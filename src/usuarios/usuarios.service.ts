/* tf-gateway/src/usuarios/usuarios.service.ts */
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { MICROSERVICIO_USUARIOS } from '../microservicios/microservicios.constants';
import { traducirErrorRpcAHttp } from '../microservicios/traducir-error-rpc';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { USUARIOS_PATTERNS } from './usuarios.patterns';

interface IdUsuarioPayload {
  IdUsuario: number;
}

interface ActualizarUsuarioPayload extends IdUsuarioPayload {
  datosUsuario: UpdateUsuarioDto;
}

@Injectable()
export class UsuariosService {
  constructor(
    @Inject(MICROSERVICIO_USUARIOS)
    private readonly clienteUsuarios: ClientProxy,
  ) {}

  create(createUsuarioDto: CreateUsuarioDto): Promise<unknown> {
    return this.enviarSolicitud(USUARIOS_PATTERNS.CREAR, createUsuarioDto);
  }

  findAll(): Promise<unknown[]> {
    return this.enviarSolicitud(USUARIOS_PATTERNS.LISTAR, {});
  }

  findOne(IdUsuario: number): Promise<unknown> {
    const payload: IdUsuarioPayload = {
      IdUsuario,
    };

    return this.enviarSolicitud(USUARIOS_PATTERNS.BUSCAR_POR_ID, payload);
  }

  update(
    IdUsuario: number,
    updateUsuarioDto: UpdateUsuarioDto,
  ): Promise<unknown> {
    const payload: ActualizarUsuarioPayload = {
      IdUsuario,
      datosUsuario: updateUsuarioDto,
    };

    return this.enviarSolicitud(USUARIOS_PATTERNS.ACTUALIZAR, payload);
  }

  remove(IdUsuario: number): Promise<unknown> {
    const payload: IdUsuarioPayload = {
      IdUsuario,
    };

    return this.enviarSolicitud(USUARIOS_PATTERNS.ELIMINAR, payload);
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
