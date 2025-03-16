const nodemailer = require('nodemailer');
require('dotenv').config();

// Configure the transporter for sending emails
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

/**
 * Send OTP Email
 * @param {string} recipientEmail - Email address of the recipient
 * @param {string} otp - One-Time Password to send
 */
const sendOtpEmail = async (recipientEmail, otp) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: recipientEmail,
            subject: 'Your OTP Code for VisionInvest AI',
            text: `Your OTP code is: ${otp}. This code is valid for 5 minutes.`
        };

        await transporter.sendMail(mailOptions);
        console.log(`OTP sent to ${recipientEmail}`);
    } catch (error) {
        console.error("Error sending OTP email:", error);
        throw new Error("Failed to send OTP");
    }
};

module.exports = { sendOtpEmail };
