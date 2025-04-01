import { PartialType } from '@nestjs/swagger';
import { CreateCultivationSpaceDto } from './create-cultivation-space.dto';

export class UpdateCultivationSpaceDto extends PartialType(CreateCultivationSpaceDto) {}
