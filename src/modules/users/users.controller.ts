import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateUserDto, PaginationQueryDto, UpdateUserDto } from './dto';
import { User } from './entities';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService){}

    @Get()
    getUsers(): Promise<User[]> {
        return this.userService.getUsers()
    }

    @Get('pagin')
    getUserQuery(@Query() pagination: PaginationQueryDto): Promise<User[]>{
        return this.userService.getUsersPagin(pagination);
    }

    @Get(':id')
    getUser(@Param('id') id: number): Promise<User>{

        return this.userService.getUserById(id);

    }

    @Post()
    createUser(@Body() body: CreateUserDto): Promise<CreateUserDto>{
              
        return this.userService.createUser(body);
    }

    @Patch(':id')
    updateUser(
        @Param('id') id: number,
        @Body() body: UpdateUserDto
    ): Promise<UpdateUserDto>{

        return this.userService.updateUser(id, body);
        
    }

    @Delete(':id')
    deleteUser(@Param('id') id: number,): Promise<void>{
              
        return this.userService.deleteUser(id);
    }
}
