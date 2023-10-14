import { IsString, IsUrl } from 'class-validator'

export class CreateCategoryDto {
  @IsString()
  title: string

  @IsUrl()
  image: string

  @IsUrl()
  icon: string
}
