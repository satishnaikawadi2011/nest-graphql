import { Field, ObjectType } from '@nestjs/graphql';
import { User } from './user.entity';

@ObjectType()
export class AuthResponse {
	@Field((type) => User)
	user: User;

	@Field() token: string;
}
