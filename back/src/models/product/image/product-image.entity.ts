import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Product } from '../product/product.entity'

@Entity({ name: 'product_images' })
export class ProductImage {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Product, (product) => product.images, { onDelete: 'CASCADE' })
  product: Product

  @Column({ type: 'character varying' })
  link: string

  @Column({ type: 'boolean', name: 'is_main', default: false })
  isMain: boolean

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date
}
