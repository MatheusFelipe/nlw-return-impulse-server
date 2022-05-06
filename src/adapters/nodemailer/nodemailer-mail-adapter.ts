import nodemailer from 'nodemailer';

import { SendMailData, MailAdapter } from '../mail-adapter';

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: 'b283b57002b352',
    pass: 'a642b7eadb01a0',
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
