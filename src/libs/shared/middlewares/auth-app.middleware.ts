import { NestMiddleware, UnauthorizedException, Injectable, Inject } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ExecluedRoutes } from './exclued.routes';
import { TokenUserPayload } from '@models';

@Injectable()
export class AuthAppMiddleWare implements NestMiddleware {

    constructor(private readonly jwtService: JwtService,) {}
    use(req: Request, res: Response, next: () => void) {

        console.log(`Request method @${req.method} with url: ${req.url}`);
        const isExcludedPath = ExecluedRoutes.getInstance().isContain(req.url);
        
        if (isExcludedPath) {
            next();
            return;
        }
        
        let token = req.headers.authorization;
        if (token) {
            const bearer = 'Bearer';
            try {
                if (token.search(bearer) === -1)
                    throw new UnauthorizedException();

                token = token.replace(bearer, '').trim();
                const payload = this.jwtService.decode(token) as TokenUserPayload;
                if (!payload)
                    throw new UnauthorizedException();
                
                req['user'] = payload;
                req['token'] = token;
            } catch (error) {
                console.log(error);
                throw new UnauthorizedException();
            }
        } else {
            throw new UnauthorizedException();
        }
        next();
    }
    
}