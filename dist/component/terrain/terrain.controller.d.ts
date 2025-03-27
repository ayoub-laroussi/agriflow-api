import { TerrainService } from './terrain.service';
import { CreateTerrainDto } from './dto/create-terrain.dto';
import { UpdateTerrainDto } from './dto/update-terrain.dto';
export declare class TerrainController {
    private readonly terrainService;
    constructor(terrainService: TerrainService);
    create(createTerrainDto: CreateTerrainDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateTerrainDto: UpdateTerrainDto): string;
    remove(id: string): string;
}
