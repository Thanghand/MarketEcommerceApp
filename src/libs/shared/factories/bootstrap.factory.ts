import * as express from 'express';
import * as compression from 'compression';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { Transport } from '@nestjs/common/enums/transport.enum';
import { Configuration } from '@shared.all/config';

export class BootstrapFactory {
    public static async runApp(module: any, appName: string, isSetGlobalPrefix: boolean = false): Promise<any> {
        console.log('App Name: ', isSetGlobalPrefix);
        const root = `${__dirname}/public`;
        const server = express()
            .disable('x-powered-by')
            .use(compression())
            .use(express.static(root));

        const swagerOptions = new DocumentBuilder()
            .setTitle(appName)
            .setDescription(`${appName} API Documents`)
            .setVersion('v1.0.0')
            .addBearerAuth();



        const startOptions = {
            module: module,
            globalPrefix: isSetGlobalPrefix ? appName : '/',
            port: 3000
        };

        console.log('App StartOptions: ', startOptions);

        swagerOptions.setBasePath(startOptions.globalPrefix);
        const app = await NestFactory.create(startOptions.module, new ExpressAdapter(server), {
            cors: true,
        });

        if (isSetGlobalPrefix)
            app.setGlobalPrefix(startOptions.globalPrefix);

        app.useGlobalPipes(new ValidationPipe({
            whitelist: true,
            transform: true,
            skipMissingProperties: true,
        }));

        const document = SwaggerModule.createDocument(app, swagerOptions.build());
        SwaggerModule.setup(`/docs`, app, document);

        console.log('Start to connect nats');
        const options = {
            transport: Transport.NATS,
            options: {
                url: Configuration.getConfig().natsUri,
            },
        };
        app.connectMicroservice(options);
        await app.startAllMicroservicesAsync();
        await app.listen(startOptions.port);
    }
}