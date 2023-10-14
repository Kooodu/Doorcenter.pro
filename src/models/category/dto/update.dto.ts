import { IsNumber, IsString, IsUrl } from 'class-validator'

export class UpdateCategoryDto {
  @IsNumber()
  category: number

  @IsString()
  title: string

  @IsUrl()
  image: string

  @IsUrl()
  icon: string
}
