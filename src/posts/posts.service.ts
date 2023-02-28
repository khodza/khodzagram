import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './posts.model';
@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<Post>,
    private userService:UsersService
  ) {}

  async create(PostOpt: CreatePostDto,user){
    try {
      const wholeUser = await this.userService.findOne(user.userId,'username email posts');
      const post ={...PostOpt,author:wholeUser}
      const createdPost = await this.postModel.create(post);
      wholeUser.posts.unshift(createdPost.id)
      await wholeUser.save({validateBeforeSave:false})
      return createdPost;
    } catch (err) {
      throw new BadRequestException(err.message, err);
    }
  }

  async findAll(excludeFields?:string): Promise<Post[]> {
    try {
      const posts = await this.postModel.find().select(excludeFields);
      return posts;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async findOne(id: mongoose.Types.ObjectId): Promise<Post> {
    try {
      const post = await this.postModel.findById(id);
      if (!post) {
        throw new BadRequestException(`No post with this ID : ${id}`);
      }
      return post;
    } catch (err) {
      throw new BadRequestException(err.message,err);
    }
  }

  async update(id: mongoose.Types.ObjectId, updateOptions: UpdatePostDto,user) {
    try {
      let post =await this.postModel.findById(id)
      if (!post) {
        throw new BadRequestException(`No post with this id ${id}`);
      }
      const author =post.author;
      if(author.id!==user.userId){
        throw new BadRequestException(`You are not able to update this post`)
      }
      Object.keys(updateOptions).forEach((key)=>{
        post[key] =updateOptions[key]
      })
      post.save({validateBeforeSave:false})
      return post;
    } catch (err) {
      throw new BadRequestException(err.message,err);
    }
  }

  async remove(id: mongoose.Types.ObjectId,userJwt): Promise<{message:string}> {
    try { 
      const post = await this.postModel.findById(id);
      if (!post) {
        throw new BadRequestException(`No post with this ID : ${id}`);
      }
      const author =post.author;
      console.log(author,userJwt);
      if(author.id!==userJwt.userId){
        throw new BadRequestException(`You are not able to delete this post`)
      }
      await this.postModel.deleteOne({id:id})
      const user = await this.userService.findOne(userJwt.userId)
      const posts = user.posts.filter(pid=>pid !==id as unknown as mongoose.ObjectId)
      user.posts =posts
      await user.save({validateBeforeSave:false})
      return { message: `Post with ID ${id} has been deleted` };
    } catch (err) {
      throw new BadRequestException(err.message, err);
    }
  }
}


