import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Product } from '../product/product.entity'
import { ProductService } from '../product/product.service'
import { ProductParameter } from './product-parameter.entity'
import { CreateParameterDto } from './dto/create.dto'
import { UpdateImageDto } from '../image/dto/update.dto'
import { UpdateParameterDto } from './dto/update.dto'

@Injectable()
export class ProductParameterService {
  constructor(
    @InjectRepository(ProductParameter)
    private productParameterRepository: Repository<ProductParameter>,

    @InjectRepository(Product)
    private productRepository: Repository<Product>,

    private readonly productService: ProductService
  ) {}

  async create(parameterDto: CreateParameterDto) {
    const product = await this.productService.findById(parameterDto.product)
    if (!product) throw new BadRequestException('Товара с таким ID не существует')

    return await this.productParameterRepository.save(
      this.productParameterRepository.create({
        product: product,
        key: parameterDto.key,
        value: parameterDto.value,
      })
    )
  }

  async update(updateImageDto: UpdateParameterDto) {
    const parameter = await this.productParameterRepository.findOne({
      where: {
        id: updateImageDto.parameter,
      },
    })
    if (!parameter) throw new BadRequestException('Параметра с таким ID не существует')

    return await this.productParameterRepository.save({
      ...parameter,
      id: updateImageDto.parameter,
      key: updateImageDto.key,
      value: updateImageDto.value,
    })
  }

  async delete(id: number) {
    const parameter = await this.productParameterRepository.findOne({
      where: {
        id: id,
      },
    })
    if (!parameter) throw new BadRequestException('Параметра с таким ID не существует')

    await this.productParameterRepository.delete(id)
    return {
      message: `Параметр с id=${id} успешно удалён`,
    }
  }
}
