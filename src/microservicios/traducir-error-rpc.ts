/* src/microservicios/traducir-error-rpc.ts */
import { HttpException, HttpStatus } from '@nestjs/common';

type MensajeError = string | string[];

function esRegistro(valor: unknown): valor is Record<string, unknown> {
  return typeof valor === 'object' && valor !== null;
}

function esCodigoHttpValido(valor: unknown): valor is number {
  return (
    typeof valor === 'number' &&
    Number.isInteger(valor) &&
    valor >= 100 &&
    valor <= 599
  );
}

function esMensajeValido(valor: unknown): valor is MensajeError {
  if (typeof valor === 'string') {
    return true;
  }

  return (
    Array.isArray(valor) &&
    valor.every((elemento) => typeof elemento === 'string')
  );
}

export function traducirErrorRpcAHttp(error: unknown): HttpException {
  if (error instanceof HttpException) {
    return error;
  }

  if (esRegistro(error) && esCodigoHttpValido(error.statusCode)) {
    const statusCode = error.statusCode;

    const message = esMensajeValido(error.message)
      ? error.message
      : 'No se pudo procesar la solicitud.';

    const nombreError = typeof error.error === 'string' ? error.error : 'Error';

    return new HttpException(
      {
        statusCode,
        message,
        error: nombreError,
      },
      statusCode,
    );
  }

  return new HttpException(
    {
      statusCode: HttpStatus.SERVICE_UNAVAILABLE,
      message: 'No fue posible comunicarse con el microservicio de usuarios.',
      error: 'Service Unavailable',
    },
    HttpStatus.SERVICE_UNAVAILABLE,
  );
}
