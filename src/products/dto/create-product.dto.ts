import { Type } from 'class-transformer';
import { IsString, IsNumber, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;
  @IsNumber({
    maxDecimalPlaces: 2,
  })
  @Min(0)
  @Type(() => Number)
  price: number;
  @IsNumber()
  @Type(() => Number)
  stock: number;
  @IsString()
  description: string;
}
