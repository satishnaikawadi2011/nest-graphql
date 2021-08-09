import { UsersService } from './users.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './user.entity';
import { CreateUserInput } from './input/create-user.input';
import { BadRequestException } from '@nestjs/common';
import * as argon2 from 'argon2';
import { UpdateUserInput } from './input/update-user.input';

@Resolver()
export class UsersResolver {
	constructor(private usersService: UsersService) {}

	@Query((returns) => User)
	async getUser(
		@Args('id', { type: () => String })
		id: string
	): Promise<User> {
		const user = await this.usersService.findOne(id);
		if (!user) {
			throw new BadRequestException('user with given id not found!');
		}
		return user;
	}

	@Mutation((returns) => User)
	async registerUser(@Args('createUserInput') createUserInput: CreateUserInput): Promise<User> {
		const { email, password, username } = createUserInput;
		const isExistAlready = await this.usersService.findByEmailOrUsername(email, username);
		if (isExistAlready.length) {
			throw new BadRequestException('User with this email or username already exists !!');
		}
		const hashedPassword = await argon2.hash(password);
		return this.usersService.create({ email, password: hashedPassword, username });
	}

	@Mutation((returns) => User)
	async removeUser(
		@Args('id', { type: () => String })
		id: string
	): Promise<User> {
		const user = await this.usersService.remove(id);
		if (!user) {
			throw new BadRequestException('user with given id not found!');
		}
		return user;
	}

	@Mutation((returns) => User)
	async updateUser(
		@Args('id', { type: () => String })
		id: string,
		@Args('updateUserInput', { nullable: true })
		updateUserInput: UpdateUserInput
	): Promise<User> {
		const user = await this.usersService.update(id, updateUserInput);
		return user;
	}
}
