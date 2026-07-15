/* tf-gateway/src/transmisiones/dto/update-transmision.dto.ts */
import { IsEnum } from 'class-validator';

export enum EstadoTransmision {
  LIVE = 'LIVE',
  FINALIZADA = 'FINALIZADA',
}

export class UpdateTransmisionDto {
  @IsEnum(EstadoTransmision)
  estado!: EstadoTransmision;
}
