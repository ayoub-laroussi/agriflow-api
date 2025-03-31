import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'Email de l\'utilisateur' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Nom de l\'utilisateur' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Nom d\'utilisateur' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ description: 'Mot de passe de l\'utilisateur' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
