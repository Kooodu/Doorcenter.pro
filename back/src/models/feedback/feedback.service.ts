import { Injectable } from '@nestjs/common'
import { InjectBot } from 'nestjs-telegraf'
import { Context, Telegraf } from 'telegraf'
import { CreateFeedbackDto } from './dto/create.dto'

@Injectable()
export class FeedbackService {
  constructor(@InjectBot() private bot: Telegraf<Context>) {}

  async create(createFeedbackDto: CreateFeedbackDto) {
    this.bot.telegram.sendMessage(
      process.env.TELEGRAM_ADMIN_ID,
      `Форма обратной связи заполнена!\n\nИмя: ${createFeedbackDto.fullname}\nТелефон: ${createFeedbackDto.phone}\n`
    )
    return {
      message: 'Форма обратной связи успешно принята',
    }
  }
}
