import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UsersDocument } from './users/models/users.model';

const getCurrentUser = (context: ExecutionContext): UsersDocument => {
  return context.switchToHttp().getRequest().user;
};
export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => getCurrentUser(context),
);
