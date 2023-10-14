import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Product } from '../product/product.entity'
import { ProductReview } from './product-review.entity'
import { ProductService } from '../product/product.service'
import { CreateReviewDto } from './dto/create.dto'

@Injectable()
export class ProductReviewService {
  constructor(
    @InjectRepository(ProductReview)
    private productReviewRepository: Repository<ProductReview>,

    @InjectRepository(Product)
    private productRepository: Repository<Product>,

    private readonly productService: ProductService
  ) {}

  async create(createDto: CreateReviewDto) {
    const product = await this.productService.findById(createDto.product)
    if (!product) throw new BadRequestException('Товара с таким ID не существует')

    return await this.productReviewRepository.save(
      this.productReviewRepository.create({
        product: product,
        value: createDto.value,
      })
    )
  }
}
