import { CultureService } from './culture.service';
import { CreateCultureDto } from './dto/create-culture.dto';
import { UpdateCultureDto } from './dto/update-culture.dto';
export declare class CultureController {
    private readonly cultureService;
    constructor(cultureService: CultureService);
    create(createCultureDto: CreateCultureDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateCultureDto: UpdateCultureDto): string;
    remove(id: string): string;
}
