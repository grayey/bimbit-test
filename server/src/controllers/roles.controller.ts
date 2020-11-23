import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Patch,
    Body,
    Req,
    Res,
    Param,
    UseGuards,
} from '@nestjs/common';
import { RolesService } from '../services/roles.service';
import { RolesInterface } from '../interfaces/roles.interface';

@Controller('roles')
export class RolesController {

    constructor(private readonly roleService: RolesService) { }

    /**
     * This method retrieves all roles
     * @return returns a promise of all roles
     */
    @Get()
    findAll(): Promise<RolesInterface[]> {
        return this.roleService.findAll();
    }

    /**
     * This method retrieves a role by it's Id
     * @return returns a single role instance
     */
    @Get(':id')
    findOne(@Param('id') id): Promise<RolesInterface> {
        return this.roleService.findOne(id);
    }

    /**
     * This method creates a new role
     * @return returns the new instance
     */
    @Post()
    create(@Body() createRoleDto): Promise<RolesInterface> {
        return this.roleService.create(createRoleDto);
    }

    /**
     * This method deletes a  role
     * @return 204: returns empty body
     */
    @Delete(':id')
    delete(@Param('id') id): Promise<RolesInterface> {
        return this.roleService.delete(id);
    }

    /**
     * This method updates a  role
     * @return returns updated instance
     */
    @Put(':id')
    update(@Body() updateRoleDto, @Param('id') id): Promise<RolesInterface> {
        return this.roleService.update(id, updateRoleDto);
    }

    // @Patch(':id')
    // findByIdAndToggleEnable(@Param('id') id): Promise<RolesInterface> {
    //     return this.RoleService.findByIdAndToggleEnable(id);
    // }
}
