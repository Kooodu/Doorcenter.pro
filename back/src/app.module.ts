import { Module } from '@nestjs/common'
import { PostgresDatabaseProviderModule } from './providers/database/postgres/provider.module'
import { NestjsTelegrafProviderModule } from './providers/telegram/provider.module'
import { CategoryModule } from './models/category/category.module'
import { ProductModule } from './models/product/product.module'
import { CartModule } from './models/cart/cart.module'
import { OrderModule } from './models/order/order.module'
import { FabricatorModule } from './models/fabricator/fabricator.module'
import { FeedbackModule } from './models/feedback/feedback.module'
import { ReviewModule } from './models/review/review.module'
import { AppController } from './app.controller'
import { WorksModule } from './models/works/works.module'

@Module({
  imports: [
    PostgresDatabaseProviderModule,
    NestjsTelegrafProviderModule,
    CategoryModule,
    FabricatorModule,
    ProductModule,
    CartModule,
    OrderModule,
    FeedbackModule,
    ReviewModule,
    WorksModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
