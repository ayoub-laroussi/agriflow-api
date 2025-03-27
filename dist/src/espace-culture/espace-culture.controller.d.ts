import { EspaceCultureService } from './espace-culture.service';
import { CreateEspaceCultureDto } from './dto/create-espace-culture.dto';
import { UpdateEspaceCultureDto } from './dto/update-espace-culture.dto';
export declare class EspaceCultureController {
    private readonly espaceCultureService;
    constructor(espaceCultureService: EspaceCultureService);
    create(createEspaceCultureDto: CreateEspaceCultureDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateEspaceCultureDto: UpdateEspaceCultureDto): string;
    remove(id: string): string;
}
