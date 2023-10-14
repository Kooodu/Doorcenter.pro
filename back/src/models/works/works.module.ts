import { Module } from '@nestjs/common';
import { WorksController } from './works.controller';
import { WorksService } from './works.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Work } from './work.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Work])],
  controllers: [WorksController],
  providers: [WorksService]
})
export class WorksModule {}
