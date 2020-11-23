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
    UseInterceptors } from '@nestjs/common';

import { LocalAuthGuard } from '../guards/local.auth.guard';
import { JwtAuthGuard } from '../guards/jwt.auth.guard';
import { UsersService } from '../services/users.service';
import { UsersInterface } from '../interfaces/users.interface';
import { RolesInterface } from '../interfaces/roles.interface';
import { AuthFieldInterceptor } from '../interceptors/authfield.interceptor';


@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService) { }

    /**
     * This method retrieves all users
     * @return returns a promise of all users
     */
    @Get()
    findAll(): Promise<UsersInterface[]> {
        return this.userService.findAll();
    }

    /**
     * This method retrieves a user by its Id
     * @return returns a single user instance
     */
    @Get(':id')
    findOne(@Param('id') id): Promise<UsersInterface> {
        return this.userService.findOne(id);
    }

    /**
     * This method creates a new user
     * @return returns the new instance
     */
    @Post()
    create(@Body() createUserDto): Promise<UsersInterface> {
        return this.userService.create(createUserDto);
    }

    /**
     * This method deletes a  user
     * @return 204: returns empty body
     */
    @Delete(':id')
    delete(@Param('id') id): Promise<UsersInterface> {
        return this.userService.delete(id);
    }

    /**
     * This method updates a  user
     * @return returns updated instance
     */
    @Put(':id')
    update(@Body() updateUserDto, @Param('id') id): Promise<UsersInterface> {
        return this.userService.update(id, updateUserDto);
    }


    /**
     * This method logs a  user in
     * @return returns a jwt-signed user object from the LocalAuthGuard
     */
   // @UseInterceptors(AuthFieldInterceptor)
   @UseGuards(LocalAuthGuard)
   @Post('auth/login')
   async login(@Req() req) {
      const user = req.user;
      user.password = undefined; // delete user.password
      return user;
   }

   /**
    * This method retrieves a user's role
    * @return returns a role instance
    */
   @Get('user-role/:id')
   async getUserRole(@Param('id') id): Promise<RolesInterface> {
     const user = await this.userService.findOne(id);
     const role = await this.userService.appendUserRole(user);
     role.users = undefined; // delete role.users
     return role;
    }

    /**
     * This method retrieves a user's profile
     * @return returns a user instance
     */
    @UseGuards(JwtAuthGuard)
    @Get('profile')
     getProfile(@Req() req) {
       return req.user;
     }

}
