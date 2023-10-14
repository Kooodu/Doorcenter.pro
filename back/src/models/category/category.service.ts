import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Category } from './category.entity'
import { Repository } from 'typeorm'
import { CreateCategoryDto } from './dto/create.dto'
import { UpdateCategoryDto } from './dto/update.dto'

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>
  ) {}

  async create(categoryDto: CreateCategoryDto) {
    const candidate = await this.categoryRepository.findOne({
      where: {
        title: categoryDto.title,
      },
    })
    if (candidate) throw new BadRequestException('Категория с таким названием уже существует')

    const category = this.categoryRepository.create({
      ...categoryDto,
    })

    return await this.categoryRepository.save(category)
  }

  async delete(id: number) {
    const category = await this.findById(id)
    if (!category) throw new BadRequestException('Категории с таким ID не существует')

    await this.categoryRepository.delete(id)
    return {
      message: `Категория с id=${id} успешно удалена`,
    }
  }

  async update(updateDto: UpdateCategoryDto) {
    const category = await this.findById(updateDto.category)
    if (!category) throw new BadRequestException('Категории с таким ID не существует')

    return await this.categoryRepository.save({
      id: updateDto.category,
      title: updateDto.title,
      icon: updateDto.icon,
      image: updateDto.image,
    })
  }

  async getById(id: number) {
    return await this.categoryRepository.findOne({
      where: {
        id: id,
      },
      relations: ['products', 'fabricators'],
    })
  }

  async getAll() {
    return await this.categoryRepository.find({})
  }

  async findById(id: number) {
    return await this.categoryRepository.findOne({
      where: {
        id: id,
      },
    })
  }
}
