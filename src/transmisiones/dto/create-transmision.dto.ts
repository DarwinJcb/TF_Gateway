/* tf-gateway/src/transmisiones/dto/create-transmision.dto.ts */
import { IsInt, Min } from 'class-validator';

export class CreateTransmisionDto {
  @IsInt()
  @Min(1)
  UsuarioFK!: number;
}
