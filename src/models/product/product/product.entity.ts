import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { CartProduct } from '../../cart/entities/cart-product.entity'
import { ProductImage } from '../image/product-image.entity'
import { ProductParameter } from '../parameter/product-parameter.entity'
import { ProductReview } from '../review/product-review.entity'
import { Category } from '../../category/category.entity'
import { Fabricator } from '../../fabricator/product-fabricator.entity'

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Category, (category) => category.products, { onDelete: 'CASCADE' })
  category: Category

  @Column({ type: 'character varying' })
  title: string

  @Column({ type: 'decimal' })
  price: number

  @ManyToOne(() => Fabricator, (productFabricator) => productFabricator.products, { onDelete: 'CASCADE' })
  fabricator: Fabricator

  @Column({ type: 'integer' })
  article: string

  @OneToMany(() => ProductImage, (productImage) => productImage.product, { nullable: true, eager: true })
  images: ProductImage[]

  @OneToMany(() => ProductParameter, (productParameter) => productParameter.product, { nullable: true })
  parameters: ProductParameter[]

  @Column({ type: 'text' })
  description: string

  @OneToMany(() => ProductReview, (productReviews) => productReviews.product, { nullable: true })
  reviews: ProductReview[]

  @OneToMany(() => CartProduct, (cartProduct) => cartProduct.product)
  in_carts: CartProduct

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date
}
