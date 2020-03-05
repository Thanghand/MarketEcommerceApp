import { Module } from '@nestjs/common';
import { SuppliersModule } from '.';


@Module({
    imports: [
        SuppliersModule
    ]
})
export class AppSuppliersModule {
    constructor() {
       
    }
}