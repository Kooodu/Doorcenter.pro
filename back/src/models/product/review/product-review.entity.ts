import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Product } from '../product/product.entity'

@Entity({ name: 'product_reviews' })
export class ProductReview {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Product, (product) => product.reviews, { onDelete: 'CASCADE' })
  product: Product

  @Column({ type: 'text' })
  value: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date
}
