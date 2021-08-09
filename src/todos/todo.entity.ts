// import { User } from 'src/users/user.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Todo {
	@Field()
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Field()
	@Column()
	title: string;

	@Field()
	@Column()
	description: string;

	// @ManyToOne(() => User, (user) => user.todos)
	// user: User;
}
