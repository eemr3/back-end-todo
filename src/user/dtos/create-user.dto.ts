import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: 'O nome deve ser maior ou igual a 8 caracteres' })
  @MaxLength(70, { message: 'O nome deve ser menor ou igual a 70 caracteres' })
  name: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'O email deve ser um email válido' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: 'A senha deve ser maior ou igual a 8 caracteres' })
  @MaxLength(20, { message: 'A senha deve ser menor ou igual a 20 caracteres' })
  @Matches(/(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Senha muito fraca',
  })
  password: string;
}
