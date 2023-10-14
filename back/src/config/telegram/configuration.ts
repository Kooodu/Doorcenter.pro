import { registerAs } from '@nestjs/config'

export default registerAs('telegram', () => ({
  key: process.env.TELEGRAM_API_KEY,
  adminId: process.env.TELEGRAM_ADMIN_ID,
}))
