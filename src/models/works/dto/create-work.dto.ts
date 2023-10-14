import { IsString, IsUrl } from 'class-validator'

export class CreateWorkDto {
  @IsUrl()
  video: string

  @IsString()
  photo: string

  @IsString()
  text: string
}
