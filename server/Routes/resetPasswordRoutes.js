const express = require('express');
const router = express.Router();
const { sendResetLink, resetPassword } = require("../Controllers/resetPasswordController");
const authMiddleware = require('../Middlewares/authMiddleware');

router.post('/forgot-password', sendResetLink);
router.post('/reset-password/:token', resetPassword);

module.exports = router;
