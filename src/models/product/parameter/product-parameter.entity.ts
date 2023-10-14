import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Product } from '../product/product.entity'

@Entity({ name: 'product_parameters' })
export class ProductParameter {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Product, (product) => product.parameters, { onDelete: 'CASCADE' })
  product: Product

  @Column({ type: 'character varying' })
  key: string

  @Column({ type: 'character varying' })
  value: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date
}
