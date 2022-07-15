import { Controller, Get, Post, Body } from '@nestjs/common';
import { Comment } from './entities';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-user.dto';

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService){}

    @Get()
    getComments(): Promise<Comment[]> {
        return this.commentsService.getComments()
    }

    @Post()
    createUser(@Body() body: CreateCommentDto): Promise<CreateCommentDto>{
              
        return this.commentsService.createComment(body);
    }

}
