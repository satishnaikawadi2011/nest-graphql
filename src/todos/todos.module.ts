import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosResolver } from './todos.resolver';

@Module({
  providers: [TodosService, TodosResolver]
})
export class TodosModule {}
