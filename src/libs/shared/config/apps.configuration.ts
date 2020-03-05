import { IAppConfiguration, IAppServiceConfiguration, EmailConfiguration } from './apps.configuration.interface';
import { ApplicationEnvironment, CompanyType } from '@models';
import { StringUtil } from '@shared.all/utils';
import AppServicesConfigFactory from './app-service-config.factory';

export class Configuration {

    private static  configuration: AppConfiguration;

    public static getConfig(): AppConfiguration {
        if (!this.configuration) {
            const config: IAppConfiguration = {
                appEnv: ApplicationEnvironment[StringUtil.convertToCamelCase(process.env.NODE_ENV)],
                companyType: CompanyType[StringUtil.convertToCamelCase(process.env.APP)],
                appName: process.env.APP,
                natsUri: process.env.SERVER_NATS,
                sourceCDN: process.env.SOURCE_CDN,
                auth: {
                    secretKey: process.env.SECRET_KEY,
                    expireIn: 3600
                },
                email: {
                    host:  process.env.EMAIL_HOST,
                    username: process.env.EMAIL_USERNAME,
                    password: process.env.EMAIL_PASSWORD,
                    port: 587,
                    defaultEmail: process.env.DEFAULT_EMAIL
                }
            };
            // tslint:disable-next-line: no-use-before-declare
            this.configuration = new AppConfiguration(config);
        }
        return this.configuration;
    }
}

export class AppConfiguration implements IAppConfiguration {

    readonly apps: Map<string, IAppServiceConfiguration> = new Map();
    appEnv: ApplicationEnvironment;
    companyType: CompanyType;
    appName: string;
    natsUri: string;
    sourceCDN: string;
    auth: any;
    email: EmailConfiguration;

    constructor(config: IAppConfiguration) {
       this.appEnv = config.appEnv;
       this.companyType = config.companyType;
       this.appName = config.appName;
       this.natsUri = config.natsUri;
       this.sourceCDN = config.sourceCDN;
       this.auth = config.auth;
       this.email = config.email;
    }

    public addService(serviceName: string): void {
        const service = AppServicesConfigFactory.createService(serviceName);
        this.apps.set(serviceName, service);
    }

    public getService(serviceName: string): IAppServiceConfiguration {

        if (!this.apps.get(serviceName)) 
            this.addService(serviceName);
        return this.apps.get(serviceName);
    }
}