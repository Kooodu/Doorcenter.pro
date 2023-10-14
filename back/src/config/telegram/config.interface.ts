export interface ITelegramConfigService {
  get key(): string
  get adminId(): number
}

export const ITelegramConfigService = Symbol('ITelegramConfigService')
