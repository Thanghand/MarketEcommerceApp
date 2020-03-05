




import * as dotenv from 'dotenv-flow';
dotenv.config();

import { BootstrapFactory } from '@shared.all/factories/bootstrap.factory';
import { AppOrdersMoudle } from './modules/app-orders.module';

async function bootstrap() {
    
    const appName = process.env.APP;
    await BootstrapFactory.runApp(AppOrdersMoudle, appName);
}
bootstrap();