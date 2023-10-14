import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common'
import { AdminGuard } from '../../../core/guards/admin.guard'
import { CreateFabricatorDto } from '../../fabricator/dto/create.dto'
import { UpdateFabricatorDto } from '../../fabricator/dto/update.dto'
import { ProductImageService } from './image.service'
import { CreateImageDto } from './dto/create.dto'
import { UpdateImageDto } from './dto/update.dto'

@Controller('product/image')
export class ProductImageController {
  constructor(private readonly productImageService: ProductImageService) {}

  @Post(':id')
  @UseGuards()
  async setMain(@Param('id', ParseIntPipe) id: number) {
    return await this.productImageService.setMain(id)
  }

  @Post()
  @UseGuards(AdminGuard)
  async create(@Body() createImageDto: CreateImageDto) {
    return await this.productImageService.create(createImageDto)
  }

  @Delete()
  @UseGuards(AdminGuard)
  async delete(@Query('id', ParseIntPipe) id: number) {
    return await this.productImageService.delete(id)
  }

  @Put()
  @UseGuards(AdminGuard)
  async update(@Body() createImageDto: UpdateImageDto) {
    return await this.productImageService.update(createImageDto)
  }
}
