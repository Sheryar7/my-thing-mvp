import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface UserContext {
  userId: string;
  email?: string;
}

/**
 * Custom decorator to extract the current user ID.
 * Defaults to 'creator_user_default' or reads from 'x-user-id' header.
 * When Clerk is integrated, this decorator will extract request.auth.userId seamlessly.
 */
export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    return (
      request.headers['x-user-id'] ||
      request.user?.id ||
      'creator_user_default'
    );
  },
);
