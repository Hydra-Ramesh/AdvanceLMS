import { MailtrapClient } from 'mailtrap';
import dotenv from 'dotenv';
dotenv.config();
export const mailtrapClient = new MailtrapClient({
  endpoint: process.env.MAILTRAP_ENDPOINT,
  token: process.env.MAILTRAP_TOKEN,
});
export const sender = {
  email: process.env.SENDER_EMAIL,
  name: process.env.SENDER_NAME,
};
