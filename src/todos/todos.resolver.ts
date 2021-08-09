import { CreateTodoInput } from './input/create-todo.input';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Todo } from './todo.entity';
import { TodosService } from './todos.service';

@Resolver()
export class TodosResolver {
	constructor(private todosService: TodosService) {}

	@Query((returns) => [
		Todo
	])
	getTodos(): Promise<Todo[]> {
		return this.todosService.findAll();
	}

	@Mutation((returns) => Todo)
	createTodo(@Args('createTodoInput') createTodoInput: CreateTodoInput): Promise<Todo> {
		return this.todosService.create(createTodoInput);
	}
}
