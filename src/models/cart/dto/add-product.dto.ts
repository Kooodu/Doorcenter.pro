import { IsNumber, IsString } from 'class-validator'

export class AddProductToCartDto {
  @IsString()
  key: string

  @IsNumber()
  product: number

  @IsNumber()
  amount: number
}
