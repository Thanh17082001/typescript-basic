import { IsNotEmpty, IsString, IsArray, IsEmail } from 'class-validator';

class user {
  @IsString()
  fullName!: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  passWord!: string;

  @IsArray()
  roles: Array<String> = [];
}
export default user