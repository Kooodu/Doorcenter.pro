import { IsNumber, IsString, IsUrl } from 'class-validator'

export class CreateFabricatorDto {
  @IsString()
  title: string

  @IsNumber()
  category: number

  @IsUrl()
  image: string
}
