import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Order } from './order.entity'

@Entity('order_region_delivery_informations')
export class OrderRegionDeliveryInformation {
  @PrimaryGeneratedColumn()
  id: number

  @OneToOne(() => Order, (order) => order.regionDeliveryInformation, { onDelete: 'CASCADE' })
  order: Order

  @Column('character varying')
  phone: string

  @Column('character varying')
  city: string

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
