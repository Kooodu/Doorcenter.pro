import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProductController } from './product/product.controller'
import { ProductService } from './product/product.service'
import { CategoryModule } from '../category/category.module'
import { FabricatorModule } from '../fabricator/fabricator.module'
import { Product } from './product/product.entity'
import { ProductImage } from './image/product-image.entity'
import { ProductParameter } from './parameter/product-parameter.entity'
import { ProductReview } from './review/product-review.entity'
import { ProductImageController } from './image/image.controller'
import { ProductImageService } from './image/image.service'
import { ProductParameterService } from './parameter/parameter.service'
import { ProductParameterController } from './parameter/parameter.controller'
import { ProductReviewController } from './review/product-review.controller'
import { ProductReviewService } from './review/product-review.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, ProductImage, ProductParameter, ProductReview]),
    CategoryModule,
    FabricatorModule,
  ],
  controllers: [ProductController, ProductImageController, ProductParameterController, ProductReviewController],
  providers: [ProductService, ProductImageService, ProductParameterService, ProductReviewService],
  exports: [ProductService],
})
export class ProductModule {}
