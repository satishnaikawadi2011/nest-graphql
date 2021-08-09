import { UpdateUserInput } from './input/update-user.input';
import { CreateUserInput } from './input/create-user.input';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

interface FindAttrs {
	email: string;
	username: string;
}

@Injectable()
export class UsersService {
	constructor(@InjectRepository(User) private repo: Repository<User>) {}

	create({ email, password, username }: CreateUserInput) {
		const user = this.repo.create({ email, password, username });
		return this.repo.save(user);
	}

	findOne(id: string) {
		if (!id) return null;
		return this.repo.findOne(id);
	}

	find(attrs: Partial<FindAttrs>) {
		return this.repo.find(attrs);
	}

	findByEmailOrUsername(email: string, username: string) {
		return this.repo.find({
			where:
				[
					{ email },
					{ username }
				]
		});
	}

	async update(id: string, attrs?: UpdateUserInput) {
		const user = await this.findOne(id);
		if (!user) {
			throw new NotFoundException('user not found!');
		}
		Object.assign(user, attrs);
		return this.repo.save(user);
	}

	async remove(id: string) {
		const user = await this.findOne(id);
		if (!user) {
			throw new NotFoundException('user not found!');
		}
		await this.repo.remove(user);
		Object.assign(user, { id });
		return user;
	}
}
