import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import * as Joi from 'joi'
import configuration from './configuration'
import { ITelegramConfigService } from './config.interface'
import { TelegramConfigService } from './config.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        TELEGRAM_API_KEY: Joi.string().required(),
        TELEGRAM_ADMIN_ID: Joi.number().required(),
      }),
    }),
  ],
  providers: [
    {
      provide: ITelegramConfigService,
      useClass: TelegramConfigService,
    },
  ],
  exports: [
    {
      provide: ITelegramConfigService,
      useClass: TelegramConfigService,
    },
  ],
})
export class TelegramConfigModule {}
