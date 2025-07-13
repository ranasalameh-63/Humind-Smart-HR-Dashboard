const crypto = require('crypto');
const bcrypt = require('bcrypt');
const User = require('../Models/usersModel');
const { sendEmail } = require('../utils/emailService');


const sendResetLink = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: 'User not found' });

    if (!user.email) return res.status(500).json({ message: 'User email is missing' });

    const token = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000;

    const resetLink = `http://localhost:5173/reset-password/${token}`;
    console.log('Reset link:', resetLink);


    await sendEmail({
          to: user.email,
          subject: 'Reset your Humind password',
          text: `Hello ${user.name},Please reset your password by clicking "${resetLink}"here\nHumind System`,
        });

    await user.save();

    res.status(200).json({ message: 'Reset link sent to your email' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({ message: 'Password has been reset successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  resetPassword,
  sendResetLink,
};
