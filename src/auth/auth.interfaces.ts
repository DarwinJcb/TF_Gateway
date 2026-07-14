/* src/auth/auth.interfaces.ts */
import type { Request } from 'express';

export interface JwtPayload {
  sub: number;
  correo: string;
}

export interface UsuarioAutenticado {
  IdUsuario: number;
  correo: string;
}

export interface RequestConUsuario extends Request {
  user: UsuarioAutenticado;
}

export interface RespuestaLogin {
  access_token: string;
}
