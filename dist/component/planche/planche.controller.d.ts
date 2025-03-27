import { PlancheService } from './planche.service';
import { CreatePlancheDto } from './dto/create-planche.dto';
import { UpdatePlancheDto } from './dto/update-planche.dto';
export declare class PlancheController {
    private readonly plancheService;
    constructor(plancheService: PlancheService);
    create(createPlancheDto: CreatePlancheDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updatePlancheDto: UpdatePlancheDto): string;
    remove(id: string): string;
}
