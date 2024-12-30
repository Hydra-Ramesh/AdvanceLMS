import twilio from 'twilio';
import dotenv from 'dotenv';
dotenv.config();
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
const sendVerificationSMS = async (number, verificationToken) => {
  try {
    // Send SMS using Twilio
    await client.messages.create({
      body: `Your verification code is: ${verificationToken}. It will expire in 24 hours.`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: number,
    });
    console.log(`SMS sent to ${number} successfully`);
  } catch (error) {
    console.error('Error sending verification SMS:', error);
    throw new Error('Error sending verification SMS');
  }
};
