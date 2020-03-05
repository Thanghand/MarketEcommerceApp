import { IAppServiceConfiguration, MongoConfiguration } from './apps.configuration.interface';
import { ApplicationEnvironment } from '@models';
import { StringUtil } from '@shared.all/utils';
import { AppServiceNameConfig } from './app-name-config.enum';


export default class AppServicesConfigFactory {

    public static createService(name: string): IAppServiceConfiguration {

        switch (name) {
            case AppServiceNameConfig.Id: {
                const app: IAppServiceConfiguration = {
                    name: 'id',
                    appEnv: ApplicationEnvironment[StringUtil.convertToCamelCase(process.env.NODE_ENV)],
                    sourceCDN: process.env.SOURCE_CDN,
                    mongodb: new MongoConfiguration({
                        uri: process.env.DATABASE_HOST,
                        port: process.env.DATABASE_PORT,
                        dbName: 'techno-food-id',
                        userName: process.env.DATABASE_USER,
                        password: process.env.DATABASE_PASS,
                        connection: 'app.techno-food-users',
                    })
                };
                return app;
            }

            case AppServiceNameConfig.ProductsCategoires: {
                const app: IAppServiceConfiguration = {
                    name: 'products-categories',
                    appEnv: ApplicationEnvironment[StringUtil.convertToCamelCase(process.env.NODE_ENV)],
                    sourceCDN: process.env.SOURCE_CDN,
                    mongodb: new MongoConfiguration({
                        uri: process.env.DATABASE_HOST,
                        port: process.env.DATABASE_PORT,
                        dbName: 'techno-food-products-categories',
                        userName: process.env.DATABASE_USER,
                        password: process.env.DATABASE_PASS,
                        connection: 'app.techno-food-products-categories',
                    })
                };
                return app;
            }

            case AppServiceNameConfig.Orders: {
                const app: IAppServiceConfiguration = {
                    name: 'orders',
                    appEnv: ApplicationEnvironment[StringUtil.convertToCamelCase(process.env.NODE_ENV)],
                    sourceCDN: process.env.SOURCE_CDN,
                    mongodb: new MongoConfiguration({
                        uri: process.env.DATABASE_HOST,
                        port: process.env.DATABASE_PORT,
                        dbName: 'techno-food-orders',
                        userName: process.env.DATABASE_USER,
                        password: process.env.DATABASE_PASS,
                        connection: 'app.techno-food-orders',
                    })
                };
                return app;
            }

            case AppServiceNameConfig.Restaurants: {
                const app: IAppServiceConfiguration = {
                    name: 'restaurants',
                    appEnv: ApplicationEnvironment[StringUtil.convertToCamelCase(process.env.NODE_ENV)],
                    sourceCDN: process.env.SOURCE_CDN,
                    mongodb: new MongoConfiguration({
                        uri: process.env.DATABASE_HOST,
                        port: process.env.DATABASE_PORT,
                        dbName: 'techno-food-restaurants',
                        userName: process.env.DATABASE_USER,
                        password: process.env.DATABASE_PASS,
                        connection: 'app.techno-food-restaurants',
                    })
                };
                return app;
            }

            case AppServiceNameConfig.Suppliers: {
                const app: IAppServiceConfiguration = {
                    name: 'suppliers',
                    appEnv: ApplicationEnvironment[StringUtil.convertToCamelCase(process.env.NODE_ENV)],
                    sourceCDN: process.env.SOURCE_CDN,
                    mongodb: new MongoConfiguration({
                        uri: process.env.DATABASE_HOST,
                        port: process.env.DATABASE_PORT,
                        dbName: 'techno-food-suppliers',
                        userName: process.env.DATABASE_USER,
                        password: process.env.DATABASE_PASS,
                        connection: 'app.techno-food-suppliers',
                    })
                };
                return app;
            }

            case AppServiceNameConfig.Company: {
                const app: IAppServiceConfiguration = {
                    name: 'company',
                    appEnv: ApplicationEnvironment[StringUtil.convertToCamelCase(process.env.NODE_ENV)],
                    sourceCDN: process.env.SOURCE_CDN,
                    mongodb: new MongoConfiguration({
                        uri: process.env.DATABASE_HOST,
                        port: process.env.DATABASE_PORT,
                        dbName: 'techno-food-company',
                        userName: process.env.DATABASE_USER,
                        password: process.env.DATABASE_PASS,
                        connection: 'app.techno-food-company',
                    })
                };
                return app;
            }

            case AppServiceNameConfig.Membership: {
                const app: IAppServiceConfiguration = {
                    name: 'memberships',
                    appEnv: ApplicationEnvironment[StringUtil.convertToCamelCase(process.env.NODE_ENV)],
                    sourceCDN: process.env.SOURCE_CDN,
                    mongodb: new MongoConfiguration({
                        uri: process.env.DATABASE_HOST,
                        port: process.env.DATABASE_PORT,
                        dbName: 'techno-food-memberships',
                        userName: process.env.DATABASE_USER,
                        password: process.env.DATABASE_PASS,
                        connection: 'app.techno-food-memberships',
                    })
                };
                return app;
            }

            case AppServiceNameConfig.ShoppingCarts: {
                const app: IAppServiceConfiguration = {
                    name: 'carts',
                    appEnv: ApplicationEnvironment[StringUtil.convertToCamelCase(process.env.NODE_ENV)],
                    sourceCDN: process.env.SOURCE_CDN,
                    mongodb: new MongoConfiguration({
                        uri: process.env.DATABASE_HOST,
                        port: process.env.DATABASE_PORT,
                        dbName: 'techno-food-products-categories',
                        userName: process.env.DATABASE_USER,
                        password: process.env.DATABASE_PASS,
                        connection: 'app.techno-food-products-categories',
                    })
                };
                return app;
            }

            case AppServiceNameConfig.FilesCreators: {
                const app: IAppServiceConfiguration = {
                    name: 'file-creators',
                    appEnv: ApplicationEnvironment[StringUtil.convertToCamelCase(process.env.NODE_ENV)],
                    sourceCDN: process.env.SOURCE_CDN,
                };
                return app;
            }

            case AppServiceNameConfig.FilesManagers: {
                const app: IAppServiceConfiguration = {
                    name: 'file-manager',
                    appEnv: ApplicationEnvironment[StringUtil.convertToCamelCase(process.env.NODE_ENV)],
                    sourceCDN: process.env.SOURCE_CDN,
                };
                return app;
            }
        }
        return null;
    }
}