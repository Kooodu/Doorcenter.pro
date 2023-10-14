import { IsNumber, IsOptional, IsString, Min } from 'class-validator'
import { Transform, Type } from 'class-transformer'

export class FindProductDto {
  @IsOptional()
  @IsString()
  title?: string

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  minPrice?: number

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  maxPrice?: number

  @IsOptional()
  @IsString()
  article?: string

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  category?: number

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  fabricator?: number

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number
}
