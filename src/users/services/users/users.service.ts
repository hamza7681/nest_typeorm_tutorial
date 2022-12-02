import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/typeorm/entities/Post';
import { Profile } from 'src/typeorm/entities/Profile';
import { User } from 'src/typeorm/entities/User';
import {
  CreatePost,
  CreateProfile,
  CreateUserParams,
  UpdateUserParams,
} from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}
  createUser(userDetails: CreateUserParams) {
    const newUser = this.userRepository.create({
      ...userDetails,
      createdAt: new Date(),
    });
    return this.userRepository.save(newUser);
  }

  findUser() {
    return this.userRepository.find({ relations: ['profile', 'posts'] });
  }

  updateUser(id: number, updateUser: UpdateUserParams) {
    return this.userRepository.update({ id }, { ...updateUser });
  }

  deleteUser(id: number) {
    return this.userRepository.delete({ id });
  }

  async createProfile(id: number, profileData: CreateProfile) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      return {
        msg: 'User not found! Cannot create profile!',
        statusCode: 400,
        status: false,
      };
    }
    const profile = this.profileRepository.create(profileData);
    const saveProfile = await this.profileRepository.save(profile);
    user.profile = saveProfile;
    return this.userRepository.save(user);
  }

  async createPost(id: number, postData: CreatePost) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      return {
        msg: 'User not found! Cannot create profile!',
        statusCode: 400,
        status: false,
      };
    }
    const newPost = this.postRepository.create({ ...postData, user });
    return this.postRepository.save(newPost);
  }
}
