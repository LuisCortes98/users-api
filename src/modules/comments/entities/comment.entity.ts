import { User } from "src/modules/users/entities";
import { Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Entity } from "typeorm";

@Entity({name:'comments'})
export class Comment {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({nullable: false})
    message: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @ManyToOne((type) => User, (user) => user.comments, {cascade: true} )
    @JoinColumn({ name: "user_id" })
    user: User
}