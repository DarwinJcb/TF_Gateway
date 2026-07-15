/* tf-gateway/src/app.module.ts */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { FotosModule } from './fotos/fotos.module';
import { InteresesModule } from './intereses/intereses.module';
import { MicroserviciosModule } from './microservicios/microservicios.module';
import { UsuariosModule } from './usuarios/usuarios.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MicroserviciosModule,
    AuthModule,
    UsuariosModule,
    FotosModule,
    InteresesModule,
  ],
})
export class AppModule {}
