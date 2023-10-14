import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Query, UseGuards } from '@nestjs/common'
import { CreateCategoryDto } from './dto/create.dto'
import { CategoryService } from './category.service'
import { AdminGuard } from '../../core/guards/admin.guard'
import { UpdateCategoryDto } from './dto/update.dto'

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return await this.categoryService.getById(id)
  }
  @Get()
  async getAll() {
    return await this.categoryService.getAll()
  }

  @Post()
  @UseGuards(AdminGuard)
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoryService.create(createCategoryDto)
  }

  @Delete()
  @UseGuards(AdminGuard)
  async delete(@Query('id', ParseIntPipe) id: number) {
    return await this.categoryService.delete(id)
  }

  @Put()
  @UseGuards(AdminGuard)
  async update(@Body() updateCategoryDto: UpdateCategoryDto) {
    return await this.categoryService.update(updateCategoryDto)
  }
}
