
import * as dotenv from 'dotenv-flow';
dotenv.config();

import { BootstrapFactory } from '@shared.all/factories/bootstrap.factory';
import { AppMemberShipModule } from './modules/app-membership.module';

async function bootstrap() {
    
    const appName = process.env.APP;
    await BootstrapFactory.runApp(AppMemberShipModule, appName);
}
bootstrap();