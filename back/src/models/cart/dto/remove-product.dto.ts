import { IsNumber, IsString } from 'class-validator'

export class RemoveProductFromCartDto {
  @IsString()
  key: string

  @IsNumber()
  product: number

  @IsNumber()
  amount: number
}
