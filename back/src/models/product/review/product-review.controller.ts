import { Body, Controller, Post } from '@nestjs/common'
import { CreateReviewDto } from './dto/create.dto'
import { ProductReviewService } from './product-review.service'

@Controller('product/review')
export class ProductReviewController {
  constructor(private readonly productReviewService: ProductReviewService) {}

  @Post()
  async create(@Body() createReviewDto: CreateReviewDto) {
    return await this.productReviewService.create(createReviewDto)
  }
}
