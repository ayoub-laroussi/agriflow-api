import { PartialType } from '@nestjs/mapped-types';
import { CreateEspaceCultureDto } from './create-espace-culture.dto';

export class UpdateEspaceCultureDto extends PartialType(CreateEspaceCultureDto) {}
