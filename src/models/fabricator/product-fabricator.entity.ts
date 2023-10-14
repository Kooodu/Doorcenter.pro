import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Product } from '../product/product/product.entity'
import { Category } from '../category/category.entity'

@Entity({ name: 'fabricators' })
export class Fabricator {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'character varying' })
  title: string

  @Column({ type: 'character varying' })
  image: string

  @OneToMany(() => Product, (product) => product.fabricator, { nullable: true })
  products: Product[]

  @ManyToOne(() => Category, (category) => category.fabricators)
  category: Category

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date
}
