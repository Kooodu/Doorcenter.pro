import { Controller, Post, UseGuards } from '@nestjs/common'
import { AdminGuard } from './core/guards/admin.guard'

@Controller('app')
export class AppController {
  @Post()
  @UseGuards(AdminGuard)
  async checkAdmin() {
    return { message: 'true' }
  }
}
