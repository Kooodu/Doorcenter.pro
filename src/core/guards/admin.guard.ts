import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const password = '123'
    const request = context.switchToHttp().getRequest()
    if (request.headers.authorization != password) {
      return false
    }
    return true
  }
}
