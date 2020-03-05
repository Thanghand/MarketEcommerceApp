import * as dotenv from 'dotenv-flow';
dotenv.config();

import { BootstrapFactory } from '@shared.all/factories/bootstrap.factory';
import { AppProductsCategoriesModule } from './modules/app.products.categories.module';

async function bootstrap() {
    const appName = process.env.APP;
    await BootstrapFactory.runApp(AppProductsCategoriesModule, appName);
}
bootstrap();