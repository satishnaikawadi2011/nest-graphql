import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Todo } from './todos/todo.entity';
import { TodosModule } from './todos/todos.module';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';

@Module({
	imports:
		[
			GraphQLModule.forRoot({
				autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
				context: ({ req }) => ({ headers: req.headers })
			}),
			TypeOrmModule.forRoot({
				type: 'sqlite',
				database: 'db.sqlite',
				entities:
					[
						User,
						Todo
					],
				synchronize: true
			}),
			TodosModule,
			UsersModule
		],
	controllers:
		[
			AppController
		],
	providers:
		[
			AppService
		]
})
export class AppModule {}
