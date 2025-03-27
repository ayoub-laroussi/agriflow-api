import { CreateActionAgricoleDto } from './dto/create-action-agricole.dto';
import { UpdateActionAgricoleDto } from './dto/update-action-agricole.dto';
export declare class ActionAgricoleService {
    create(createActionAgricoleDto: CreateActionAgricoleDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateActionAgricoleDto: UpdateActionAgricoleDto): string;
    remove(id: number): string;
}
