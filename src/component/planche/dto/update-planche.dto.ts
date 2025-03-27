import { PartialType } from '@nestjs/mapped-types';
import { CreatePlancheDto } from './create-planche.dto';

export class UpdatePlancheDto extends PartialType(CreatePlancheDto) {}
