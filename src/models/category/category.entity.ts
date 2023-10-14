import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Product } from '../product/product/product.entity'
import { Fabricator } from '../fabricator/product-fabricator.entity'

@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'character varying' })
  title: string

  @Column({ type: 'character varying' })
  image: string

  @Column({ type: 'character varying' })
  icon: string

  @OneToMany(() => Product, (product) => product.category, { nullable: true })
  products: Product[]

  @OneToMany(() => Fabricator, (fabricator) => fabricator.category)
  fabricators: Fabricator[]

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date
}
