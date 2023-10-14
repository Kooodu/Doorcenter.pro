import { IsNumber, IsUrl } from 'class-validator'

export class UpdateImageDto {
  @IsNumber()
  image: number

  @IsUrl()
  link: string
}
