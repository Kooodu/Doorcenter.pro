import { IsNumber, IsUrl } from 'class-validator'

export class CreateImageDto {
  @IsNumber()
  product: number

  @IsUrl()
  link: string
}
