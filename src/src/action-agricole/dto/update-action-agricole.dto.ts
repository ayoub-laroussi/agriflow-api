import { PartialType } from '@nestjs/mapped-types';
import { CreateActionAgricoleDto } from './create-action-agricole.dto';

export class UpdateActionAgricoleDto extends PartialType(CreateActionAgricoleDto) {}
