// import { User } from 'src/users/user.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

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

	@Field()
	@CreateDateColumn()
	created_at: Date;

	@Field()
	@UpdateDateColumn()
	updated_at: Date;

	@Field()
	@Column()
	userId: string;

	@ManyToOne(() => User, (user) => user.todos)
	@Field((type) => User)
	user: User;
}
