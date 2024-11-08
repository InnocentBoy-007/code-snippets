import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config();

export class SentMail {
    constructor() {
        // this.host = process.env.MAILHOST; (don't need this one)
        this.user = process.env.SENDERMAIL;
        this.pass = process.env.MAILPASS;
        this.from = process.env.MAILFROM;
        this.transporter = null;
    }
    async setUp() {
        try {
            const transporter = nodemailer.createTransport({
                service: 'gmail', // (use 'gmail' if the email service provider is gmail)
                auth: {
                    user:this.user,
                    pass: this.pass // (use the gmail app password)
                }
            })
            this.transporter = transporter;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async sentMail(to, subject, text) {
        try {
            const info = await this.transporter.sendMail({
                from: this.from,
                to: to,
                subject: subject,
                text: text
            })
            return info;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}
