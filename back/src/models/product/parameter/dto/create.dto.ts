import { IsNumber, IsString } from 'class-validator'

export class CreateParameterDto {
  @IsNumber()
  product: number

  @IsString()
  key: string

  @IsString()
  value: string
}
