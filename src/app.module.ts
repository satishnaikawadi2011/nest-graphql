import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { UsersModule } from './users/users.module';

@Module({
	imports:
		[
			TodosModule,
			GraphQLModule.forRoot({
				autoSchemaFile: join(process.cwd(), 'src/schema.gql')
			}),
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
