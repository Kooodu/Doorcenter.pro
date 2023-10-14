import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { CartProduct } from './cart-product.entity'
import { Order } from '../../order/entities/order.entity'

@Entity({ name: 'carts' })
export class Cart {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'character varying' })
  key: string

  @OneToMany(() => CartProduct, (cartProduct) => cartProduct.cart, { nullable: true, eager: true })
  products: CartProduct[]

  @OneToOne(() => Order, (order) => order.cart, { nullable: true })
  in_order: Order
}
