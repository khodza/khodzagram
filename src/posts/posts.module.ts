import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';
import { PostsController } from './posts.controller';
import { PostSchema } from './posts.model';
import { PostsService } from './posts.service';

@Module({
  imports:[
    MongooseModule.forFeature([{name:'Post',schema:PostSchema}]),UsersModule
  ],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
