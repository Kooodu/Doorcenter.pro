import { Body, Controller, Delete, Get, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common'
import { FabricatorService } from './fabricator.service'
import { AdminGuard } from '../../core/guards/admin.guard'
import { CreateFabricatorDto } from './dto/create.dto'
import { UpdateFabricatorDto } from './dto/update.dto'

@Controller('fabricator')
export class FabricatorController {
  constructor(private readonly fabricatorService: FabricatorService) {}

  @Get()
  async getAll() {
    return await this.fabricatorService.getAll()
  }

  @Post()
  @UseGuards(AdminGuard)
  async create(@Body() createFabricatorDto: CreateFabricatorDto) {
    return await this.fabricatorService.create(createFabricatorDto)
  }

  @Delete()
  @UseGuards(AdminGuard)
  async delete(@Query('id', ParseIntPipe) id: number) {
    return await this.fabricatorService.delete(id)
  }

  @Put()
  @UseGuards(AdminGuard)
  async update(@Body() updateFabricatorDto: UpdateFabricatorDto) {
    return await this.fabricatorService.update(updateFabricatorDto)
  }
}
