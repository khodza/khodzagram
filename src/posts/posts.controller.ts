import { Body, Controller, Get, Param, Post, UseGuards , Request, Patch, Delete } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { getMongoDbId } from 'src/users/dto/mongodbID.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
    constructor(private postService:PostsService){}

    //GET ALL POSTS
    @Get()
    async getAllPosts(){   
        return this.postService.findAll()
    }

    //GET POST
    @Get(':id')
    async getPost(@Param() params:getMongoDbId){
        return  this.postService.findOne(params.id)
    }

    //CREATE POST
    @UseGuards(JwtAuthGuard)
    @Post()
    createPost(@Request() req, @Body() body:CreatePostDto){
        return this.postService.create(body,req.user)
    }

    //UPDATE POST
    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    updatePost(@Param() params:getMongoDbId,@Body() body:UpdatePostDto, @Request() req){
        return this.postService.update(params.id,body,req.user)
    }

    //DELETE POST
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    deletePost(@Param() params:getMongoDbId,@Request() req){
        return this.postService.remove(params.id,req.user)
    }
}
