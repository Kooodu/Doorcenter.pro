import { IsBoolean, IsNumber, IsString, IsUrl, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import { IsNonPrimitiveArray } from '../../../../core/decorators/nested-array.decorator'

export class UpdateProductDto {
  @IsNumber()
  product: number

  @IsString()
  title: string

  @IsNumber()
  category: number

  @IsNumber()
  price: number

  @IsNumber()
  fabricator: number

  @IsString()
  description: string
}
