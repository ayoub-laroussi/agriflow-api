import { CreateTerrainDto } from './dto/create-terrain.dto';
import { UpdateTerrainDto } from './dto/update-terrain.dto';
export declare class TerrainService {
    create(createTerrainDto: CreateTerrainDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateTerrainDto: UpdateTerrainDto): string;
    remove(id: number): string;
}
