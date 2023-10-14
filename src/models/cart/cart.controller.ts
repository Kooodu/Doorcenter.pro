import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common'
import { CartService } from './cart.service'
import { AddProductToCartDto } from './dto/add-product.dto'
import { RemoveProductFromCartDto } from './dto/remove-product.dto'

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get(':key')
  async findByKey(@Param('key') key: string) {
    return await this.cartService.get(key)
  }

  @Get()
  async create() {
    return await this.cartService.create()
  }

  @Post('addProduct')
  async addProductToCart(@Body() addProductToCartDto: AddProductToCartDto) {
    return await this.cartService.addProductToCart(addProductToCartDto)
  }

  @Post('removeProduct')
  async removeProductFromCart(@Body() removeProductFromCartDto: RemoveProductFromCartDto) {
    return await this.cartService.removeProductFromCart(removeProductFromCartDto)
  }
}
