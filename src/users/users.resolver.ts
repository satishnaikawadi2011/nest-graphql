import { UsersService } from './users.service';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './user.entity';
import { CreateUserInput } from './input/create-user.input';
import { BadRequestException, UseGuards } from '@nestjs/common';
import * as argon2 from 'argon2';
import { UpdateUserInput } from './input/update-user.input';
import { AuthService } from './auth.service';
import { AuthResponse } from './types';
import { AuthGuard } from 'src/guards/auth.guard';
import { SigninUserInput } from './input/signin-user.input';

@Resolver()
export class UsersResolver {
	constructor(private usersService: UsersService, private authService: AuthService) {}

	@Query((returns) => User)
	@UseGuards(AuthGuard)
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

	@Query((returns) => User)
	@UseGuards(AuthGuard)
	async me(@Context('userId') userId: string): Promise<User> {
		// console.log(userId);
		const user = await this.usersService.findOne(userId);
		if (!user) {
			throw new BadRequestException('user with given id not found!');
		}
		return user;
	}

	@Mutation((returns) => AuthResponse)
	async registerUser(@Args('createUserInput') createUserInput: CreateUserInput): Promise<AuthResponse> {
		return this.authService.signup(createUserInput);
	}

	@Mutation((returns) => AuthResponse)
	async signinUser(@Args('signinUserInput') signinUserInput: SigninUserInput): Promise<AuthResponse> {
		return this.authService.signin(signinUserInput);
	}

	@Mutation((returns) => User)
	@UseGuards(AuthGuard)
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
	@UseGuards(AuthGuard)
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
