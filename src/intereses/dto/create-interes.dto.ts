/* tf-gateway/src/intereses/dto/create-interes.dto.ts */
import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';

export enum SignoZodiacal {
  ARIES = 'ARIES',
  TAURO = 'TAURO',
  GEMINIS = 'GEMINIS',
  CANCER = 'CANCER',
  LEO = 'LEO',
  VIRGO = 'VIRGO',
  LIBRA = 'LIBRA',
  ESCORPIO = 'ESCORPIO',
  SAGITARIO = 'SAGITARIO',
  CAPRICORNIO = 'CAPRICORNIO',
  ACUARIO = 'ACUARIO',
  PISCIS = 'PISCIS',
}

export class CreateInteresDto {
  @IsOptional()
  @IsEnum(SignoZodiacal)
  signoZodiacal?: SignoZodiacal;

  @IsOptional()
  @IsString()
  queBusca?: string;

  @IsOptional()
  @IsString()
  ubicacion?: string;

  @IsOptional()
  @IsString()
  ciudad?: string;

  @IsOptional()
  @IsString()
  pais?: string;

  @IsOptional()
  @IsString()
  hobby?: string;

  @IsOptional()
  @IsString()
  dedicacion?: string;

  @IsInt()
  @Min(1)
  UsuarioFK!: number;
}
