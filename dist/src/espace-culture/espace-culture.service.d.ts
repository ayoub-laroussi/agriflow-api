import { CreateEspaceCultureDto } from './dto/create-espace-culture.dto';
import { UpdateEspaceCultureDto } from './dto/update-espace-culture.dto';
export declare class EspaceCultureService {
    create(createEspaceCultureDto: CreateEspaceCultureDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateEspaceCultureDto: UpdateEspaceCultureDto): string;
    remove(id: number): string;
}
