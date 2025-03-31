import { PartialType } from '@nestjs/swagger';
import { CreateSoilcoverDto } from './create-soilcover.dto';

export class UpdateSoilcoverDto extends PartialType(CreateSoilcoverDto) {}
