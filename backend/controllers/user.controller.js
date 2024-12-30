import bcrypt from 'bcryptjs';
import { User } from '../models/user.model.js';
import { generateTokenAndSetCookie } from '../middlewares/generateTokenAndSetCookie.js';

export const register = async (req, res) => {
  const { email, number, password, name, verifiatioMethod } = req.body;

  try {
    if (!email || !password || !name || !number) {
      throw new Error('All fields are required');
    }

    const userAlreadyExists = await User.findOne({
      $or: [{ email }, { number }],
    });
    console.log('userAlreadyExists', userAlreadyExists);

    if (userAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const user = new User({
      email,
      number,
      password: hashedPassword,
      name,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
      verifcationMethod: email,
    });

    await user.save();
    generateTokenAndSetCookie(res, user._id);
    if (verifiatioMethod === 'email') {
      await sendVerificationEmail(user.email, verificationToken);
      res.status(201).json({
        success: true,
        message: 'User created Successfully',
        user: {
          ...user._doc,
          password: undefined,
        },
      });
    } else if (verifiatioMethod === sms) {
      await sendVerificationSMS(user.number, verificationToken);
      res.status(201).json({
        success: true,
        message: 'User created Successfully',
        user: {
          ...user._doc,
          password: undefined,
        },
      });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
    console.log('Problem on the Register COntroller');
  }
};

export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log('Error in checkAuth ', error);
    res.status(400).json({ success: false, message: error.message });
  }
};
