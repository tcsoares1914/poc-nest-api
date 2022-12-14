import { IsOptional, IsInt, IsString } from 'class-validator'

export class UpdateUserInput {
  @IsOptional()
  @IsInt()
  id: number

  @IsOptional()
  @IsString()
  firstName: string

  @IsOptional()
  @IsString()
  lastName: string

  @IsOptional()
  @IsString()
  email: string

  @IsOptional()
  @IsString()
  password: string
}
