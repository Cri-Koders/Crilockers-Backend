import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { prisma } from 'src/DataBase/tursoConnection';

@Controller('users')
export class UsersController {
  @Get()
  async getUser() {
    try {
      const allUsers = await prisma.users.findMany();
      console.log(allUsers);
      return allUsers;
    } catch (error) {
      console.log(error);
      return { error: error.message };
    }
  }

  @Post()
  async createUser() {
    try {
      const createUser = await prisma.users.create({
        data: {
          name: 'Fede Bastias',
          email: 'gabi.bastias@gmail.com',
          password: '123Gabi',
        },
      });
      return createUser;
    } catch (error) {
      console.log(error);
      return { error: error.message };
    }
  }
  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    try {
      // const deleteUser = await db.execute({
      //   sql: 'DELETE FROM users WHERE id = (:id)',
      //   args: { id },
      // });
      // return deleteUser;
    } catch (error) {
      console.log(error);
      return { error: error.message };
    }
  }
}
