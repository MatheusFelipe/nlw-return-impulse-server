import nodemailer from 'nodemailer';

import { SendMailData, MailAdapter } from '../mail-adapter';

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <feedback@widget.com.br>',
      to: 'Matheus Rodrigues<matheus.rodrigues@gx2.com.br>',
      subject,
      html: body,
    });
  }
}
