import { RouteInfo } from '@nestjs/common/interfaces';
import { AppServiceNameConfig } from '@shared.all/config';


export class ExecluedRoutes {
    private readonly excluedRoutes: Map<AppServiceNameConfig, RouteInfo[]> = new Map();

    private static readonly instance: ExecluedRoutes = new ExecluedRoutes();

    public static getInstance() {
        return this.instance;
    }

    public addExecluedRoutes(service: AppServiceNameConfig, routes: RouteInfo[]): void {
        if (!this.excluedRoutes.get(service))
            this.excluedRoutes.set(service, routes);
    }

    public isContain(request: string): boolean {
        for (const [k, routes] of this.excluedRoutes) {
            for (const r of routes) {
                if (request.search(r.path) !== -1)
                    return true;
            }
        }
        return false;
    }
}