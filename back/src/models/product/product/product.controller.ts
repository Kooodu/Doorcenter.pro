import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common'
import { CreateProductDto } from './dto/create.dto'
import { AdminGuard } from '../../../core/guards/admin.guard'
import { ProductService } from './product.service'
import { UpdateProductDto } from './dto/update.dto'
import { FindProductDto } from './dto/find.dto'

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(AdminGuard)
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productService.create(createProductDto)
  }

  @Delete()
  @UseGuards(AdminGuard)
  async delete(@Query('id', ParseIntPipe) id: number) {
    return await this.productService.delete(id)
  }

  @Put()
  @UseGuards(AdminGuard)
  async update(@Body() updateProductDto: UpdateProductDto) {
    return await this.productService.update(updateProductDto)
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return await this.productService.findById(id)
  }

  @Get()
  async getAll(@Query() findParams: FindProductDto) {
    return await this.productService.findAll(findParams)
  }
}
