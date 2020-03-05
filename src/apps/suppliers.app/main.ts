import * as dotenv from 'dotenv-flow';
dotenv.config();

import { BootstrapFactory } from '@shared.all/factories/bootstrap.factory';
import { AppSuppliersModule } from './modules/app-suppliers.module';

async function bootstrap() {
    
    const appName = process.env.APP;
    await BootstrapFactory.runApp(AppSuppliersModule, appName);
}
bootstrap();