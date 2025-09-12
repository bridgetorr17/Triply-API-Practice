import express from 'express';
const app = express();

import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config({path: '../.env'})

import mailjet from 'node-mailjet';

app.use(cors({
  origin: 'http://localhost:5173',   // allow your front-end origin
  credentials: true                // so cookies / credentials: 'include' works
}));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const mj = mailjet.apiConnect(
    process.env.MJ_APIKEY_PUBLIC,
    process.env.MJ_APIKEY_PRIVATE
)

app.post('/', async (req, res) => {
    console.log('we made it to the backend')

    const resetUrl = 'https://triplytravel.vercel.app/resetPassword'

    try{
        const request = await mj.post('send', {version: 'v3.1'}).request({
            Messages: [
                {
                    From: {
                        Email: 'bridgetorr1902@gmail.com',
                        Name: 'Triply Password Reset',
                    },
                    To: [
                        {
                            Email: 'bridgetorr1902@gmail.com',
                            Name: 'Test User',   
                        }
                    ],
                    Subject: 'Reset your Triply Password',
                    TextPart: 
                        `You requested a password reset. Please click the link below to set a new password:\n\n` +
                        `${resetUrl}\n\n` +
                        `If you didn’t request this, you can safely ignore this email.`,
                    HTMLPart:  
                        `<strong>Reset your password</strong><br/><br/>` +
                        `You requested a password reset for your Triply account.<br/>` +
                        `Click the button below to reset your password:<br/><br/>` +
                        `<a href="${resetUrl}" style="display:inline-block;padding:12px 24px;background-color:#1D4ED8;color:white;text-decoration:none;border-radius:4px;">Reset Password</a><br/><br/>` +
                        `If the button doesn’t work, copy and paste the following link into your browser:<br/>` +
                        `<a href="${resetUrl}">${resetUrl}</a><br/><br/>` +
                        `If you did not request a password reset, no action is needed.<br/><br/>` +
                        `Thanks,<br/>The Triply Team`,
                }
            ]
        });

        res.status(200).json({message: 'Email sent successfully'})
    }
    catch(err){
        console.error('error sending email: ', err);
        res.status(500).json({ message: 'Failed to send email', details: err })
    }
});
        

app.listen(8000, () => {
    console.log('server running on port 8000');
})

export default app;