import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoInput } from './input/create-todo.input';
import { Todo } from './todo.entity';

@Injectable()
export class TodosService {
	constructor(@InjectRepository(Todo) private repo: Repository<Todo>) {}

	create(createTodoInput: CreateTodoInput) {
		const todo = this.repo.create(createTodoInput);
		// todo.user = user;
		return this.repo.save(todo);
	}

	findAll() {
		return this.repo.find();
	}
}
