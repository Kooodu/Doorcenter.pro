import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Order } from './order.entity'

@Entity('order_pickup_information')
export class OrderPickupInformation {
  @PrimaryGeneratedColumn()
  id: number

  @OneToOne(() => Order, (order) => order.pickupInformation, { onDelete: 'CASCADE' })
  order: Order

  @Column({ type: 'text' })
  point: string
}
