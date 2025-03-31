import { PartialType } from '@nestjs/swagger';
import { CreateSoilCoverDto } from './create-soilcover.dto';

export class UpdateSoilCoverDto extends PartialType(CreateSoilCoverDto) {}
