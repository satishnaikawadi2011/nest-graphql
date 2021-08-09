import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports:
		[
			TypeOrmModule.forFeature([
				User
			])
		],
	providers:
		[
			UsersService,
			UsersResolver
		]
})
export class UsersModule {}
