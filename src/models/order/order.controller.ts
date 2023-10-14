import { Body, Controller, Post } from '@nestjs/common'
import { CreateOrderDto } from './dto/create.dto'
import { OrderService } from './order.service'

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return await this.orderService.createOrder(createOrderDto)
  }
}
