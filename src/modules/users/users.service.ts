import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, PaginationQueryDto, UpdateUserDto } from './dto';
import { User } from './entities';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ){}

    async getUsers(): Promise<User[]> {
        return await this.userRepository.find({
            relations: ['comments']
        });
    }

    async getUsersPagin({ limit, offset }: PaginationQueryDto): Promise<User[]> {
        return await this.userRepository.find({
            relations: ['comments'],
            skip: offset, 
            take: limit
        });
    }

    async getUserById(id: number): Promise<User>{
        const user = await this.userRepository.findOneBy({id});

        if(!user){
            throw new NotFoundException('Resourse not found')
        }

        return user;
    }

    createUser({ name }: CreateUserDto): Promise<CreateUserDto>{
        const user: User = this.userRepository.create({name});
        return this.userRepository.save(user);
    }

    async updateUser(id: number, { name }: UpdateUserDto){
        const user: User = await this.userRepository.preload({
            id,
            name
        });

        if(!user){
            throw new NotFoundException('Resourse not found')
        }

        this.userRepository.save(user);

        return user;
    }

    async deleteUser(id: number): Promise<void>{
        const user: User = await this.userRepository.findOneBy({id});

        if(!user){
            throw new NotFoundException('Resourse not found')
        }

        this.userRepository.remove(user);
    }


}
