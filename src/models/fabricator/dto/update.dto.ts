import { IsNumber, IsString, IsUrl } from 'class-validator'

export class UpdateFabricatorDto {
  @IsNumber()
  fabricator: number

  @IsString()
  title: string

  @IsUrl()
  image: string
}
