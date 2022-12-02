import { Controller, Get, Post, Put, Param, Delete } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators';
import { CreatePostDto } from 'src/users/dtos/createPost.dto';
import { CreateProfile } from 'src/users/dtos/createProfile.dto';
import { CreateUserDto } from 'src/users/dtos/createUser.dto';
import { UpdateUserDto } from 'src/users/dtos/updateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get()
  async geUsers() {
    try {
      const users = await this.userService.findUser();
      return users;
    } catch (error) {
      console.log(error);
    }
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.createUser(createUserDto);
      return { user, msg: 'User created successfully' };
    } catch (error) {
      console.log(error);
    }
  }

  @Put(':id')
  async updateUserById(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      this.userService.updateUser(id, updateUserDto);
      return { msg: 'User update successfully' };
    } catch (error) {
      console.log(error);
    }
  }

  @Delete(':id')
  async deleteUserById(@Param('id') id: number) {
    try {
      await this.userService.deleteUser(id);
      return { msg: 'user deleted successfully' };
    } catch (error) {
      console.log(error);
    }
  }

  @Post(':id/profiles')
  async createProfile(
    @Param('id') id: number,
    @Body() createProfileDto: CreateProfile,
  ) {
    try {
      const profile = await this.userService.createProfile(
        id,
        createProfileDto,
      );
      return profile;
    } catch (error) {
      console.log(error);
    }
  }

  @Post(':id/posts')
  async createPost(
    @Param('id') id: number,
    @Body() createPostDto: CreatePostDto,
  ) {
    try {
      const posts = await this.userService.createPost(id, createPostDto);
      return posts
    } catch (error) {
      console.log(error);
    }
  }
}
