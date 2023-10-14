import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Cart } from '../../cart/entities/cart.entity'
import { OrderTypes } from '../constants/order-types.enum'
import { OrderDeliveryInformation } from './order-delivery-information.entity'
import { OrderRegionDeliveryInformation } from './order-region-delivery-information.entity'
import { OrderPickupInformation } from './order-pickup-information.entity'

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number

  @OneToOne(() => Cart, (cart) => cart.in_order)
  @JoinColumn()
  cart: Cart

  @Column({ type: 'character varying', name: 'full_name' })
  fullname: string

  @Column({ type: 'character varying' })
  phone: string

  @Column({ type: 'character varying' })
  email: string

  @OneToOne(() => OrderDeliveryInformation, (orderDeliveryInformation) => orderDeliveryInformation.order, {
    nullable: true,
  })
  @JoinColumn()
  deliveryInformation: OrderDeliveryInformation

  @OneToOne(() => OrderPickupInformation, (orderPickupInformation) => orderPickupInformation.order, { nullable: true })
  @JoinColumn()
  pickupInformation: OrderPickupInformation

  @OneToOne(
    () => OrderRegionDeliveryInformation,
    (orderRegionDeliveryInformation) => orderRegionDeliveryInformation.order,
    { nullable: true }
  )
  @JoinColumn()
  regionDeliveryInformation: OrderRegionDeliveryInformation

  @Column({ type: 'character varying' })
  orderType: string
}
