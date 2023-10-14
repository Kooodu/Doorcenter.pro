import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common'
import { ReviewService } from '../review/review.service'
import { CreateReviewDto } from '../review/dto/create.dto'
import { WorksService } from './works.service'
import { AdminGuard } from '../../core/guards/admin.guard'
import { CreateWorkDto } from './dto/create-work.dto'

@Controller('works')
export class WorksController {
  constructor(private readonly workService: WorksService) {}

  @Post()
  @UseGuards(AdminGuard)
  async create(@Body() workDto: CreateWorkDto) {
    return await this.workService.create(workDto)
  }

  @Get()
  async getAll() {
    return await this.workService.getAll()
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  async delete(
    @Param('id', ParseIntPipe) id: number
  ) {
    return await this.workService.delete(id)
  }
}
