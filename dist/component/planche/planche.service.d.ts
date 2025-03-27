import { CreatePlancheDto } from './dto/create-planche.dto';
import { UpdatePlancheDto } from './dto/update-planche.dto';
export declare class PlancheService {
    create(createPlancheDto: CreatePlancheDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updatePlancheDto: UpdatePlancheDto): string;
    remove(id: number): string;
}
