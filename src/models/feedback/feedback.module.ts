import { Module } from '@nestjs/common'
import { FeedbackController } from './feedback.controller'
import { FeedbackService } from './feedback.service'
import { NestjsTelegrafProviderModule } from '../../providers/telegram/provider.module'

@Module({
  imports: [NestjsTelegrafProviderModule],
  controllers: [FeedbackController],
  providers: [FeedbackService],
})
export class FeedbackModule {}
