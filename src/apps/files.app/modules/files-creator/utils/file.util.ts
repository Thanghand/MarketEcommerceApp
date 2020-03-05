import * as fs from 'fs';

export class FileUtil {

    public static getLogoContent(supplierId: string): string {
        try {
            const data = fs.readFileSync(`./logos-base64/${supplierId}`).toString();
            return data;
        } catch (ex) {
            const defaultLogo = fs.readFileSync(`./logos/default-logo`).toString();
            return defaultLogo;
        }
    }

    public static getTechnoFoodLogo(): string {
        const data = fs.readFileSync(`./logos/technofood-logo`).toString();
        return data;
    }
}