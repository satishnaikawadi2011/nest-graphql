import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosResolver } from './todos.resolver';
import { Todo } from './todo.entity';

@Module({
	imports:
		[
			TypeOrmModule.forFeature([
				Todo
			])
		],
	providers:
		[
			TodosService,
			TodosResolver
		]
})
export class TodosModule {}
