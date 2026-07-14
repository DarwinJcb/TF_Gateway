/* tf-gateway/src/auth/jwt.strategy.ts */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import type { JwtPayload, UsuarioAutenticado } from './auth.interfaces';

function obtenerSecretoJwt(configService: ConfigService): string {
  const secretoJwt = configService.get<string>('JWT_SECRET');

  if (!secretoJwt || secretoJwt.trim().length === 0) {
    throw new Error('La variable de entorno JWT_SECRET no está definida.');
  }

  return secretoJwt;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: obtenerSecretoJwt(configService),
    });
  }

  validate(payload: JwtPayload): UsuarioAutenticado {
    return {
      IdUsuario: payload.sub,
      correo: payload.correo,
    };
  }
}
