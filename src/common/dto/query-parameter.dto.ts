import { IsNumber,IsOptional,IsPositive,Min, } from 'class-validator';  

export class ParametersPokemon {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Min(1)
  limit?: number;
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Min(0)
  offset?: number;
}