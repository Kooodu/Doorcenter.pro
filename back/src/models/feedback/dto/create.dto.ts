import { IsEmail, IsString } from 'class-validator'

export class CreateFeedbackDto {
  @IsString()
  fullname: string

  @IsString()
  phone: string
}
