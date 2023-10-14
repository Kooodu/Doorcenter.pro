import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Cart } from './cart.entity'
import { Product } from '../../product/product/product.entity'

@Entity({ name: 'cart_products' })
export class CartProduct {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Cart, (cart) => cart, { onDelete: 'CASCADE' })
  cart: Cart

  @ManyToOne(() => Product, (product) => product.in_carts, { onDelete: 'CASCADE', eager: true })
  product: Product

  @Column({ type: 'integer' })
  amount: number
}
