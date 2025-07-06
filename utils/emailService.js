import nodemailer from "nodemailer";
import secrets from "../config/secrets.js";
const EMAIL_USER = secrets.email.user;
const EMAIL_PASS = secrets.email.pass;

export async function sendEmail({ to, subject, text, html }) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: EMAIL_USER,
      to,
      subject,
      text,
      html,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log(`Email sent: ${info.response}`);
      }
    });
  } catch (err) {
    console.log(err);
  }
}

export function getVerificationEmailTemplate({ userName, userId }) {
  const verificationUrl = `http://localhost:3000/api/user/verify/${userId}`;
  return `
    <div style="background: #f8f4f6; padding: 40px 0; font-family: 'Roboto', Arial, sans-serif; color: #212529;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; margin: 0 auto; background: #fff; border-radius: 10px; box-shadow: 0 2px 8px rgba(140,13,79,0.05);">
        <tr>
          <td style="padding: 32px 32px 0 32px; text-align: center;">
            <span style="font-family: 'Quicksand', Arial, sans-serif; font-size: 32px; color: #8c0d4f; font-weight: bold; letter-spacing: 1px;">FashionStore</span>
          </td>
        </tr>
        <tr>
          <td style="padding: 24px 32px 0 32px; text-align: center;">
            <h2 style="color: #3e0925; font-family: 'Quicksand', Arial, sans-serif; margin-bottom: 8px;">Welcome, ${userName}!</h2>
            <p style="font-size: 16px; color: #212529; margin: 0 0 16px 0;">Thank you for signing up at FashionStore. Please verify your email address to activate your account.</p>
          </td>
        </tr>
        <tr>
          <td style="padding: 16px 32px 0 32px; text-align: center;">
            <a href="${verificationUrl}" style="display: inline-block; padding: 14px 32px; background: #8c0d4f; color: #fff; border-radius: 6px; font-size: 18px; font-weight: bold; text-decoration: none; margin: 16px 0;">Verify Email</a>
            <p style="font-size: 14px; color: #888; margin-top: 16px;">If the button above does not work, copy and paste the following link into your browser:</p>
          </td>
        </tr>
        <tr>
          <td style="padding: 32px 32px 0 32px; text-align: center; border-top: 1px solid #eee;">
            <p style="font-size: 13px; color: #888; margin: 0;">&copy; ${new Date().getFullYear()} FashionStore. All rights reserved.</p>
            <p style="font-size: 13px; color: #888; margin: 0;">123 Fashion Street, New York, NY 10001</p>
          </td>
        </tr>
      </table>
    </div>
  `;
}

export function generatePasswordResetEmail({ userName, verificationCode }) {
  return `
    <div style="background: #f8f4f6; padding: 40px 0; font-family: 'Roboto', Arial, sans-serif; color: #212529;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; margin: 0 auto; background: #fff; border-radius: 10px; box-shadow: 0 2px 8px rgba(140,13,79,0.05);">
        <tr>
          <td style="padding: 32px 32px 0 32px; text-align: center;">
            <span style="font-family: 'Quicksand', Arial, sans-serif; font-size: 32px; color: #8c0d4f; font-weight: bold; letter-spacing: 1px;">FashionStore</span>
          </td>
        </tr>
        <tr>
          <td style="padding: 24px 32px 0 32px; text-align: center;">
            <h2 style="color: #3e0925; font-family: 'Quicksand', Arial, sans-serif; margin-bottom: 8px;">Hello, ${userName}!</h2>
            <p style="font-size: 16px; color: #212529; margin: 0 0 16px 0;">Your OTP code for resetting your password is:</p>
            <h3 style="font-size: 24px; color: #8c0d4f; font-family: 'Quicksand', Arial, sans-serif; font-weight: bold; margin: 8px 0;">${verificationCode}</h3>
          </td>
        </tr>
        <tr>
          <td style="padding: 16px 32px 0 32px; text-align: center;">
            <p style="font-size: 14px; color: #888; margin-top: 16px;">If the OTP code above does not work, copy and paste the following code into your app or website:</p>
          </td>
        </tr>
        <tr>
          <td style="padding: 32px 32px 0 32px; text-align: center; border-top: 1px solid #eee;">
            <p style="font-size: 13px; color: #888; margin: 0;">&copy; ${new Date().getFullYear()} FashionStore. All rights reserved.</p>
            <p style="font-size: 13px; color: #888; margin: 0;">123 Fashion Street, New York, NY 10001</p>
          </td>
        </tr>
      </table>
    </div>
  `;
}
