import * as dotenv from 'dotenv-flow';
dotenv.config();

import { BootstrapFactory } from '@shared.all/factories/bootstrap.factory';
import { AppsModule } from './modules/apps.module';

async function bootstrap() {
    const appName = process.env.APP;
    await BootstrapFactory.runApp(AppsModule, appName);
}
bootstrap();