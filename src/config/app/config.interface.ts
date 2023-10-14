export interface IAppConfigService {
  get port(): string
}

export const IAppConfigService = Symbol('IAppConfigService')
