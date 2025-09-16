import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Mail } from 'src/common/types/Mail.type';

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_KEY,
      },
    });
  }

  async sendMail(mail: Mail) {
    const { to, subject, text, html } = mail;

    const info = await this.transporter.sendMail({
      from: `"AiqFome" <${process.env.MAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });

    return info;
  }

  prepareVerificationEmail(email: string, token: string): Mail {
    return {
      to: email,
      subject: 'AiqFome (Desafio tecnico) - Recebimento de chave de API',
      text: `A sua API Key para registro de favoritos, recebimento de produtos por nossas rotas é: ${token}`,
      html: '',
    };
  }

  async sendVerificationEmail(email: string, token: string) {
    const verificationMail = this.prepareVerificationEmail(email, token);
    this.sendMail(verificationMail);
  }
}
