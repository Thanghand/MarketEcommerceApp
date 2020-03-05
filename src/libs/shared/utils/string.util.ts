

export class StringUtil {
    public static convertToCamelCase(input: string): string {
        if (!input)
            return '';
        return input.replace(input[0], input[0].toUpperCase());
        
    }
}