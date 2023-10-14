import { Body, Controller, Delete, ParseIntPipe, Post, Put, Query } from '@nestjs/common'
import { ProductParameterService } from './parameter.service'
import { CreateParameterDto } from './dto/create.dto'
import { UpdateParameterDto } from './dto/update.dto'

@Controller('product/parameter')
export class ProductParameterController {
  constructor(private readonly productParameterService: ProductParameterService) {}

  @Post()
  async create(@Body() parameterDto: CreateParameterDto) {
    return await this.productParameterService.create(parameterDto)
  }

  @Put()
  async update(@Body() parameterDto: UpdateParameterDto) {
    return await this.productParameterService.update(parameterDto)
  }

  @Delete()
  async delete(@Query('id', ParseIntPipe) id: number) {
    return await this.productParameterService.delete(id)
  }
}
