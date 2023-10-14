import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Fabricator } from '../fabricator/product-fabricator.entity'
import { Repository } from 'typeorm'
import { Cart } from './entities/cart.entity'
import { ProductService } from '../product/product/product.service'
import { randomUUID } from 'crypto'
import { CartProduct } from './entities/cart-product.entity'
import { AddProductToCartDto } from './dto/add-product.dto'
import { RemoveProductFromCartDto } from './dto/remove-product.dto'

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,

    @InjectRepository(CartProduct)
    private cartProductRepository: Repository<CartProduct>,

    private readonly productService: ProductService
  ) {}

  async create() {
    return await this.cartRepository.save({ key: randomUUID() })
  }

  async get(key: string) {
    const cart = await this.cartRepository.findOne({
      where: {
        key: key,
      },
      relations: ['products', 'in_order'],
    })
    if (!cart) throw new BadRequestException('Корзины с таким ID не существует')
    return cart
  }

  async addProductToCart(addProductDto: AddProductToCartDto) {
    const cart = await this.cartRepository.findOne({
      where: {
        key: addProductDto.key,
      },
    })
    if (!cart) throw new BadRequestException('Корзины с таким ID не существует')

    const product = await this.productService.findById(addProductDto.product)
    if (!product) throw new BadRequestException('Продукта с таким ID не существует')

    const cartProduct = await this.cartProductRepository.findOne({
      where: {
        cart: cart,
        product: product,
      },
    })
    if (cartProduct) {
      await this.cartProductRepository.save({
        ...cartProduct,
        amount: cartProduct.amount + addProductDto.amount,
      })
    } else {
      await this.cartProductRepository.save(
        this.cartProductRepository.create({
          cart: cart,
          product: product,
          amount: addProductDto.amount,
        })
      )
    }

    return await this.cartRepository.findOne({ where: { key: addProductDto.key }, relations: ['products'] })
  }

  async removeProductFromCart(removeFromCartDto: RemoveProductFromCartDto) {
    const cart = await this.cartRepository.findOne({
      where: {
        key: removeFromCartDto.key,
      },
    })
    if (!cart) throw new BadRequestException('Корзины с таким ID не существует')

    const product = await this.productService.findById(removeFromCartDto.product)
    if (!product) throw new BadRequestException('Продукта с таким ID не существует')

    const cartProduct = await this.cartProductRepository.findOne({
      where: {
        cart: cart,
        product: product,
      },
    })
    if (!cartProduct) throw new BadRequestException('Продукт с таким ID не добавлен в корзину')

    if (cartProduct.amount <= removeFromCartDto.amount) {
      await this.cartProductRepository.delete(cartProduct.id)
      return await this.cartRepository.findOne({ where: { key: removeFromCartDto.key }, relations: ['products'] })
    }
    await this.cartProductRepository.save({
      ...cartProduct,
      amount: cartProduct.amount - removeFromCartDto.amount,
    })

    return await this.cartRepository.findOne({ where: { key: removeFromCartDto.key }, relations: ['products'] })
  }

  async getById(id: number) {
    return await this.cartRepository.findOne({
      where: {
        id: id,
      },
      relations: ['products'],
    })
  }
}
