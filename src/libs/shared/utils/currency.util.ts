
export class CurrencyUtil {
    public static convertNumberToVND(number: number): string {
        return number.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
    }
}