import { createParamDecorator } from '@nestjs/common';
import { TokenUserPayload } from '@models';

export const UserId = createParamDecorator((data, req) => {
    const user = req['user'];
    return user ? user._id : '';
});

export const CurrentUser = createParamDecorator((data, req) => {
    return req['user'] as TokenUserPayload;
});

export const Token = createParamDecorator((data, req) => {
    return req['token'] as string;
});