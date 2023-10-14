import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ITelegramConfigService } from './config.interface'

@Injectable()
export class TelegramConfigService implements ITelegramConfigService {
  constructor(private readonly configService: ConfigService) {}

  get key(): string {
    return String(this.configService.get<string>(`telegram.key`))
  }

  get adminId(): number {
    return Number(this.configService.get<string>(`telegram.adminId`))
  }
}
