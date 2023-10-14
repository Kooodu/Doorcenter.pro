import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Order } from './entities/order.entity'
import { ProductService } from '../product/product/product.service'
import { CreateOrderDto } from './dto/create.dto'
import { CartService } from '../cart/cart.service'
import { OrderDeliveryInformation } from './entities/order-delivery-information.entity'
import { OrderRegionDeliveryInformation } from './entities/order-region-delivery-information.entity'
import { OrderPickupInformation } from './entities/order-pickup-information.entity'
import { OrderTypes } from './constants/order-types.enum'
import { InjectBot } from 'nestjs-telegraf'
import { Context, Telegraf } from 'telegraf'

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,

    @InjectRepository(OrderDeliveryInformation)
    private orderDeliveryInformation: Repository<OrderDeliveryInformation>,

    @InjectRepository(OrderRegionDeliveryInformation)
    private orderRegionDeliveryInformation: Repository<OrderRegionDeliveryInformation>,

    @InjectRepository(OrderPickupInformation)
    private orderPickupInformation: Repository<OrderPickupInformation>,

    @InjectBot() private bot: Telegraf<Context>,

    private readonly productService: ProductService,

    private readonly cartService: CartService
  ) {}

  async createOrder(createOrderDto: CreateOrderDto) {
    const cart = await this.cartService.get(createOrderDto.cartKey)
    if (cart.in_order)
      throw new BadRequestException('Корзина с таким ID уже используется в другом заказе, собирите новоую корзину')

    const order = await this.orderRepository.save(
      this.orderRepository.create({
        cart: cart,
        email: createOrderDto.email,
        phone: createOrderDto.phone,
        fullname: createOrderDto.fullname,
        orderType: createOrderDto.orderType,
      })
    )

    await this.doDeliveryAlert(order)
    return order
  }

  async doDeliveryAlert(order: Order) {
    let messageText = ''
    messageText = messageText + `<b>Новый заказ!</b>\n\n`
    messageText = messageText + `Корзина:\n`
    for (let i = 0; i < order.cart.products.length; i++) {
      messageText =
        messageText + `${i + 1})${order.cart.products[i].product.title} - ${order.cart.products[i].amount} позиций\n`
    }
    messageText = messageText + '\n'
    messageText = messageText + `Информация о заказе\n`
    messageText =
      messageText +
      `- Тип заказа: ${order.orderType}\n` +
      `- ФИО: ${order.fullname}\n` +
      `- Телефон: ${order.phone}\n` +
      `- Почта: ${order.email}\n`

    messageText = messageText + '\n'
    let sum = 1700
    for (let i = 0; i < order.cart.products.length; i++) {
      sum = sum + order.cart.products[i].product.price * order.cart.products[i].amount
    }
    messageText = messageText + `Сумма заказа: ${sum}`
    await this.bot.telegram.sendMessage(process.env.TELEGRAM_ADMIN_ID, messageText, { parse_mode: 'HTML' })
  }
}
