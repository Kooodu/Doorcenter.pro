import { IsBoolean, IsNumber, IsString, IsUrl, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import { IsNonPrimitiveArray } from '../../../../core/decorators/nested-array.decorator'

export class CreateProductDto {
  @IsString()
  title: string

  @IsString()
  article: string

  @IsNumber()
  category: number

  @IsNumber()
  price: number

  @IsNumber()
  fabricator: number

  @IsString()
  description: string

  @ValidateNested()
  @IsNonPrimitiveArray()
  @Type(() => CreateProductImageDto)
  images: Array<CreateProductImageDto>

  @ValidateNested()
  @IsNonPrimitiveArray()
  @Type(() => CreateProductParamDto)
  parameters: Array<CreateProductParamDto>
}

export class CreateProductImageDto {
  @IsUrl()
  link: string
}

export class CreateProductParamDto {
  @IsString()
  key: string

  @IsString()
  value: string
}
