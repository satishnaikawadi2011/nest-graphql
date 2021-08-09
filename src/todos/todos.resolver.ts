import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class TodosResolver {
	@Query(() => String)
	hello() {
		return 'Hello World';
	}
}
