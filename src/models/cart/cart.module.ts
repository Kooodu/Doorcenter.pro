import { Module } from '@nestjs/common'
import { CartController } from './cart.controller'
import { CartService } from './cart.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Cart } from './entities/cart.entity'
import { ProductModule } from '../product/product.module'
import { CartProduct } from './entities/cart-product.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Cart, CartProduct]), ProductModule],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}
