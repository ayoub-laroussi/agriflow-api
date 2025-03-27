import { ActionAgricoleService } from './action-agricole.service';
import { CreateActionAgricoleDto } from './dto/create-action-agricole.dto';
import { UpdateActionAgricoleDto } from './dto/update-action-agricole.dto';
export declare class ActionAgricoleController {
    private readonly actionAgricoleService;
    constructor(actionAgricoleService: ActionAgricoleService);
    create(createActionAgricoleDto: CreateActionAgricoleDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateActionAgricoleDto: UpdateActionAgricoleDto): string;
    remove(id: string): string;
}
