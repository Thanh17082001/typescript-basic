import { IsNotEmpty, IsInt, IsString, Min } from 'class-validator';

class product {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  quantity!: number;

  @IsNotEmpty()
  @IsString()
  category!: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  price!: number;
}
export default product