/* src/app.module.ts: */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { MicroserviciosModule } from './microservicios/microservicios.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MicroserviciosModule,
    AuthModule,
  ],
})
export class AppModule { }