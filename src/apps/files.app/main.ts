




import * as dotenv from 'dotenv-flow';
dotenv.config();

import { BootstrapFactory } from '@shared.all/factories/bootstrap.factory';
import { AppFilesModule } from './modules/app-files.module';

async function bootstrap() {
    await BootstrapFactory.runApp(AppFilesModule, 'files', true);
}
bootstrap();