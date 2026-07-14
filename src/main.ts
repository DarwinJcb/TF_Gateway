/* tf-gateway/src/main.ts */
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  obtenerPuertoRequerido,
  obtenerTextoRequerido,
} from './configuracion/entorno';

const logger = new Logger('Gateway');

async function bootstrap(): Promise<void> {
  const aplicacion = await NestFactory.create(AppModule);

  aplicacion.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  aplicacion.enableShutdownHooks();

  const configService = aplicacion.get(ConfigService);

  const host = obtenerTextoRequerido(configService, 'HOST_GATEWAY');

  const puerto = obtenerPuertoRequerido(configService, 'PUERTO_GATEWAY');

  await aplicacion.listen(puerto, host);

  logger.log(`Gateway iniciado y escuchando por HTTP en ${host}:${puerto}`);
}

bootstrap().catch((error: unknown) => {
  const mensajeError = error instanceof Error ? error.message : String(error);

  const trazaError = error instanceof Error ? error.stack : undefined;

  logger.error(`No se pudo iniciar el Gateway: ${mensajeError}`, trazaError);

  process.exit(1);
});
