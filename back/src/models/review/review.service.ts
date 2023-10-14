import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Review } from './review.entity'
import { CreateReviewDto } from './dto/create.dto'

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>
  ) {}

  async create(reviewDto: CreateReviewDto) {
    return await this.reviewRepository.save(
      this.reviewRepository.create({
        value: reviewDto.value,
      })
    )
  }

  async getAll() {
    return await this.reviewRepository.find({})
  }
}
