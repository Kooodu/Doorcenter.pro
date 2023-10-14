import { Logger, Module } from '@nestjs/common'
import { InjectBot, TelegrafModule } from 'nestjs-telegraf'
import { TelegramConfigModule } from '../../config/telegram/config.module'
import { ITelegramConfigService } from '../../config/telegram/config.interface'
import { Context, session, Telegraf } from 'telegraf'

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      imports: [TelegramConfigModule],
      inject: [ITelegramConfigService],
      useFactory: async (telegramConfigService: ITelegramConfigService) => ({
        token: telegramConfigService.key,
      }),
    }),
  ],
  exports: [TelegrafModule],
})
export class NestjsTelegrafProviderModule {
  constructor(@InjectBot() private bot: Telegraf<Context>) {
    Logger.log(`Telegram provider had successfully created.`)
    bot.telegram.sendMessage(process.env.TELEGRAM_ADMIN_ID, 'Бот запущен')
  }
}
