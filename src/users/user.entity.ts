// import { Todo } from 'src/todos/todo.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()
@Entity()
export class User {
	@Field()
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Field()
	@Column({ unique: true })
	username: string;

	@Field()
	@Column()
	email: string;

	// @Field()
	@Column() password: string;

	@Field()
	@CreateDateColumn()
	created_at: Date;

	@Field()
	@UpdateDateColumn()
	updated_at: Date;

	// @OneToMany(() => Todo, (todo) => todo.user)
	// todos: Todo[];
}
