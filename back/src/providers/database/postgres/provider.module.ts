import { Logger, Module } from '@nestjs/common'
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm'
import { DatabaseType } from 'typeorm'
import { PostgresConfigModule } from '../../../config/database/postgres/config.module'
import { IPostgresConfigService } from '../../../config/database/postgres/config.interface'
import * as path from 'path'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [PostgresConfigModule],
      inject: [IPostgresConfigService],
      useFactory: async (postgresConfigService: IPostgresConfigService) => ({
        type: 'postgres' as DatabaseType,
        host: postgresConfigService.host,
        port: postgresConfigService.port,
        username: postgresConfigService.username,
        password: postgresConfigService.password,
        database: postgresConfigService.database,
        logging: true,
        synchronize: true,
        entities: [path.join(__dirname, '..', '..', '..', '**/*.entity.js')],
      }),
    } as TypeOrmModuleAsyncOptions),
  ],
})
export class PostgresDatabaseProviderModule {
  constructor() {
    Logger.log(
      `Typeorm provider had successfully created. Orm find models on the path "${path.join(
        __dirname,
        '..',
        '..',
        '..',
        '/**/*.entity.js'
      )}"`
    )
  }
}
