import { IsNumber, IsString } from 'class-validator'

export class CreateReviewDto {
  @IsNumber()
  product: number

  @IsString()
  value: string
}
