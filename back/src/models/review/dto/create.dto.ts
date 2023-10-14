import { IsString } from 'class-validator'

export class CreateReviewDto {
  @IsString()
  value: string
}
