import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Service } from 'typedi';
import { SECRET_KEY } from '@config';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@/exceptions/httpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { Test2 } from '@interfaces/users.interface';
import { isDevEnv, isTestEnv } from '@/web2share-copy/env';
import path from 'path';
import { randomUUID } from 'crypto';
import { readFileSync } from 'fs';
import dao from '@/dao';
import { TypeCaptchaResponse } from '@/web2share-copy/server_constants';
import nodemailer from 'nodemailer';
import { CommonHandlePass } from '@/routes/auth.route';
import { logger } from '@/utils/logger';

@Service()
export class MailService {
  public async sendMailcheck(title: string, content: string, mailTo: string): Promise<{}> {
    return {};
  }
}

export let sendVerificationCode = async (obj: { mailToAddr: string; sendToWho: string; verificationCode: string }, p: Partial<CommonHandlePass>) => {
  let { Dot } = p;
  let crtVerifCode = obj.verificationCode;
  let crtUserName = obj.sendToWho;
  let crtMailTitle = `[LafTools] ${Dot('m1932', '{0} is Your Verification Code', crtVerifCode)}`;
  let content =
    '<!DOCTYPE html>\n' +
    '<html>\n' +
    '<head>\n' +
    '  <meta charset="utf-8" />  \n' +
    '</head>\n' +
    '<body>\n' +
    `    <p>Dear ${crtUserName},</p><br/>\n` +
    '\n' +
    `    <p>${Dot(
      'm23091',
      'Thank you for using LafTools. To complete your request, please enter the following verification code in the application:',
    )}</p>\n` +
    '\n' +
    `      <div style=" font-size: 20px; color: #2672ec; margin: 27px 27px; ">${crtVerifCode}</div>\n  \n` +
    '\n' +
    `    <p>${Dot('m2308', 'If you did not request this code, you can safely ignore this email.')}</p>\n` +
    '\n<p></p>' +
    '<div style="color:gray;font-size:12px;"><p></p>    ' +
    '<p>Thanks and Regards,</p>\n' +
    '    <p>LafTools Team (https://laftools.cn)</p></div>\n' +
    '\n' +
    '</body>\n' +
    '</html>';
  let mail = {
    subject: crtMailTitle, // Subject line
    html: content, // plain text body
  };
  await sendMailTo(obj.mailToAddr, mail);
};

// async..await is not allowed in global scope, must use a wrapper
export async function sendMailTo(
  mailTo: string,
  mailContent: {
    subject: string;
    html: string;
  },
) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let account = {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  };

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'gz-smtp.qcloudmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: account.user, // generated ethereal user
      pass: account.pass, // generated ethereal password
    },
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: 'LafTools Team(NoReply)' + ' <noreply@noreply.codegen.cc>', // sender address
    to: mailTo, // list of receivers
    subject: mailContent.subject, // Subject line
    html: mailContent.html, // html body
  };

  if (isTestEnv()) {
    logger.debug('ok, test env, skip sending email');
    return;
  }

  if (!account.user || !account.pass) {
    logger.error('no mail account found');
    return;
  }
  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions);

  console.log('Message sent: %s', info.messageId);
  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
}
