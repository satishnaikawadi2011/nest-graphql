import { AuthGuard } from 'src/guards/auth.guard';
import { CreateTodoInput } from './input/create-todo.input';
import { Args, Context, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Todo } from './todo.entity';
import { TodosService } from './todos.service';
import { UseGuards } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';

@Resolver((of) => Todo)
export class TodosResolver {
	constructor(private todosService: TodosService, private usersService: UsersService) {}

	@Query((returns) => [
		Todo
	])
	async getTodos(): Promise<Todo[]> {
		return this.todosService.findAll();
	}

	@UseGuards(AuthGuard)
	@Mutation((returns) => Todo)
	async createTodo(
		@Args('createTodoInput') createTodoInput: CreateTodoInput,
		@Context('userId') userId: string
	): Promise<Todo> {
		const user = await this.usersService.findOne(userId);
		return this.todosService.create(createTodoInput, user);
	}

	@ResolveField((returns) => User)
	user(@Parent() todo: Todo): Promise<User> {
		return this.usersService.findOne(todo.userId);
	}
}
