/* tf-gateway/src/configuracion/entorno.ts */
import { ConfigService } from '@nestjs/config';

export function obtenerTextoRequerido(
  configService: ConfigService,
  nombreVariable: string,
): string {
  const valor = configService.get<string>(nombreVariable);

  if (!valor || valor.trim().length === 0) {
    throw new Error(
      `La variable de entorno ${nombreVariable} no está definida.`,
    );
  }

  return valor.trim();
}

export function obtenerPuertoRequerido(
  configService: ConfigService,
  nombreVariable: string,
): number {
  const valor = obtenerTextoRequerido(configService, nombreVariable);
  const puerto = Number(valor);

  if (!Number.isInteger(puerto) || puerto < 1 || puerto > 65535) {
    throw new Error(
      `La variable ${nombreVariable} debe contener un puerto válido.`,
    );
  }

  return puerto;
}
