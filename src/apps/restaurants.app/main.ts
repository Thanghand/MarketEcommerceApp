import * as dotenv from 'dotenv-flow';
dotenv.config();

import { BootstrapFactory } from '@shared.all/factories/bootstrap.factory';
import { AppRestaurantsModule } from './modules/app-restaurants.module';

async function bootstrap() {
    
    const appName = process.env.APP;
    const app = await BootstrapFactory.runApp(AppRestaurantsModule, appName);
}
bootstrap();