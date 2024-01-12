import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModal from '../models/user.js';

import dotenv from 'dotenv';
dotenv.config();

const secret = process.env.SECRET_PASS;

export const signIn = async (req, res) => {
  const { email, password: userPassword } = req.body;

  try {
    const oldUser = await userModal.findOne({ email });

    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(
      userPassword,
      oldUser.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: '1h',
    });
    const { password, ...others } = oldUser._doc;

    res.status(200).json({ result: others, token });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const signUp = async (req, res) => {
  const { email, password: userPassword, firstName, lastName } = req.body;

  try {
    const oldUser = await userModal.findOne({ email });

    if (oldUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(userPassword, 12);

    const result = await userModal.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
      admin: false,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: '1h',
    });
    const { password, ...others } = result._doc;

    res.status(201).json({ others, token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
