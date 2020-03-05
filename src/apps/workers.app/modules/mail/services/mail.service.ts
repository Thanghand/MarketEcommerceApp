import { Injectable } from '@nestjs/common';
import nodemailer = require('nodemailer');
import { Configuration } from '@shared.all/config';


export interface MailInformation {
    toEmail: string;
    subject: string;
    text: string;
    html: string;
    cc?: string[];
}

@Injectable()
export class MailService {

    private readonly transporter: any;
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: Configuration.getConfig().email.host,
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: Configuration.getConfig().email.username, // generated ethereal user
                pass: Configuration.getConfig().email.password // generated ethereal password
            }
        });
    }

    async sendEmail(mailInfo: MailInformation): Promise<void> {
        await this.transporter.sendMail({
            from: Configuration.getConfig().email.defaultEmail, // sender address
            to: mailInfo.toEmail, // list of receivers
            subject: mailInfo.subject, // Subject line
            text: mailInfo.text, // plain text body
            html: mailInfo.html, // html body,
            cc: mailInfo.cc ? mailInfo.cc : []
        });
    }

}