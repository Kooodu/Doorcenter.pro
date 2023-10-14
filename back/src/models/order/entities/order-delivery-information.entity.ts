import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Order } from './order.entity'

@Entity('order_delivery_informations')
export class OrderDeliveryInformation {
  @PrimaryGeneratedColumn()
  id: number

  @OneToOne(() => Order, (order) => order.deliveryInformation, { onDelete: 'CASCADE' })
  order: Order

  @Column('character varying')
  phone: string

  @Column('text')
  address: string

  @Column('character varying')
  entrance: string

  @Column('character varying')
  flat: string

  @Column('character varying')
  floor: string

  @Column('character varying')
  intercom: string

  @Column('text')
  date: string
}
