import { IsEmail, IsEnum, IsObject, IsString } from 'class-validator'
import { OrderTypes } from '../constants/order-types.enum'

export class CreateOrderDto {
  @IsString()
  cartKey: string

  @IsString()
  fullname: string

  @IsString()
  phone: string

  @IsEmail()
  email: string

  @IsString()
  orderType: string
}
