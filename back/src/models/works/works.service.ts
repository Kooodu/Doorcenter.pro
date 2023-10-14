import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Review } from '../review/review.entity'
import { Repository } from 'typeorm'
import { Work } from './work.entity'
import { CreateWorkDto } from './dto/create-work.dto'

@Injectable()
export class WorksService {
  constructor(
    @InjectRepository(Work)
    private workRepository: Repository<Work>
  ) {}

  async create(createDto: CreateWorkDto) {
    const product = await this.workRepository.create({
      ...createDto
    })
    return await this.workRepository.save(product)
  }

  async delete(id: number) {
    const product = await this.workRepository.findOne({
      where: {
        id: id
      }
    })
    if (!product) {
      throw new BadRequestException('Работы с таким ID не существует')
    }
    await this.workRepository.delete(id)

    return {
      message: `Производитель с id=${id} успешно удалён`,
    }
  }

  async getAll() {
    return await this.workRepository.find()
  }
}
