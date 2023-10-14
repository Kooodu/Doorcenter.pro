import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Like, Repository } from 'typeorm'
import { Product } from './product.entity'
import { ProductImage } from '../image/product-image.entity'
import { ProductParameter } from '../parameter/product-parameter.entity'
import { ProductReview } from '../review/product-review.entity'
import { CreateProductDto } from './dto/create.dto'
import { CategoryService } from '../../category/category.service'
import { FabricatorService } from '../../fabricator/fabricator.service'
import { UpdateCategoryDto } from '../../category/dto/update.dto'
import { UpdateProductDto } from './dto/update.dto'
import { FindProductDto } from './dto/find.dto'

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,

    @InjectRepository(ProductImage)
    private productImageRepository: Repository<ProductImage>,

    @InjectRepository(ProductParameter)
    private productParameterRepository: Repository<ProductParameter>,

    private readonly categoryService: CategoryService,

    private readonly fabricatorService: FabricatorService
  ) {}

  async create(productDto: CreateProductDto) {
    const candidate = await this.productRepository.findOne({
      where: {
        title: productDto.title,
      },
    })
    if (candidate) throw new BadRequestException('Товар с таким названием уже существует')

    const category = await this.categoryService.findById(productDto.category)
    if (!category) throw new BadRequestException('Категории с таким ID не существует')

    const fabricator = await this.fabricatorService.findById(productDto.fabricator)
    if (!fabricator) throw new BadRequestException('Производитель с таким ID не существует')

    const product = await this.productRepository.save(
      this.productRepository.create({
        title: productDto.title,
        category: category,
        price: productDto.price,
        fabricator: fabricator,
        article: productDto.article,
        description: productDto.description,
      })
    )

    const parameters = await this.productParameterRepository.save(
      productDto.parameters.map((obj) => {
        return {
          ...obj,
          product: product,
        }
      })
    )

    const images = await this.productImageRepository.save(
      productDto.images.map((obj) => {
        return {
          ...obj,
          product: product,
        }
      })
    )

    return await this.productRepository.findOne({
      where: {
        id: product.id,
      },
      relations: ['category', 'fabricator', 'images', 'parameters', 'reviews'],
    })
  }

  async delete(id: number) {
    const product = await this.findById(id)
    if (!product) throw new BadRequestException('Товара с таким ID не существует')

    await this.productRepository.delete(id)
    return {
      message: `Товар с id=${id} успешно удалён`,
    }
  }

  async update(updateDto: UpdateProductDto) {
    const product = await this.findById(updateDto.product)
    if (!product) throw new BadRequestException('Товара с таким ID не существует')

    const category = await this.categoryService.findById(updateDto.category)
    if (!category) throw new BadRequestException('Категории с таким ID не существует')

    const fabricator = await this.fabricatorService.findById(updateDto.fabricator)
    if (!fabricator) throw new BadRequestException('Производитель с таким ID не существует')

    return await this.productRepository.save({
      id: product.id,
      title: updateDto.title,
      category: category,
      price: updateDto.price,
      fabricator: fabricator,
      description: updateDto.description,
    })
  }

  async findAll(findDto: FindProductDto) {
    let findQuery = {} as any

    const category = await this.categoryService.findById(findDto.category)
    const fabricator = await this.fabricatorService.findById(findDto.fabricator)

    findDto.category ? (findQuery.category = category) : undefined
    findDto.fabricator ? (findQuery.fabricator = fabricator) : undefined
    findDto.article ? (findQuery.article = findDto.article) : undefined
    findDto.title ? (findQuery.title = Like(`%${findDto.title}%`)) : undefined

    let findedProducts = await this.productRepository.find({
      where: findQuery,
      relations: ['category', 'fabricator', 'images'],
      take: findDto.limit,
      skip: 0,
    })

    let products = []

    if (findDto.minPrice) {
      products = findedProducts.filter((obj) => {
        return obj.price > findDto.minPrice
      })
    } else products = findedProducts

    if (findDto.maxPrice) {
      products = products.filter((obj) => {
        return obj.price < findDto.maxPrice
      })
    }

    return products
  }

  async findById(id: number) {
    return await this.productRepository.findOne({
      where: {
        id: id,
      },
      relations: ['category', 'fabricator', 'images', 'parameters', 'reviews'],
    })
  }

  private getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
}
