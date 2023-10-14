import { IsNumber, IsString } from 'class-validator'

export class UpdateParameterDto {
  @IsNumber()
  parameter: number

  @IsString()
  key: string

  @IsString()
  value: string
}
