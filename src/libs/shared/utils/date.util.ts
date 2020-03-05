
import * as moment from 'moment';

export class DateUtil {


    public static convertStringToDate(date: string): Date {
        return new Date(date);
    }

    public static isValidDate(input: string): boolean {
        try {
            var date = new Date(input);
            return date.getTime() === date.getTime();
        } catch (ex) {
            return false;
        }
    }

    public static formartYearMonthDate(date: string): string {
        return moment(new Date(date)).format('DD/MM/YYYY');
    }


}