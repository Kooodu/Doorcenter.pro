import { NestFactory, Reflector } from '@nestjs/core'
import { AppModule } from './app.module'
import { ClassSerializerInterceptor, Logger, ValidationPipe } from '@nestjs/common'
import * as compression from 'compression'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  })

  app.setGlobalPrefix('api')
  app.use(compression())
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
  app.useGlobalPipes(new ValidationPipe({ transform: true }))

  await app.listen(process.env.APP_BACKEND_PORT || 3000, async () => {
    console.log(`Сайт запущен на ${await app.getUrl()}`)
  })
}
bootstrap()
