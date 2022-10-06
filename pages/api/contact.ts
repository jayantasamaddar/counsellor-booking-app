import { createTransport } from 'nodemailer';
import type { NextApiRequest, NextApiResponse } from 'next';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, email, message } = req.body;

  const transporter = createTransport({
    host: 'smtp.zoho.in',
    port: 465,
    secure: true,
    auth: {
      user: process.env.ZOHO_EMAIL_USER as string,
      pass: process.env.ZOHO_EMAIL_PASSWORD as string,
    },
  });

  try {
    const emailResponse = await transporter.sendMail({
      from: `${name} via Contact Form <hello@${process.env.EMAIL_DOMAIN}>`,
      to: `${process.env.NEXT_PUBLIC_ORGANIZATION as string} <${
        process.env.ZOHO_EMAIL_USER
      }>`,
      replyTo: `${name} <${email}>`,
      subject: 'New message from Contact Form',
      text: message,
      html: `
      <style>
        p { white-space: pre-wrap }
      </style>
            <div>
                <h3>New message from contact form</h3><br />
                <p><strong>Name:</strong> ${name} </p>
                <p><strong>Email:</strong> ${email} </p><br/>
                <p><strong>Message:</strong></p>
                <p>${message.replaceAll(/\\n/g, '</p><p>')}</p><br/>
            </div>`,
    });
    console.log('Message sent: %s', emailResponse.messageId);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      return res.status(400).json({ error: error.message });
    }
  }
  return res.status(200).json(req.body);
};
