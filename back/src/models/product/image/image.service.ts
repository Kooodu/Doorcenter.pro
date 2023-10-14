import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ProductImage } from './product-image.entity'
import { Repository } from 'typeorm'
import { CreateImageDto } from './dto/create.dto'
import { ProductService } from '../product/product.service'
import { UpdateImageDto } from './dto/update.dto'
import { Product } from '../product/product.entity'

@Injectable()
export class ProductImageService {
  constructor(
    @InjectRepository(ProductImage)
    private productImageRepository: Repository<ProductImage>,

    @InjectRepository(Product)
    private productRepository: Repository<Product>,

    private readonly productService: ProductService
  ) {}

  async create(createImageDto: CreateImageDto) {
    const product = await this.productService.findById(createImageDto.product)
    if (!product) throw new BadRequestException('Товара с таким ID не существует')

    return await this.productImageRepository.save(
      this.productImageRepository.create({
        product: product,
        link: createImageDto.link,
      })
    )
  }

  async update(updateImageDto: UpdateImageDto) {
    const image = await this.productImageRepository.findOne({
      where: {
        id: updateImageDto.image,
      },
    })
    if (!image) throw new BadRequestException('Изображения с таким ID не существует')
    return await this.productImageRepository.save({
      ...image,
      id: updateImageDto.image,
      link: updateImageDto.link,
    })
  }

  async delete(id: number) {
    const image = await this.productImageRepository.findOne({
      where: {
        id: id,
      },
    })
    if (!image) throw new BadRequestException('Изображения с таким ID не существует')

    await this.productImageRepository.delete(id)
    return {
      message: `Изображение с id=${id} успешно удалён`,
    }
  }

  async setMain(id: number) {
    const image = await this.productImageRepository.findOne({
      where: {
        id: id,
      },
      relations: ['product'],
    })
    if (!image) throw new BadRequestException('Изображение с таким ID не существует')

    const product = await this.productRepository.findOne({
      where: {
        id: image.product.id,
      },
    })

    const mainImage = await this.productImageRepository.findOne({
      where: {
        product: product,
        isMain: true,
      },
    })

    if (mainImage) {
      await this.productImageRepository.save({
        ...mainImage,
        isMain: false,
      })
    }

    await this.productImageRepository.save({
      ...image,
      isMain: true,
    })

    return {
      message: `Изображение с id=${id}, товара с названием "${product.title}", успешно выставлено на ветрину`,
    }
  }
}
