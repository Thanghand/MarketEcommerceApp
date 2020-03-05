import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Configuration } from '@shared.all/config';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: Configuration.getConfig().auth.secretKey,
            signOptions: {
            expiresIn: Configuration.getConfig().auth.expireIn,
            },
      }),
    ],
    exports: [
        PassportModule,
        JwtModule,
    ]
})
export class LibAuthModule {}