import { ApplicationEnvironment, CompanyType } from '@models';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export interface MongoModel {
    uri: string;
    port: string;
    dbName: string;
    userName?: string;
    password?: string;
    connection: string;
}

export class MongoConfiguration {
   
    constructor(private readonly config: MongoModel) {
    }

    public getMongoTypeOrmOptions(): TypeOrmModuleOptions {
        const options: TypeOrmModuleOptions = {
            type: 'mongodb',
            name: this.config.connection,
            url: this.config.uri,
            database: this.config.dbName,
            // port: Number(this.config.port),
            username: this.config.userName,
            password: this.config.password,
            synchronize: true,
            useNewUrlParser: true,
        };
        return options;
    }

    public getConnection(): string {
        return this.config.connection;
    }
}

export interface IAppServiceConfiguration {
    name: string;
    appEnv: ApplicationEnvironment;
    sourceCDN: string;
    httpPort?: string;
    mongodb?: MongoConfiguration;
}


export interface EmailConfiguration {
    host: string;
    username: string;
    password: string;
    defaultEmail: string;
    port: number;
}
export interface IAppConfiguration {
    readonly apps?: Map<string, IAppServiceConfiguration>;
    appEnv: ApplicationEnvironment;
    companyType: CompanyType;
    appName: string;
    natsUri: string;
    sourceCDN: string;
    auth: {
        secretKey: string,
        expireIn: number
    };
    email: EmailConfiguration;
}