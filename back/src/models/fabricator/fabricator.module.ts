import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Fabricator } from './product-fabricator.entity'
import { FabricatorController } from './fabricator.controller'
import { FabricatorService } from './fabricator.service'
import { Category } from '../category/category.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Fabricator, Category])],
  controllers: [FabricatorController],
  providers: [FabricatorService],
  exports: [FabricatorService],
})
export class FabricatorModule {}
