import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Fabricator } from './product-fabricator.entity'
import { CreateFabricatorDto } from './dto/create.dto'
import { UpdateFabricatorDto } from './dto/update.dto'
import { Category } from '../category/category.entity'

@Injectable()
export class FabricatorService {
  constructor(
    @InjectRepository(Fabricator)
    private fabricatorRepository: Repository<Fabricator>,

    @InjectRepository(Category)
    private categoryRepository: Repository<Category>
  ) {}

  async create(fabricatorDto: CreateFabricatorDto) {
    const category = await this.categoryRepository.findOne({ where: { id: fabricatorDto.category } })
    if (!category) throw new BadRequestException('Категории с таким ID не существует')

    const fabricator = this.fabricatorRepository.create({
      ...fabricatorDto,
      category,
    })

    return await this.fabricatorRepository.save(fabricator)
  }

  async delete(id: number) {
    const fabricator = await this.findById(id)
    if (!fabricator) throw new BadRequestException('Производитель с таким ID не найден')

    await this.fabricatorRepository.delete(id)
    return {
      message: `Производитель с id=${id} успешно удалён`,
    }
  }

  async update(updateDto: UpdateFabricatorDto) {
    const fabricator = await this.findById(updateDto.fabricator)
    if (!fabricator) throw new BadRequestException('Производитель с таким ID не найден')

    return await this.fabricatorRepository.save({
      ...fabricator,
      id: updateDto.fabricator,
      title: updateDto.title,
      image: updateDto.image,
    })
  }

  async getAll() {
    return await this.fabricatorRepository.find({})
  }

  async findById(id: number) {
    return await this.fabricatorRepository.findOne({
      where: {
        id: id,
      },
    })
  }
}
