import * as dotenv from 'dotenv-flow';
dotenv.config();

import { IdModule } from './modules/id.module';
import { BootstrapFactory } from '@shared.all/factories/bootstrap.factory';

async function bootstrap() {
    const appName = process.env.APP;
    await BootstrapFactory.runApp(IdModule, appName);
}
bootstrap();