import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { Comment } from './entities';

@Module({
    imports: [TypeOrmModule.forFeature([Comment, User])],
    controllers: [CommentsController],
    providers: [CommentsService]
})
export class CommentsModule {}
