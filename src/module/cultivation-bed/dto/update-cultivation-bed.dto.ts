import { PartialType } from '@nestjs/swagger';
import { CreateCultivationBedDto } from './create-cultivation-bed.dto';

export class UpdateCultivationBedDto extends PartialType(CreateCultivationBedDto) {}
