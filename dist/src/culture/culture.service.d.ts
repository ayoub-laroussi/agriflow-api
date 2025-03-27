import { CreateCultureDto } from './dto/create-culture.dto';
import { UpdateCultureDto } from './dto/update-culture.dto';
export declare class CultureService {
    create(createCultureDto: CreateCultureDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateCultureDto: UpdateCultureDto): string;
    remove(id: number): string;
}
