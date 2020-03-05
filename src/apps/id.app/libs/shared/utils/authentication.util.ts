import * as bcrypt from 'bcryptjs';

export class AuthenticationUtil {
    
    public static hashPassword(passord: string): string {
        const salt = bcrypt;
        return bcrypt.hashSync(passord, 10); 
    }

    public static comparePassword(passord: string, hashPassword: string): boolean {
        return bcrypt.compareSync(passord, hashPassword);
    }

    public static generateString(strLength: number): string {
        if (strLength) {
            const possibleCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    
            // Start the final string
            let  str = '';
            for (let i = 1; i <= strLength; i++) {
                const randomCharacter = possibleCharacters.
                                            charAt(Math.floor(Math.random() * possibleCharacters.length));
                str += randomCharacter;
            }
            return str;
        } else {
            return '';
        }
    }
}