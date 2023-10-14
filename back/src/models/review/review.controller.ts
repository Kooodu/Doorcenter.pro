import { Body, Controller, Get, Post } from '@nestjs/common'
import { ReviewService } from './review.service'
import { CreateReviewDto } from './dto/create.dto'

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  async getAll() {
    return await this.reviewService.getAll()
  }

  @Post()
  async create(@Body() reviewDto: CreateReviewDto) {
    return await this.reviewService.create(reviewDto)
  }
}
