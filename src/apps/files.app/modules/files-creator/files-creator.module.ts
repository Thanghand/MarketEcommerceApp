import { Module, RequestMethod } from '@nestjs/common';
import { FilesCreatorController } from './controllers/files.creator.controller';
import { PdfMakerService } from './services/pdfmake/pdf.maker.service';
import { RouteInfo} from '@nestjs/common/interfaces';
import { CreateInvoicePdfUseCase, CreateOrderPdfUseCase } from './use.cases';
import { ExecluedRoutes } from '@shared.all/middlewares/exclued.routes';
import { AppServiceNameConfig } from '@shared.all/config';
import { LibAuthModule } from '@libs/lib.auth/lib.auth.module';
import { NatsClientService } from '@libs/nats/nats-client.service';
import { ClientRepositoriesModule } from '@libs/repositories/client-repositories.module';

const excludeCreatorRoutes: RouteInfo[] = [
    {
        path: '/creators',
        method: RequestMethod.GET
    }
];

ExecluedRoutes.getInstance()
    .addExecluedRoutes(AppServiceNameConfig.FilesCreators, excludeCreatorRoutes);


@Module({
    imports: [
        LibAuthModule,
        ClientRepositoriesModule,
    ],
    controllers: [
        FilesCreatorController
    ],
    providers: [
        NatsClientService,
        PdfMakerService,
        CreateInvoicePdfUseCase,
        CreateOrderPdfUseCase,
    ],
})
export class FilesCreatorModule {

}