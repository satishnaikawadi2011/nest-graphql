import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosResolver } from './todos.resolver';
import { Todo } from './todo.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
	imports:
		[
			TypeOrmModule.forFeature([
				Todo
			]),
			JwtModule.register({
				secret: 'thisismysecret',
				signOptions: { expiresIn: '7d' }
			})
		],
	providers:
		[
			TodosService,
			TodosResolver
		]
})
export class TodosModule {}
