import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities';
import { CreateCommentDto } from './dto/create-user.dto';
import { Comment } from './entities';

@Injectable()
export class CommentsService {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Comment) private readonly commentRepository: Repository<Comment>
    ){}

    async getComments(): Promise<Comment[]> {
        return await this.commentRepository.find({
            relations: ['user']
        });
    }

    createComment({ message, user }: CreateCommentDto): Promise<CreateCommentDto>{
        const comment: Comment = this.commentRepository.create({message, user});
        return this.commentRepository.save(comment);
    }

}
