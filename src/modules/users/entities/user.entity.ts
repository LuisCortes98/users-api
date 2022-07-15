import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Comment } from "../../comments/entities/comment.entity";

@Entity({name:'users'})
export class User {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column({nullable: true})
    document?: string;

    @OneToMany((type) => Comment, (comment) => comment.user)
    comments: Comment[]
}