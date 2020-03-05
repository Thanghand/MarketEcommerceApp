import * as dotenv from 'dotenv-flow';
dotenv.config();

import { BootstrapFactory } from '@shared.all/factories/bootstrap.factory';
import { GatewayModule } from './modules/gateways.module';

async function bootstrap() {
    
    const appName = process.env.APP;
    await BootstrapFactory.runApp(GatewayModule, appName);
}
bootstrap();