import mongoose from 'mongoose';
import { emailValidator } from '../utils/emailValidator.js';
import { numberValidator } from '../utils/numberValidator.js';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is Required'],
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      validate: {
        validator: emailValidator,
        message:
          'Please enter a valid email address with @pwioi.com or @pwioi.live',
      },
    },
    phoneNumber: {
      type: String,
      unique: true,
      validate: {
        validator: numberValidator,
        message:
          'Please enter a valid phone number starting with +91 and followed by 10 digits.',
      },
    },
    password: {
      type: String,
      minLength: [8, 'Password must have at least 8 characters.'],
      maxLength: [32, 'Password cannot have more than 32 characters.'],
      reqired: [true, 'Password is required.'],
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    photoUrl: {
      type: String,
      default: '',
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
    },
    verificationTokenExpires: {
      type: Date,
    },
    verficationMethod: {
      type: String,
      enum: ['email', 'sms'],
      default: 'email',
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model('User', userSchema);
