import { createParamDecorator } from '@nestjs/common';

export const LoggedUser = createParamDecorator((data, req) => req.user);
