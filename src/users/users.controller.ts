import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import db from 'src/DataBase/tursoConnection';

@Controller('users')
export class UsersController {
  @Get()
  async getUser() {
    try {
      const users = await db.execute(`SELECT * FROM users`);
      console.log(users);
      return users;
    } catch (error) {
      console.log(error);
      return { error: error.message };
    }
  }

  @Post()
  async createUser() {
    try {
      const createUser = await db.execute(
        `INSERT INTO users (name, email, password) VALUES ('Pepito', 'Pepito', '123Pepa');
        ,`,
      );
      return createUser;
    } catch (error) {
      console.log(error);
      return { error: error.message };
    }
  }
  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    try {
      const deleteUser = await db.execute({
        sql: 'DELETE FROM users WHERE id = (:id)',
        args: { id },
      });
      return deleteUser;
    } catch (error) {
      console.log(error);
      return { error: error.message };
    }
  }
}
