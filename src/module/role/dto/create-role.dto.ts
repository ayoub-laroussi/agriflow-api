import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ description: 'Nom du rôle' })
  @IsString()
  @IsNotEmpty()
  role: string;
}
