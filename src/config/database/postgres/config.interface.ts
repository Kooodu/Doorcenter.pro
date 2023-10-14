export interface IPostgresConfigService {
  get host(): string

  get port(): number

  get username(): string

  get password(): string

  get database(): string

  get maxConnections(): number

  get connectionTimeoutMs(): number
}

export const IPostgresConfigService = Symbol('IPostgresConfigService')