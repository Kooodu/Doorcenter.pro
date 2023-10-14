import { Module } from '@nestjs/common'
import { OrderController } from './order.controller'
import { OrderService } from './order.service'
import { CartModule } from '../cart/cart.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Order } from './entities/order.entity'
import { OrderDeliveryInformation } from './entities/order-delivery-information.entity'
import { OrderRegionDeliveryInformation } from './entities/order-region-delivery-information.entity'
import { ProductModule } from '../product/product.module'
import { OrderPickupInformation } from './entities/order-pickup-information.entity'
import { NestjsTelegrafProviderModule } from '../../providers/telegram/provider.module'

@Module({
  imports: [
    CartModule,
    ProductModule,
    TypeOrmModule.forFeature([Order, OrderDeliveryInformation, OrderRegionDeliveryInformation, OrderPickupInformation]),
    NestjsTelegrafProviderModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
