
export class OrderUtil {
    
    public static generateOrderNumber(): string {
        const min = 100000000;
        const max = 999999999;
        return `${Math.floor(Math.random() * (max - min + 1)) + min}`;
    }
}