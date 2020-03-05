import { Injectable } from '@nestjs/common';
import { MailService, MailInformation } from '../services/mail.service';

@Injectable()
export class SendTestUseCase {

    constructor(private readonly mailService: MailService) {}
    public example(): void {
        const mailInfo: MailInformation = {
            toEmail: 'caohoangthang93@gmail.com',
            subject: 'Hello Word',
            text: 'Hello word',
            html: '<p>Your html here</p>'
        };
        this.mailService.sendEmail(mailInfo);
    }
}