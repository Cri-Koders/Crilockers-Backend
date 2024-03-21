import { Body, Controller, Delete, Get, Param, Patch, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUser } from './dto/updateUser.dto'

@Controller('user')
export class UserController {
     constructor(private readonly _userService: UserService) {}

     @Get()
     getUsers() {
          return this._userService.getUsers();
     }

     @Get(':id')
     getUser(@Param('id') id: string) {
          return this._userService.getUserById(id);
     }

     @Patch(':id')
     updateUser(@Param('id') id: string, @Body() user : UpdateUser) {
          return this._userService.updateUser(id, user);
     }
     
     @Delete(':id')
     deleteUser(@Param('id') id: string) {
          return this._userService.deleteUser(id);
     }

}
