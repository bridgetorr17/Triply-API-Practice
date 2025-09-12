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

    try{
        const request = await mj.post('send', {version: 'v3.1'}).request({
            Messages: [
                {
                    From: {
                        Email: 'bridgetorr1902@gmail.com',
                        Name: 'Default',
                    },
                    To: [
                        {
                            Email: 'triplytravel@yahoo.com',
                            Name: 'Triply Travel',   
                        }
                    ],
                    Subject: 'test email',
                    TextPart: 'Test',
                    HTMLPart: '<a href="https://triplytravel.vercel.app/"> Triply!!</>',
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