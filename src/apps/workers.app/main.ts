import * as dotenv from 'dotenv-flow';
dotenv.config();

import { BootstrapFactory } from '@shared.all/factories/bootstrap.factory';
import { AppWorkersModule } from './app.workers.module';

async function bootstrap() {
    
    const appName = process.env.APP;
    await BootstrapFactory.runApp(AppWorkersModule, appName);
}
bootstrap();